// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions)

export {handler as GET , handler as POST }


/*import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';
import { Profile } from 'next-auth';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }: { profile: Profile | undefined }) {
      try {
        if (profile?.sub && profile?.email) {
          const userExists = await prisma.user.findUnique({
            where: { googleId: profile.sub },
          });

          if (!userExists) {
            await prisma.user.create({
              data: {
                googleId: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
              },
            });
          }
          return true;
        }
        return false;
      } catch (error) {
        console.error('Erreur lors de la connexion ou de la création de l\'utilisateur :', error);
        return false;
      } finally {
        await prisma.$disconnect();
      }
    },
    async session({ session, token, user }: { session: Session; token: any; user: User }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session?.user?.email as string },
      });
    
      if (session?.user && dbUser) {
        session.user.id = dbUser.id;
        session.user.googleId = dbUser.googleId;
        session.user.role = dbUser.role; 
        session.user.imageLocal = dbUser.imageLocal;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

*/

/*// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';
import { Profile } from 'next-auth';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }: { profile: Profile | undefined }) {
      try {
        if (profile?.sub) {
          const userExists = await prisma.user.findUnique({
            where: { googleId: profile.sub },
          });

          if (!userExists) {
            await prisma.user.create({
              data: {
                googleId: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
              },
            });
          }
          return true;
        }
        return false;
      } catch (error) {
        console.error('Erreur lors de la connexion ou de la création de l\'utilisateur :', error);
        return false;
      }
    },
    async session({ session, token, user }: { session: Session; token: any; user: User }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session?.user?.email as string },
      });

      if (session?.user) {
        session.user.id = dbUser?.id;
        session.user.googleId = dbUser?.googleId;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };*/