import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import * as React from "react"
import {
  Brain,
  MapPin,
  Search,
  Send,
  StickyNote,
  Tag,
  MessageCircle
} from "lucide-react"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Plus
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


import logo from "@/assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Post } from "@/components/Post";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import NotifCard from "@/components/NotifCard";

/* ----------------------------------------------------------- */
//FIREBASE Imports
import { useAuth, IUser } from "@/context/AuthContext";
import uploadImageToCloudinary from '@/services/uploadAvatar';
import { usePosts, IPost } from '@/context/PostsContext';
import { db } from '@/services/firebase';
import { updateDoc, doc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';
import { adminEmail } from "@/envConfig";
import { Spinner } from "@/components/ui/spinner";




const exitHandler = () => {
  const escEvent = new KeyboardEvent('keydown', {
    key: 'Escape',
    keyCode: 27,
    bubbles: true,
  });
  document.dispatchEvent(escEvent);
}



export default function Dashboard() {
  const { posts, setPosts, fetchPosts } = usePosts();
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  console.log(Number(adminEmail));

  // Handler to like a post:
  // - Adds currentUser.uid to post.likes
  // - Adds the post id to current user's liked array in Firestore
  // Optimistic toggle of like state
  const handleLikeToggle = async (postId: string, isLiked: boolean) => {
    if (!currentUser) {
      alert('You must be logged in to like a post.');
      return;
    }

    // Optimistically update the local posts state.
    setPosts((prevPosts: IPost[]) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          let newLikes = post.likes ? [...post.likes] : [];
          if (isLiked) {
            // Unlike: remove current user's uid
            newLikes = newLikes.filter((uid) => uid !== currentUser.uid);
          } else {
            // Like: add current user's uid
            newLikes.push(currentUser.uid);
          }
          return { ...post, likes: newLikes };
        }
        return post;
      })
    );

    // Now update Firestore asynchronously
    try {
      const postRef = doc(db, 'posts', postId);
      const userRef = doc(db, 'users', currentUser.uid);

      if (isLiked) {
        // Unlike: remove uid from post and remove postId from user's liked array
        await updateDoc(postRef, { likes: arrayRemove(currentUser.uid) });
        await updateDoc(userRef, { liked: arrayRemove(postId) });
        console.log(`User ${currentUser.uid} unliked post ${postId}`);
      } else {
        // Like: add uid to post and add postId to user's liked array
        await updateDoc(postRef, { likes: arrayUnion(currentUser.uid) });
        await updateDoc(userRef, { liked: arrayUnion(postId) });
        console.log(`User ${currentUser.uid} liked post ${postId}`);
      }
    } catch (error: any) {
      console.error('Error toggling like:', error);
      alert('Failed to toggle like on the post.');

      // Optionally, re-fetch posts from Firestore to revert optimistic changes
      await fetchPosts();
    }
  };

  // For search functionality:
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>(posts);
  const [topTags, setTopTags] = useState<string[]>([]);


  // Whenever posts change, update the filtered posts
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  // Handler for the search button.
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission reload
    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
      exitHandler();
      return;
    }
    const queryLower = searchQuery.toLowerCase();
    const result = posts.filter((post: IPost) => {
      const titleMatch = post.title.toLowerCase().includes(queryLower);
      const tagMatch = post.tags && post.tags.some((tag: string) => tag.toLowerCase().includes(queryLower));
      return titleMatch || tagMatch;
    });
    setFilteredPosts(result);
    exitHandler();

  };

  // Suggestion: Show all posts by authors whose posts the user liked.
  const handleSuggestion = () => {
    if (!userData || !userData.liked || userData.liked.length === 0) {
      alert("You haven't liked any posts yet!");
      return;
    }
    // Get liked post IDs from userData.
    const likedPostIds = userData.liked; // Array of post IDs
    // Find the posts corresponding to these liked IDs.
    const likedPosts = posts.filter((post: IPost) => likedPostIds.includes(post.id!));
    // Extract a set of authors (userIds) from liked posts.
    const likedAuthors = new Set<string>();
    likedPosts.forEach(post => {
      if (post.user.userId) {
        likedAuthors.add(post.user.userId);
      }
    });
    // Now filter all posts to include only posts from these authors.
    const suggestionPosts = posts.filter((post: IPost) => likedAuthors.has(post.user.userId));
    setFilteredPosts(suggestionPosts);
    exitHandler();
  };

  // Handler to show posts whose pincode is within current user's range.
  const handleLocalPosts = () => {
    if (!userData || !userData.pincode) {
      alert('Your pincode is not set.');
      return;
    }
    const userPincode = Number(userData.pincode);
    const lowerBound = userPincode - 10;
    const upperBound = userPincode + 10;
    const localPosts = posts.filter((post: IPost) => {
      const postPincode = Number(post.pincode);
      return postPincode >= lowerBound && postPincode <= upperBound;
    });
    setFilteredPosts(localPosts);
    exitHandler();
  };


  // Whenever posts update, refresh filtered posts and compute top tags.
  useEffect(() => {
    setFilteredPosts(posts);

    // Count tag frequencies.
    const tagCount: { [tag: string]: number } = {};
    posts.forEach((post) => {
      if (post.tags && post.tags.length > 0) {
        post.tags.forEach((tag) => {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
      }
    });
    // Sort tags descending by frequency.
    const sortedTags = Object.entries(tagCount).sort(([, countA], [, countB]) => countB - countA);
    // Take top 4 tag names.
    const topFour = sortedTags.slice(0, 4).map(([tag]) => tag);
    setTopTags(topFour);
  }, [posts]);

  // Handler for top tag filter.
  const handleTagFilter = (tag: string) => {
    const filtered = posts.filter((post: IPost) => post.tags && post.tags.includes(tag));
    setFilteredPosts(filtered);
    exitHandler();
  };


  // Admin delete handler.
  const handleDeletePost = async (postId: string) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      alert('Post deleted successfully.');
      await fetchPosts();
    } catch (error: any) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post.');
    }
  };




  // Handler to reset the search and show all posts.
  const handleShowAllPosts = () => {
    setSearchQuery('');
    setFilteredPosts(posts);
    exitHandler();
  };

  //Scrolling Feature Hide
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);


  return (
    <SidebarProvider >
      <AppSidebar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        handleShowAllPosts={handleShowAllPosts}
        handleSuggestion={handleSuggestion}
        handleLocalPosts={handleLocalPosts}
        handleTagFilter={handleTagFilter}
        topTags={topTags}
      />
      <SidebarInset>
        <div className={`fixed flex items-center h-20 gap-2 px-6 mx-4 w-fit rounded-xl backdrop-blur-xl ${isVisible ? "translate-y-0" : "-translate-y-full"} transition-transform duration-300`}>
          <SidebarTrigger className="-ml-1 scale-150" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Button
            variant={"ghost"}
            className="h-14"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="Logo"
              className="aspect-square size-10 rounded-full" />
            <p className=" font-semibold font-script text-3xl">Culture Connect</p>
          </Button>
        </div>
        <div className="flex flex-row justify-center mt-20 py-4 ">
          <div className="columns-1 sm:columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 ">
            {
              filteredPosts.length > 0 ?
                filteredPosts.map((post) => {
                  const isLiked = currentUser && post.likes?.includes(currentUser.uid);
                  return (
                    <Post
                      key={post.id}
                      postId={post.id || ''}
                      title={post.title}
                      description={post.description}
                      date={post.date}
                      stars={post.likes.length}
                      address={post.address}
                      tags={post.tags}
                      image={post.imageUrl}
                      userId={post.user.userId}
                      time={post.time}
                      handleLike={handleLikeToggle}
                      isLiked={isLiked || false}
                      handleDeletePost={handleDeletePost}
                    />
                  );
                }) :
                posts.map((post) => {
                  const isLiked = currentUser && post.likes?.includes(currentUser.uid);
                  return (
                    <Post
                      key={post.id}
                      postId={post.id || ''}
                      title={post.title}
                      description={post.description}
                      date={post.date}
                      stars={post.likes.length}
                      address={post.address}
                      tags={post.tags}
                      image={post.imageUrl}
                      userId={post.user.userId}
                      time={post.time}
                      handleLike={handleLikeToggle}
                      isLiked={isLiked || false}
                      handleDeletePost={handleDeletePost}
                    />
                  );
                })
            }
          </div>
        </div>
        {/* This is chatbot imple logic, scaled in future */}
        <div className={`fixed right-6 bottom-6 ${isVisible ? "translate-x-0" : "translate-x-28"} transition-transform duration-300`}>
          <Dialog>
            <DialogTrigger className="flex justify-center items-center h-20 w-20 rounded-full text-xl bg-primary outline-none hover:bg-secondary transition-colors duration-300">
              <MessageCircle fill="white" className="size-8" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>AI Chatbot Coming soon in future</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>

        </div>
      </SidebarInset >
    </SidebarProvider >
  );
}

const data = {
  user: {
    name: "Admin",
    email: "Admin@cc.com",
    avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    pincode: "123456",
    address: "123, ABC Street, XYZ City"
  },
  navSecondary: [
    {
      title: "Feedback",
      url: "/#blogs",
      icon: Send,
    },
  ]
}

function AppSidebar({ setSearchQuery, searchQuery, handleSearch, handleShowAllPosts, handleSuggestion, handleLocalPosts, handleTagFilter, topTags, ...props }: { setSearchQuery: any, searchQuery: string, handleSearch: any, handleShowAllPosts: any, handleSuggestion: any, handleLocalPosts: any, handleTagFilter: any, topTags: any } & React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  // Logout handler
  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
      navigate("/");
    } catch (error: any) {
      console.error("Error during logout:", error);
      alert("Logout failed!");
    }
  };

  /* --------- Create Post Logic --------- */

  const { posts, createPost } = usePosts();
  const { currentUser, userData } = useAuth(); // currentUser.uid, userData.username, userData.avatar

  // Local state for post creation form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [pincode, setPincode] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [street, setStreet] = useState('');
  const [town, setTown] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Process tags (expect comma-separated input)
    const tagsArr = tagsInput;

    const finalAddress = `${street}, ${town}, ${city}, ${state}, ${country}`;

    if (!currentUser || !userData) {
      alert('User not found. Please log in.');
      return;
    }

    // Prepare post data (imageUrl will be handled in createPost)
    const postData = {
      title,
      description,
      tags: tagsArr,
      date, // you can format this as needed
      time,
      address: finalAddress,
      pincode: Number(pincode),
      user: {
        userId: currentUser.uid,
        name: userData.username,
        avatar: userData.avatar,
      },
    };

    setLoading(true);
    await createPost(postData, imageFile || undefined);
    setLoading(false);
    // Clear form fields after submission
    setTitle('');
    setDescription('');
    setTagsInput([]);
    setDate('');
    setTime('');
    setPincode('');
    setImageFile(null);
    setStreet('');
    setTown('');
    setCity('');
    setState('');
    setCountry('');
    alert("Post Uploaded!!")
    exitHandler();
  };

  /* --------------- Notification Logic -------------------- */
  const [todayEvents, setTodayEvents] = useState<IPost[]>([]);

  useEffect(() => {
    if (!currentUser || !userData) return;

    // Get today's date in YYYY-MM-DD format.
    const today = new Date().toISOString().slice(0, 10);

    // userData.liked is assumed to be an array of post IDs the user liked.
    const likedPostIds: string[] = userData.liked || [];

    // Filter posts that are liked by the user.
    const likedPosts = posts.filter(post => likedPostIds.includes(post.id!));

    // Among those, get events happening today.
    const eventsToday = likedPosts.filter(post => post.date === today);
    setTodayEvents(eventsToday);

    // Identify posts whose event date is earlier than today (i.e. outdated).
    const outdatedPostIds = likedPosts
      .filter(post => post.date < today)
      .map(post => post.id!)  // assuming post.id is defined
      ;

    // If any outdated posts are found, remove them from the user's liked array.
    if (outdatedPostIds.length > 0) {
      const userRef = doc(db, 'users', currentUser.uid);
      // Filter out outdated IDs.
      const updatedLiked = likedPostIds.filter(id => !outdatedPostIds.includes(id));
      updateDoc(userRef, { liked: updatedLiked })
        .then(() => console.log('Removed outdated liked posts:', outdatedPostIds))
        .catch((err) => console.error('Error updating user liked posts:', err));
    }
  }, [currentUser, userData, posts]);

  return (
    <Sidebar variant="inset" {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <div className="flex flex-col gap-2 px-4">
        <Dialog >
          <DialogTrigger><Button className="w-full h-10 rounded-full hover:rounded-xl">Create Post</Button></DialogTrigger>
          <DialogContent className="font-poppins">
            <DialogHeader>
              <DialogTitle className="text-2xl ">Create Post</DialogTitle>
            </DialogHeader>
            {(userData) ? <>
              <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <Label>Cost Title</Label>
                <Input
                  type="text"
                  placeholder="Enter your title here"
                  minLength={10}
                  maxLength={50}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Label>Cost Description</Label>
                <Textarea
                  placeholder="Enter your description here"
                  minLength={40}
                  maxLength={200}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <Label>Tags</Label>
                <div className="flex items-center gap-1">
                  <Input
                    placeholder="Tag 1"
                    pattern="^\S+$"
                    onInvalid={(e) => e.currentTarget.setCustomValidity('Please enter only one word (no spaces)')}
                    onInput={(e) => e.currentTarget.setCustomValidity('')}
                    type="text"
                    value={tagsInput[0]}
                    onChange={(e) => {
                      const newTags = [...tagsInput];
                      newTags[0] = e.target.value;
                      setTagsInput(newTags);
                    }}
                    required
                  ></Input>
                  <Input
                    placeholder="Tag 2"
                    pattern="^\S+$"
                    onInvalid={(e) => e.currentTarget.setCustomValidity('Please enter only one word (no spaces)')}
                    onInput={(e) => e.currentTarget.setCustomValidity('')}
                    type="text"
                    value={tagsInput[1]}
                    onChange={(e) => {
                      const newTags = [...tagsInput];
                      newTags[1] = e.target.value;
                      setTagsInput(newTags);
                    }}
                    required
                  ></Input>
                  <Input
                    placeholder="Tag 3"
                    pattern="^\S+$"
                    onInvalid={(e) => e.currentTarget.setCustomValidity('Please enter only one word (no spaces)')}
                    onInput={(e) => e.currentTarget.setCustomValidity('')}
                    type="text"
                    value={tagsInput[2]}
                    onChange={(e) => {
                      const newTags = [...tagsInput];
                      newTags[2] = e.target.value;
                      setTagsInput(newTags);
                    }}
                    required
                  ></Input>
                </div>
                <Label>Address</Label>
                <div className=" flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                    ></Input>
                    <Input
                      type="text"
                      placeholder="Town"
                      value={town}
                      onChange={(e) => setTown(e.target.value)}
                      required
                    ></Input>
                    <Input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    ></Input>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    ></Input>
                    <Input
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    ></Input>
                  </div>
                  <Input
                    type="number"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                  ></Input>
                </div>
                <div className="flex justify-around">
                  <div className="flex flex-col gap-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      placeholder="Enter your date here"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Time</Label>
                    <Input
                      type="time"
                      placeholder="Enter your time here"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Label>Upload Picture</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                ></Input>
                <Button
                  type="submit"
                >{loading ? <Spinner variant="circle" /> : 'Create Post'}</Button>
              </form>
            </>
              : <Spinner variant="circle" />}
          </DialogContent>
        </Dialog>
        <Sheet>
          <SheetTrigger>
            <Button variant={"secondary"} className="h-7 w-full">Notification</Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-4">
            <SheetHeader>
              <SheetTitle className="text-2xl">Notification</SheetTitle>
              <SheetDescription>
                <p>Here you can see all your notifications</p>
              </SheetDescription>
            </SheetHeader>
            {(userData) ?
              <div className="flex flex-col gap-4 no-scrollbar">
                {!(todayEvents.length) ? (<p>No Event</p>) : (
                  todayEvents.map((post) => (
                    <NotifCard key={post.id} title={post.title} time={post.time} date={post.date} />
                  ))
                )}
              </div>
              : <Spinner variant="circle" />
            }
          </SheetContent>
        </Sheet>
      </div>
      <SidebarContent className="no-scrollbar">
        <div className="mx-5 mt-4 flex flex-col gap-2">
          <label className="text-[12px] text-secondary-foreground mt-4">Featured</label>
          <Dialog>
            <DialogTrigger className="outline-none">
              <Button variant={"ghost"} className="w-full justify-start p-0 px-1 "><Search />Search</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="gap-4">
                <DialogTitle>Here you can Search Events</DialogTitle>
                <form action="" className="flex flex-col sm:flex-row  gap-4">
                  <Input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  ></Input>
                  <Button
                    type="submit"
                    onClick={handleSearch}
                  >Search</Button>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button variant={"ghost"} className="justify-start p-0 px-1 " onClick={handleShowAllPosts}><StickyNote />All Events</Button>

          <Button variant={"ghost"} className="justify-start p-0 px-1 " onClick={handleSuggestion}><Brain />Suggestion</Button>
          <Button variant={"ghost"} className="justify-start p-0 px-1 " onClick={handleLocalPosts}><MapPin />Local</Button>
          <label className="text-[12px] text-secondary-foreground mt-4">Populars</label>
          {(userData)?(topTags.length > 0 &&
            topTags.map((tag: string) => (
              <Button
                variant={"ghost"}
                className="justify-start w-full h-7 p-0 px-1 text-[12px]"
                key={tag}
                onClick={() => handleTagFilter(tag)}
              >
                <Tag />
                {tag}
              </Button>
            )))
          :<Spinner variant="circle" />}
        </div>
        <NavSecondary items={data.navSecondary} className="mt-auto" /> {/*feedback form*/}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
        <Button variant={"destructive"} className=" h-7 text-[12px]" onClick={handleLogout}>Log Out</Button>
      </SidebarFooter>
    </Sidebar>
  )
}

export function NavMain({
  items,
}: {
  items: {
    title: string
    url?: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      onClick?: () => void
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Post Filter</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url} onClick={subItem.onClick}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}



export function NavUser() {
  // Get current user, user data, and functions from AuthContext
  const { currentUser, userData, updateProfileData } = useAuth();
  console.log(currentUser);

  // Local states for form inputs
  const [newUsername, setNewUsername] = useState<string>("");
  const [newLocation, setNewLocation] = useState<string>("");
  const [newPincode, setNewPincode] = useState<string>("");
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string>('');


  // Handle profile updates (username, location, pincode)


  // Handle avatar upload using Cloudinary
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setNewAvatarFile(event.target.files[0]);
    }
  };



  // Combined handler for profile update and avatar upload
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form reload

    try {
      // Determine the avatar URL:
      // If a new avatar file is selected, upload it; otherwise use the current avatar URL
      let avatarUrl: string = userData?.avatar || '';
      if (newAvatarFile) {
        console.log('Uploading new avatar file:', newAvatarFile);
        setLoading(true);
        avatarUrl = await uploadImageToCloudinary(newAvatarFile);
        setLoading(false);
        console.log('New avatar URL:', avatarUrl);
      }

      // Build the update object (use new values if provided, else fall back to current data)
      const updates: Partial<IUser> = {
        username: newUsername.trim() || userData?.username || '',
        location: newLocation.trim() || userData?.location || '',
        pincode: newPincode ? Number(newPincode) : userData?.pincode || 0,
        avatar: avatarUrl,
      };

      console.log('Updating profile with:', updates);
      setLoading(true);
      await updateProfileData(updates);
      setLoading(false);
      alert('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };




  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog>
          <DialogTrigger
            className="w-full bg-secondary rounded-full"
          >
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 border border-primary">
                <AvatarImage src={userData?.avatar || "https://cdn-icons-png.flaticon.com/128/847/847969.png"} alt={userData?.username || 'User'} />
                <AvatarFallback>{(userData) ? userData?.username?.[0] : <Spinner variant="ellipsis" />}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {(userData) ? <><span className="truncate font-semibold">{userData?.username || 'User'}</span>
                  <span className="truncate text-xs">{userData?.email || 'user@example.com'}</span></>
                  : <Spinner variant="ellipsis" />}
              </div>

            </SidebarMenuButton>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl text-center">Profile</DialogTitle>
            </DialogHeader>
            {userData ? <>
              <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
                <div className="flex sm:flex-row flex-col items-center gap-6">
                  <div>
                    <Avatar className="h-44 w-44">
                      <AvatarImage src={userData?.avatar || ""} alt={userData?.username || 'User'} />
                      <AvatarFallback className="text-5xl">{userData?.username?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="relative bottom-10 ">
                      <Plus className="bg-primary cursor-pointer rounded-full h-8 w-8 "></Plus>
                      <input type="file" className="opacity-0 absolute rounded-full h-8 w-8 bottom-1" accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 justify-center ">
                    <div className="flex gap-2 items-center">
                      <Label>Name:</Label>
                      <Input type="text" className="border-none" placeholder={userData?.username || ''} value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                    </div>
                    <div className="flex gap-2 items-center">
                      <Label>Location:</Label>
                      <Input type="text" className="border-none" placeholder={userData?.location || ''} value={newLocation} onChange={(e) => setNewLocation(e.target.value)} />
                    </div>
                    <div className="flex gap-2 items-center">
                      <Label>Pincode:</Label>
                      <Input type="number" className="border-none" placeholder={userData?.pincode?.toString() || ''} value={newPincode} onChange={(e) => setNewPincode(e.target.value)} />
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                >
                  {(loading) ? <Spinner variant="circle" /> : 'Update & Save'}
                </Button>
              </form>
            </>
              : <Spinner variant="circle" />}
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

