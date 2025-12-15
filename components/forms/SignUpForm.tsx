'use client';

import LoadingButton from '@/components/buttons/LoadingButton';
import PasswordInput from '@/components/forms/PasswordInput';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ROUTES from '@/constants/routes';
import { authClient } from '@/lib/auth-client';
import { SignUpSchema } from '@/lib/validations';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type SignUpFormProps = z.infer<typeof SignUpSchema>;

const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<SignUpFormProps>({
    resolver: standardSchemaResolver(SignUpSchema),
    defaultValues: {
      email: '',
      name: '',
      username: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  async function onSubmit(data: SignUpFormProps) {
    setError(null);

    const res = await authClient.signUp.email({
      ...data, callbackURL: ROUTES.PROFILE(data.username),
    }, {
      onError: (error) => {
        setError(error.error.message || 'Something went wrong');
      },
      onSuccess: () => {
        toast.success('Signed up successfully');
      }
    });

    if (res.error === null && !res.data.user.emailVerified) {
      const encodedEmail = btoa(res.data.user.email);
      router.push(ROUTES.VERIFY_EMAIL(encodedEmail));
    }
  }

  const loading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='mt-10 space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-0.5'>
              <FormLabel className='paragraph-medium text-dark400_light700'>Email Address</FormLabel>
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

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-0.5'>
              <FormLabel className='paragraph-medium text-dark400_light700'>Name</FormLabel>
              <FormControl>
                <Input placeholder='John Doe'
                       className='paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus rounded-1.5 min-h-12 border' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-0.5'>
              <FormLabel className='paragraph-medium text-dark400_light700'>Username</FormLabel>
              <FormControl>
                <Input placeholder='johnnyD'
                       className='paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus rounded-1.5 min-h-12 border' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-0.5'>
              <FormLabel className='paragraph-medium text-dark400_light700'>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete='new-password'
                  placeholder='Password'
                  className='paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus rounded-1.5 min-h-12 border'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='passwordConfirmation'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-0.5'>
              <FormLabel className='paragraph-medium text-dark400_light700'>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete='new-password'
                  placeholder='Confirm password'
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

        <LoadingButton type='submit' loading={loading}>
          Create an account
        </LoadingButton>

        <p>
          Already have an account?{' '}
          <Link href={ROUTES.SIGN_IN} className='paragraph-semibold primary-text-gradient'>
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default SignUpForm;