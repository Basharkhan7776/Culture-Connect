// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db, googleProvider } from "@/services/firebase";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    User,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// Define the structure of your user data stored in Firestore
export interface IUser {
    userId: string;
    username: string;
    email: string;
    location: string;  // default: ""
    pincode: number;   // default: 0
    avatar: string;    // default URL
    liked: string[];   // Array of Post IDs
}

// Define the context type
interface IAuthContext {
    currentUser: User | null;
    userData: IUser | null;
    signup: (username: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    updateProfileData: (updates: Partial<IUser>) => Promise<void>;
}

// Create the context
const AuthContext = createContext<IAuthContext | null>(null);

// Custom hook for consuming the context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// Provider component to wrap your app
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    //Listening auth stats changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                try {
                    const userRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(userRef);
                    if (docSnap.exists()) {
                        console.log("Fetched user data:", docSnap.data());
                        setUserData(docSnap.data() as IUser);
                    } else {
                        console.log("User document does not exist. Creating new document.");
                        // Create a new user document for Google sign-ins or any sign-in where the document is missing
                        const newUser: IUser = {
                            userId: user.uid,
                            username: user.displayName || "Anonymous",
                            email: user.email || "",
                            location: "",
                            pincode: 0,
                            avatar:
                                user.photoURL ||
                                "",
                            liked: [],
                        };
                        await setDoc(userRef, newUser);
                        setUserData(newUser);
                    }
                } catch (error) {
                    console.error("Error fetching or creating user document:", error);
                }
            } else {
                setUserData(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);


    // Signup function: Create user in Auth and Firestore
    const signup = async (username: string, email: string, password: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, { displayName: username });
        }
        const user = userCredential.user;
        const newUser: IUser = {
            userId: user.uid,
            username,
            email,
            location: "",
            pincode: 0,
            avatar: "",
            liked: [],
        };
        await setDoc(doc(db, "users", user.uid), newUser);
    };


    // Login function with email and password
    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    // Login with Google
    const loginWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider);
    };

    // Logout function
    const logout = async () => {
        await signOut(auth);
    };

    // Update user profile data in Firestore
    const updateProfileData = async (updates: Partial<IUser>) => {
        if (!currentUser) throw new Error("No current user");
        const userRef = doc(db, "users", currentUser.uid);
        console.log("Updating Firestore with:", updates);
        await updateDoc(userRef, updates);
        // Refresh local user data after update
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            const updatedData = docSnap.data() as IUser;
            console.log("Fetched updated user data:", updatedData);
            setUserData(updatedData);
        } else {
            console.log("User document not found after update.");
        }

    };

    const value: IAuthContext = {
        currentUser,
        userData,
        signup,
        login,
        loginWithGoogle,
        logout,
        updateProfileData,
    };

    return (
        <AuthContext.Provider value={value}>
            {/* Render children only when not loading */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
