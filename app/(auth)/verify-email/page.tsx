'use client';

import BetterAuthActionButton from '@/components/buttons/BetterAuthActionButton';
import ROUTES from '@/constants/routes';
import { authClient } from '@/lib/auth-client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';


const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const encodedEmail = searchParams.get('e');
  const email = encodedEmail ? atob(encodedEmail) : null;
  const [timeToNextResend, setTimeToNextResend] = useState(45);
  const interval = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    startEmailVerificationCountdown();
  }, [])

  function startEmailVerificationCountdown(time = 45) {
    setTimeToNextResend(time);
    interval.current = setInterval(() => {
      setTimeToNextResend(t => {
        const newT = t - 1;
        if (newT <= 0) {
          clearInterval(interval.current)
          return 0;
        }
        return newT;
      });
    }, 1000)
  }

  return (
    <div className='mt-10 space-y-6'>
      <h1 className='h2-bold text-dark100_light900'>Verify Your Email</h1>
      <p className='paragraph-regular text-md text-dark500_light400'>
        We sent you a verification link. Please check your email and click the link<br/>to verify your account.
      </p>

      <BetterAuthActionButton
        className='primary-gradient paragraph-medium rounded-2 font-inter !text-light-900 min-h-12 w-full px-4 py-3'
        successMessage='Verification email sent successfully.'
        disabled={timeToNextResend > 0}
        action={() => {
          startEmailVerificationCountdown(45);
          return authClient.sendVerificationEmail({email: email!, callbackURL: ROUTES.HOME});
        }}
      >
        {timeToNextResend > 0 ? `Resend in ${timeToNextResend}s` : 'Resend Email'}
    </BetterAuthActionButton>
    </div>
  );
}

export default VerifyEmail;