"use client";

import {useEffect} from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/store/authStore";
import {useAuthRedirect} from "@/lib/hooks/useAuthRedirect";
import GlobalLoading from "@/components/loading/Loading";
export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  // const router = useRouter();
  const { authLoading, user } = useAuth();

  // useEffect(() => {
  //   if (!authLoading && !user || user?.role !== "WORKER") {
  //     router.push("/login");
  //   }
  // }, [authLoading, user,]);

  // if(authLoading || !user){
  //   return <div style={{minHeight:"80vh"}}>Loading...</div>;
  // }
      useAuthRedirect(authLoading, user, ["WORKER"]);
      console.log("WorkerLayout: authLoading:", authLoading, "user:", user);
  
      if (authLoading || !user) {
        return <GlobalLoading />;
      }
  return (
    <div>
      {/* You can add a common header or sidebar for worker routes here */}
      {children}
    </div>
  );
}