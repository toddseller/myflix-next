import { auth } from '@/lib/auth';
import { createAuthClient } from 'better-auth/client'
import { inferAdditionalFields, usernameClient } from 'better-auth/client/plugins'
import { nextCookies } from 'better-auth/next-js';

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    usernameClient(),
    nextCookies(),
  ]
})