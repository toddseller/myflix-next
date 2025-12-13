import { hashPassword, verifyPassword } from '@/lib/argon2';
import { sendEmail } from '@/lib/email';
import prisma from '@/lib/prisma';
import { normalizeName } from '@/lib/utils';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { createAuthMiddleware } from 'better-auth/api';
import { nextCookies } from 'better-auth/next-js';
import { username } from 'better-auth/plugins'

const reservedUsernames = [
  'admin',
  'administrator',
  'moderator',
  'moderators',
  'root',
  'superadmin',
  'superadmin',
  'superuser',
  'support',
  'system',
  'user',
  'users',
]

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: String(process.env.GOOGLE_CLIENT_ID!),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET!),
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({user, url}) {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        name: user.name,
        url,
      })
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      console.log('Path: ',ctx.path)
      console.log('Body: ',ctx.body)
      if (ctx.path === "/sign-up/email") {
        const name = normalizeName(ctx.body.name);
        console.log(`Updated Body: ${JSON.stringify({ ...ctx.body, name}, null, 2)}`)
        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name,
            }
          }
        };
      }
    })
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        input: true,
      },
    },
  },
  plugins: [username({
    validationOrder: {
      username: "post-normalization",
      displayUsername: "post-normalization",
    },
    usernameValidator: (username) => {
      return !reservedUsernames.includes(username);
    }
  }), nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;