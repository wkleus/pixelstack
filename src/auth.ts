import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { authConfig } from './auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email
        const password = credentials?.password

        // basic type guard
        if (typeof email !== 'string' || typeof password !== 'string') {
          return null
        }

        const adminEmail = process.env.ADMIN_EMAIL
        const adminPasswordHashB64 = process.env.ADMIN_PASSWORD_HASH_B64

        // fail closed if env vars are missing, instead of crashing
        if (!adminEmail || !adminPasswordHashB64) {
          console.error(
            'ADMIN_EMAIL / ADMIN_PASSWORD_HASH_B64 are not configured — see README > Admin Area',
          )
          return null
        }

        // case-insensitive email check
        if (email.toLowerCase() !== adminEmail.toLowerCase()) {
          return null
        }

        // hash is stored as Base64 in .env because the raw bcrypt hash
        // contains "$" characters that get corrupted by .env variable
        // expansion / shell quoting — decode it back before comparing
        const adminPasswordHash = Buffer.from(
          adminPasswordHashB64,
          'base64',
        ).toString('utf-8')

        // compare submitted password against the stored hash
        const passwordMatches = await bcrypt.compare(
          password,
          adminPasswordHash,
        )
        if (!passwordMatches) {
          return null
        }

        // single-admin setup
        return { id: 'admin', email: adminEmail, name: 'Admin' }
      },
    }),
  ],
})
