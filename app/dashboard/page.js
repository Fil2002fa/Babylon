"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/auth";

export default function DashboardPage() {
  const { user, userData, isLoading, logOut } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (!isLoading && !user) {
   
    }
  }, [isLoading, user, router]);

  if (!user) return null; 

  
const name = userData?.name 

  async function handleLogout() {
    await logOut();
    router.replace("/"); 
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Welcome, {name}!</h1>
      <p>You are logged in as: {user.email}</p> 
      <button onClick={handleLogout}
      className="button-logout"
      >Log Out</button>
    </div>
    );
  }