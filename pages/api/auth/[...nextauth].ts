import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { adminAuth } from '~/vendor/firebase/server'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: FirestoreAdapter({
    apiKey: process.env.FIREBASE_API_KEY,
    appId: process.env.FIREBASE_APP_ID,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  }),
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account || account.provider !== 'google') {
        return false
      }
      if (!profile || profile.email == null) {
        return false
      }
      if (!profile.email.endsWith('@grooveagent.co.jp')) {
        return false
      }
      try {
        await adminAuth.getUserByEmail(profile.email)
      } catch (e) {
        await adminAuth.createUser({
          email: user.email!,
        })
      }
      return true
    },
    async session({ session, token, user }) {
      if (session?.user) {
        session.customToken = token.customToken as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (!user || !user.email) {
        return token
      }
      try {
        const userRecord = await adminAuth.getUserByEmail(user.email!)
        const customToken = await adminAuth.createCustomToken(userRecord.uid)
        token.customToken = customToken
      } catch (e) {
        throw new Error('Not found user')
      }
      return token
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/top`
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: 'dsjkajgio[dsatadasghads',
  debug: false,
}
export default NextAuth(authOptions)
