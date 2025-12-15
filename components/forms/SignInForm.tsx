'use client';

import LoadingButton from '@/components/buttons/LoadingButton';
import PasswordInput from '@/components/forms/PasswordInput';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ROUTES from '@/constants/routes';
import { authClient } from '@/lib/auth-client';
import { SignInSchema } from '@/lib/validations';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type SignInValues = z.infer<typeof SignInSchema>;

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get('redirect');

  const form = useForm<SignInValues>({
    resolver: standardSchemaResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  async function onSubmit({ email, password, rememberMe }: SignInValues) {
    setError(null);
    setLoading(true);

    const { error, data } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
    });

    setLoading(false);

    if (error) {
      if (error.code === 'EMAIL_NOT_VERIFIED') {
        router.push(ROUTES.VERIFY_EMAIL(btoa(email)));
      }
      setError(error.message || 'Something went wrong');
    } else {
      const id = data.user?.username ? data.user.username : data.user.id;
      console.log('Sign in data: ', data);
      toast.success('Signed in successfully');
      router.push(redirect ?? ROUTES.PROFILE(id));
    }
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

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-0.5'>
              <div className='flex items-center'>
                <FormLabel className='paragraph-medium text-dark400_light700'>Password</FormLabel>
                <Link
                  href='/forgot-password'
                  className='primary-text-gradient ml-auto inline-block text-sm'
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <PasswordInput
                  autoComplete='current-password'
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
          name='rememberMe'
          render={({ field }) => (
            <FormItem className='flex items-center gap-2.5'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className='-mt-[10px] paragraph-regular text-dark300_light700'>Remember me</FormLabel>
            </FormItem>
          )}
        />

        {error && (
          <div role='alert' className='text-sm text-red-600'>
            {error}
          </div>
        )}

        <LoadingButton type='submit' className='w-full' loading={loading}>
          Login
        </LoadingButton>

        <p>
          Don&apos;t have an account?{' '}
          <Link href={ROUTES.SIGN_UP} className='paragraph-semibold primary-text-gradient'>
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default SignInForm;