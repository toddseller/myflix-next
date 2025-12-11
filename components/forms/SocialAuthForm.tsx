'use client'

import { Button } from '@/components/ui/button';
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
      <Button
        className='background-dark400_light900 gap-2.5 body-medium text-dark200_light800 rounded-2 min-h-12 flex-1 px-6 py-3.5'
        onClick={() => handleSignIn('google')} disabled={isLoading}>
        <Image src='/icons/google.svg' alt='Google Logo' width={20} height={20} className='mr-2.5 object-contain' />
        <span>Log in with Google</span>
      </Button>
    </div>
  )
}

export default SocialAuthForm
