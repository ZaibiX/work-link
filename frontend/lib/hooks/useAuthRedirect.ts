'use client'
 
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface User {
  role: string;
}

export function useAuthRedirect(
  authLoading: boolean, 
  user: User | null | undefined, 
  allowedRoles: string[] = ["CLIENT"]
) {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // 1. Wait until authentication loading is finished
    if (authLoading) return;

    // 2. Check if user is missing OR doesn't have the right role
    const hasAccess = user && allowedRoles.includes(user.role);
    console.log(pathname, encodeURIComponent(pathname))
    if (!hasAccess) {
      // 3. Construct the callback URL
      // If they are on /dashboard, loginUrl becomes /login?callbackUrl=/dashboard
      const loginUrl = `/login?callbackUrl=${encodeURIComponent(pathname)}`
      
      router.push(loginUrl)
    }
  }, [authLoading, user, allowedRoles, pathname, router])

//   return <div> loading </div>
}