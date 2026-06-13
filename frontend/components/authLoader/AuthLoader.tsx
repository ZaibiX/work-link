// "use client";
// import useAuth from "../../utils/store/authStore";
// export default function AuthLoader(){
//     const {checkAuth} = useAuth();

//     checkAuth();
//     console.log("Checking Auth");

//     return null;
// }

// components/providers/AuthLoader.tsx
"use client";

import { useEffect } from 'react';
import useAuth from '../../lib/store/authStore';

export default function AuthLoader() {
  const checkAuth = useAuth((state) => state.checkAuth);

  useEffect(() => {
    // This runs once in the browser on refresh

    console.log("From main layout.tsx(authLaoder): checking auth")
    checkAuth();
  }, [checkAuth]);

  return null; // This component renders nothing
}