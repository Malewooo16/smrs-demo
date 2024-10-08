"use client"

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Audio, ColorRing, Vortex } from 'react-loader-spinner'

export default function AutoLoginHandler() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get('token')
    const escuela = searchParams.get('escuela')
    const [loading, setLoading] = useState(false)
    
      useEffect(() => {
        
        const login = async () => {
            
            try {
                const signInData = await signIn('token', { token , redirect:false });
                if (signInData?.error) {
                    throw new Error(`Sign in failed ${signInData.error}` );
                    
                } else {
                    router.push(`/padmissions`)
                   
                }
            } catch (error) {
                console.log(error)
                toast.error('Sign in failed');
            }
        };
        login();
      }, [token]);
         
 
     
  return (
    <div className="flex items-center justify-center">
        <Vortex
  visible={true}
  height="80"
  width="80"
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
  />
  
    </div>
  )
}

