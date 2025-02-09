// useUserInfo.ts
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface IUserInfo {
  username: string;
  avatar: string;
}

export const useUserInfo = (userId: string) => {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserInfo(docSnap.data() as IUserInfo);
        }
      } catch (error) {
        console.error('Error fetching user info for', userId, error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return userInfo;
};
