'use client'

import BetterAuthActionButton from '@/components/buttons/BetterAuthActionButton';
import ROUTES from '@/constants/routes';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const SocialAuthForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const handleSignIn = async (provider: 'google') => {
    setIsLoading(true);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: redirect ?? "/dashboard",
    });

    setIsLoading(false);

    toast.error('Failed to sign in', { description: error?.message || 'An error occurred during sign-in' })
  }

  return (
    <div className='mt-10 flex flex-wrap gap-2.5'>
      <BetterAuthActionButton
        className='background-dark400_light900 gap-2.5 body-medium text-dark200_light800 rounded-2 min-h-12 flex-1 px-6 py-3.5'
        action={() =>
          authClient.signIn.social({
            provider: 'google',
            callbackURL: ROUTES.HOME,
          })
        }
      >
        <Image src='/icons/google.svg' alt='Google Logo' width={20} height={20} className='mr-2.5 object-contain' />
        <span>Continue with Google</span>
      </BetterAuthActionButton>
    </div>
  )
}

export default SocialAuthForm
