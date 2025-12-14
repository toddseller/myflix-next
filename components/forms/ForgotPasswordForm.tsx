'use client';

import LoadingButton from '@/components/buttons/LoadingButton';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ROUTES from '@/constants/routes';
import { authClient } from '@/lib/auth-client';
import { ForgotPasswordSchema } from '@/lib/validations';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get('redirect');

  const form = useForm<ForgotPasswordValues>({
    resolver: standardSchemaResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: ForgotPasswordValues) {
    setError(null);
    setLoading(true);

    await authClient.requestPasswordReset({
      ...data, redirectTo: ROUTES.RESET_PASSWORD
    }, {
      onError: (error) => {
        setError(error.error.message || 'Something went wrong');
      },
      onSuccess: () => {
        toast.success('Password reset email sent.');
      }
    })

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='mt-10 space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-0.5'>
              <FormLabel className='paragraph-medium text-dark400_light700'>Email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='john@email.com'
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
          Send Reset Email
        </LoadingButton>
      </form>
    </Form>
  );
}

export default ForgotPasswordForm;