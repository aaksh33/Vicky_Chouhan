import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text' },
        phone: { label: 'Phone', type: 'text' },
        isSignUp: { label: 'IsSignUp', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // Default admin
        if (credentials.email === 'admin@electronic.com') {
          let admin = await prisma.user.findUnique({ where: { email: credentials.email } })
          if (!admin) {
            admin = await prisma.user.create({
              data: {
                email: credentials.email,
                name: 'Sonu',
                phone: '9905757864',
                role: 'admin',
                password: await bcrypt.hash(credentials.password, 12)
              }
            })
          } else if (admin.role !== 'admin') {
            admin = await prisma.user.update({
              where: { email: credentials.email },
              data: { role: 'admin', name: 'Sonu', phone: '9905757864' }
            })
          }

          if (admin.password && await bcrypt.compare(credentials.password, admin.password)) {
            return { id: admin.id, email: admin.email, name: admin.name, role: admin.role }
          }
          return null
        }

        // Sign up new user
        if (credentials.isSignUp === 'true') {
          const existingUser = await prisma.user.findUnique({ where: { email: credentials.email } })
          if (existingUser) return null
          const newUser = await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.name || credentials.email.split('@')[0],
              phone: credentials.phone || null,
              password: await bcrypt.hash(credentials.password, 12),
              role: 'user'
            }
          })
          return { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role }
        }

        // Sign in existing user
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (!user || !user.password) return null
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null

        return { id: user.id, email: user.email, name: user.name, role: user.role }
      }
    })
  ],

  session: { strategy: 'jwt' },

  pages: { signIn: '/auth/signin' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role || (user.email === 'admin@electronic.com' ? 'admin' : 'user')
      }
      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },

    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        const existingUser = await prisma.user.findUnique({ where: { email: user.email } })
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              phone: user.email === 'admin@electronic.com' ? '9905757864' : null,
              role: user.email === 'admin@electronic.com' ? 'admin' : 'user'
            }
          })
        } else if (user.email === 'admin@electronic.com' && existingUser.role !== 'admin') {
          await prisma.user.update({
            where: { email: 'admin@electronic.com' },
            data: { role: 'admin', name: 'Sonu', phone: '9905757864' }
          })
        }
      }
      return true
    }
  }
}
