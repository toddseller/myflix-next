import { createAuthClient } from 'better-auth/client'
import { usernameClient } from 'better-auth/client/plugins'
import { nextCookies } from 'better-auth/next-js';

export const authClient = createAuthClient({
  plugins: [
    usernameClient(),
    nextCookies(),
  ]
})