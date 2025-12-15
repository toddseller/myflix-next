import { hashPassword, verifyPassword } from '@/lib/argon2';
import { sendResetPasswordEmail, sendVerifyPasswordEmail } from '@/lib/email';
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
    requireEmailVerification: true,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    sendResetPassword: async ({ user, url }) => {
      await sendResetPasswordEmail({ user, url })
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({user, url}) {
      await sendVerifyPasswordEmail({ user, url })
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const name = normalizeName(ctx.body.name);
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