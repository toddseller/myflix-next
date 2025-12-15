'use client'

import SignInForm from '@/components/forms/SignInForm';
import SocialAuthForm from '@/components/forms/SocialAuthForm';
import ROUTES from '@/constants/routes';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SignIn = () => {
  const router = useRouter();
  useEffect(() => {
    authClient.getSession().then(session => {
      if (session.data != null) {
        const id = session.data.user.username ? session.data.user.username : session.data.user.id;
        router.push(ROUTES.PROFILE(id))
      }
    })
  }, [router])

  return (
    <>
      <SignInForm />
      <SocialAuthForm />
    </>
  )
}

export default SignIn
