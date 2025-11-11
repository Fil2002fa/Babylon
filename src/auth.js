"use client";

import { useState, useEffect } from "react";
import { auth, db } from "./firebase"; 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";


export function useAuth() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    let unsubscribeData;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      unsubscribeData = onSnapshot(userRef, (docSnap) => {
        setUserData(docSnap.exists() ? docSnap.data() : null);
      });
    } else {
      setUserData(null);
    }
    return () => {
      if (unsubscribeData) unsubscribeData();
    };
  }, [user]);


  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error during sign in:", error);
      throw error;
    }
  };

  const signUp = async (email, password, name) => { 
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      const userRef = doc(db, "users", newUser.uid);
      await setDoc(userRef, {
        name,
        email,
        createdAt: new Date().toISOString()
      });
      return newUser;
    } catch (error) {
      console.error("Error during sign up:", error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during sign out:", error);
      throw error;
    }
  };

return { user, userData, isLoading, signIn, signUp, logOut };

}