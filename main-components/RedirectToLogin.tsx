'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation'
export default function RedirectToLogin() {
  const router = useRouter();
const pathname=usePathname()
  useEffect(() => {
    // Check if the current pathname is '/dashboard'
    if (pathname === '/dashboard') {
      // Redirect to the login page
      router.push('/');
    }
  }, [pathname]); // An empty dependency array ensures the effect runs only once

  return <div> Error!! Redirecting To Login</div>;
}

