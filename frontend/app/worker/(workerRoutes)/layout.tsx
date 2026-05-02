"use client";

import {useEffect} from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/utils/store/authStore";

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { authLoading, user } = useAuth();

  useEffect(() => {
    if (!authLoading && !user || user?.role !== "WORKER") {
      router.push("/login");
    }
  }, [authLoading, user,]);

  if(authLoading || !user){
    return <div style={{minHeight:"80vh"}}>Loading...</div>;
  }
  return (
    <div>
      {/* You can add a common header or sidebar for worker routes here */}
      {children}
    </div>
  );
}