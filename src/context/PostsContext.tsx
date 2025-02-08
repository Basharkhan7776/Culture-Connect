// PostsContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/services/firebase'; 

// Define the post interface
export interface IPost {
  id?: string; // Firestore document ID
  title: string;
  description: string;
  imageUrl: string;
  tags: string[]; // length 3-5
  date: string;  // (e.g. '2025-02-03')
  time: string;  // (e.g. '13:05')
  address: string;
  pincode: number;
  user: {
    userId: string;
    name: string;
    avatar: string;
  };
  likes: string[]; // array of user IDs
}

// Define context interface
interface IPostsContext {
  posts: IPost[];
  createPost: (
    postData: Omit<IPost, 'id' | 'likes' | 'imageUrl'>,
    imageFile?: File
  ) => Promise<void>;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
  fetchPosts: () => Promise<void>;
}

const PostsContext = createContext<IPostsContext | undefined>(undefined);

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      const postsData: IPost[] = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() } as IPost);
      });
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const createPost = async (
    postData: Omit<IPost, 'id' | 'likes' | 'imageUrl'>,
    imageFile?: File
  ) => {
    try {
      let imageUrl = '';
      if (imageFile) {
        console.log('Uploading image file:', imageFile);
        imageUrl = await uploadImageToCloudinary(imageFile);
        console.log('Image uploaded. Secure URL:', imageUrl);
      }
      const newPost: Omit<IPost, 'id'> = {
        ...postData,
        imageUrl,
        likes: [],
      };
      console.log('Creating new post with data:', newPost);
      await addDoc(collection(db, 'posts'), newPost);
      await fetchPosts();
    } catch (error: any) {
      console.error('Error creating post:', error);
      throw error;
    }
  };
  

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostsContext.Provider value={{ posts, createPost,setPosts , fetchPosts }}>
      {children}
    </PostsContext.Provider>
  );
};
