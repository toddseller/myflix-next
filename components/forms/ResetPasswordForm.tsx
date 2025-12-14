'use client';

import LoadingButton from '@/components/buttons/LoadingButton';
import PasswordInput from '@/components/forms/PasswordInput';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import ROUTES from '@/constants/routes';
import { authClient } from '@/lib/auth-client';
import { ResetPasswordSchema } from '@/lib/validations';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const resetError = searchParams.get('error');

  const form = useForm<ResetPasswordFormValues>({
    resolver: standardSchemaResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  async function onSubmit(data: ResetPasswordFormValues) {
    setError(null);
    setLoading(true);

    if (token === null) return

    await authClient.resetPassword({
      newPassword: data.password,
      token,
    }, {
      onError: (error) => {
        setError(error.error.message || 'Something went wrong');
        setTimeout(() => {
          router.push(ROUTES.SIGN_IN)
        }, 1500)
      },
      onSuccess: () => {
        toast.success('Password reset successfully.', {description: 'Redirecting to login...'});
        setTimeout(() => {
          router.push(ROUTES.SIGN_IN)
        }, 1500)
      }
    })

    if (token === null || resetError !== null) {
      return (
        <div className='text-center'>
          <p className='paragraph-semibold text-dark400_light700'>Invalid reset password link</p>
          <p className='paragraph-regular text-dark300_light700'>Please check the link in your email and try again.</p>

        </div>
      )
    }

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='mt-10 space-y-6'>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-0.5'>
              <FormLabel className='paragraph-medium text-dark400_light700'>New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete='new-password'
                  className='paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus rounded-1.5 min-h-12 border'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <div role='alert' className='text-sm text-red-600'>
            {error}
          </div>
        )}

        <LoadingButton type='submit' className='w-full' loading={loading}>
          Reset Password
        </LoadingButton>
      </form>
    </Form>
  );
}

export default ResetPasswordForm;