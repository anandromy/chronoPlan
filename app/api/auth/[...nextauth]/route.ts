import prisma from "@/lib/prisma"
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn:  '/auth/signin',
        signOut: '/auth/signout'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
        async signIn({ profile }){
            if(!profile?.email){
                throw new Error('No user')
            }
            const user = await prisma.user.upsert({
                where: {
                    email: profile?.email
                },
                create: {
                    email:  profile.email,
                    name: profile.name,
                    avatar: profile.image
                },
                update: {
                    avatar: profile.image,
                    name: profile.name,
                    email: profile.email
                }
            })
            return true
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }