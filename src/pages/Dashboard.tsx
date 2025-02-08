import React from 'react';
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
  Circle,
  Frame,
  Locate,
  Map,
  MapPin,
  MessageCircle,
  PieChart,
  Search,
  Send,
  StickyNote,
} from "lucide-react"
// import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
// import { NavUser } from "@/components/nav-user"
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

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        handleShowAllPosts={handleShowAllPosts}
        handleSuggestion={handleSuggestion}
        handleLocalPosts={handleLocalPosts}
      />
      <SidebarInset>
        <header className="fixed w-screen">
          <div className="flex items-center h-20 gap-2 px-6 w-full rounded-xl backdrop-blur-xl">
            <SidebarTrigger className="-ml-1 scale-150" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="font-semibold text-3xl ">Dashboard</h1>
          </div>
        </header>
        <div className="flex flex-row justify-center mt-20 py-4 ">
          <div className="columns-1 sm:columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
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
                    />
                  );
                })
            }
          </div>
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

function AppSidebar({ setSearchQuery, searchQuery, handleSearch, handleShowAllPosts, handleSuggestion, handleLocalPosts, ...props }: { setSearchQuery: any, searchQuery: string, handleSearch: any, handleShowAllPosts: any, handleSuggestion: any, handleLocalPosts: any } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a onClick={() => { navigate('/') }}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src={logo} alt="" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className=" font-semibold font-script text-2xl">Culture Connect</span>
                </div>
              </a>
            </SidebarMenuButton>
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
              <Button type="submit">Create Post</Button>
            </form>
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
            <div className="flex flex-col gap-4 no-scrollbar">
              {!(todayEvents.length) ? (<p>No Event</p>) : (
                todayEvents.map((post) => (
                  <NotifCard key={post.id} title={post.title} time={post.time} date={post.date} />
                ))
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <SidebarContent className="no-scrollbar">
        <div className="mx-5 mt-4 flex flex-col gap-2">
          <label className="text-[12px] text-secondary-foreground">Populars</label>
          <Button variant={"ghost"} className="justify-start w-full h-7 p-0 px-1 text-[12px]"><Circle />Tag 1</Button>
          <Button variant={"ghost"} className="justify-start w-full h-7 p-0 px-1 text-[12px]"><Circle />Tag 2</Button>
          <Button variant={"ghost"} className="justify-start w-full h-7 p-0 px-1 text-[12px]"><Circle />Tag 3</Button>
          <Button variant={"ghost"} className="justify-start w-full h-7 p-0 px-1 text-[12px]"><Circle />Tag 4</Button>
          <label className="text-[12px] text-secondary-foreground">Featured</label>
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
          <Dialog>
            <DialogTrigger className="outline-none">
              <Button variant={"ghost"} className="w-full justify-start p-0 px-1 "><MessageCircle />ChatBot</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="gap-4">
                <DialogTitle>AI ChatBot</DialogTitle>
                <h1>kwejbfbweefbweofbweo</h1>
              </DialogHeader>
            </DialogContent>
          </Dialog>
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

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog>
          <DialogTrigger className="w-full bg-secondary rounded-full">
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 border border-primary">
                <AvatarImage src={userData?.avatar || ""} alt={userData?.username || 'User'} />
                <AvatarFallback>{userData?.username?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{userData?.username || 'User'}</span>
                <span className="truncate text-xs">{userData?.email || 'user@example.com'}</span>
              </div>

            </SidebarMenuButton>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl text-center">Profile</DialogTitle>
            </DialogHeader>
            <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
              <div className="flex gap-6">
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
              <Button type="submit">Edit and Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}