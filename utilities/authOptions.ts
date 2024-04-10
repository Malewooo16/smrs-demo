
import prisma from "@/db/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcrypt"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions:NextAuthOptions={
    adapter: PrismaAdapter(prisma) ,
    secret: process.env.NEXTAUTH_SECRET ,
    session:{
        strategy:"jwt"
    },
    pages:{
      signIn:"/",
      
    },
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          id:'Credentials',
          name: 'Credentials',
          
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
           if(!credentials?.username || !credentials?.password ){
            return null
           }
            const existingUser=await prisma.user.findUnique({
                where:{username:credentials.username}
            })

            if(!existingUser){
                return null
            }
            
             
            if(credentials.password !== existingUser.password){
                return null
            }
            return{ 
                id: `${existingUser.id}`,
                email:existingUser.username,
                role:existingUser.role,
                parent:`${existingUser.parentId}`,
                teacher:`${existingUser.teacherId}`

            }
          }
        }),
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          id:'token',
          name: 'token',
          
          credentials: {
            token: { label: "token", type: "text",  },
            
          },
     
          async authorize(credentials) {
           if(!credentials?.token  ){
            return null
           }
           console.log(credentials.token)
            const existingParent=await prisma.parent.findFirst({
                where:{identifier:credentials.token}
            })

            if(!existingParent){
                return null
            }
            
            const updatedUser = await prisma.user.update({
              where:{
                username:existingParent.email
              },
              data:{
                parent:{connect:{id:existingParent.id}}
              }
              
            })
           
          
            return{ 
                id: `${updatedUser.id}`,
                email:updatedUser.username,
                role:updatedUser.role,
                parent:`${updatedUser.parentId}`,
                teacher:`${updatedUser.teacherId}`

                
            }
          },
          
        })
      ],
      callbacks:{
          async jwt({ token, user }) {
            if(user){
                return{
                    ...token,
                    teacher:user.teacher,
                    parent:user.parent,
                    role:user.role,
                    email:user.email,
                    id:user.id
                }
                
            }
            return token
          },
          async session({ session,  token }) {
            return {
                ...session,
            user:{
                ...session.user,
                teacher:token.teacher,
                parent:token.parent,
                email:token.email,
                role:token.role,
                id:token.id
            }
            }
          },
      }
}

