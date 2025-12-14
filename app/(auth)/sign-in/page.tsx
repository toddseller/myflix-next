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
      console.log('Session: ', session.data)
      if (session.data != null) router.push(ROUTES.HOME)
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
