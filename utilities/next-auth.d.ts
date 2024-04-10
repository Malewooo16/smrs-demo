import NextAuth from "next-auth"

declare module "next-auth" {
  
    interface User{
        
        role:string;
        parent:string?;
        teacher:string?;
        
    }
  interface Session {
    user: User & {
      firstName:string,
      lastName:string

    }
    token:{
        firstName:string,
    }
  }
}