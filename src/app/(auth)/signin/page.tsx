'use client';
import { loginAction } from '@/actions/auth/auth.action';
import { loginSchema, LoginType } from '@/schemas/auth.schema';
// import linkedInIcon from '@/assets/svgs/icons8-linkedin-50.svg';
import Typography from '@/components/ui/Typography';
import Heading from '@/components/ui/Heading';
import Logo from '@/components/Logo';
import Button from '@/components/ui/Button';
// import Image from 'next/image';
import { Field } from '@/types/form.types';
import FormWrapper, { SubmitButton } from '@/components/forms/FormWrapper';
import FormField from '@/components/forms/FormField';
import { Lock, User } from 'lucide-react';
import { ActionResponse } from '@/types/action.types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const loginFields: Field[] = [
  {
    // label: 'Email',
    name: 'email',
    type: 'text',
    placeholder: 'Email',
    icon: User,
    themeSize: 'sm',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    icon: Lock,
    themeSize: 'sm',
  },
];

export default function LoginForm() {
  const router = useRouter();
  const handleSubmitCallback = (response: ActionResponse) => {
    console.log('Login response:', response);
    if (response.success) {
      // console.log('Login successful:', response);
      toast.success(response.message || 'Login successful!');
      // Redirect or perform other actions on successful login
      if (response.data.isAdmin) {
        router.replace('/admin');
      } else {
        router.replace('/app');
      }
    } else {
      // console.log('Login failed:', response);
      const errorMessage =
        response.message || 'Login failed. Please check your credentials and try again.';
      toast.error(errorMessage);
    }
  };
  return (
    <div className="border-border bg-background w-full max-w-md rounded-2xl border p-8 shadow-sm">
      <Logo href="/" logoSize={30} textSize="sm" className="mx-auto mb-6 h-10 w-fit font-bold" />

      {/* Heading */}
      <Heading variant="h5" className="text-typography font-heading1 mb-2 text-center">
        Welcome back
      </Heading>
      <Typography variant="p" className="text-muted-foreground mb-8 text-center">
        Sign in to continue optimizing your resume
      </Typography>

      <FormWrapper<LoginType, ActionResponse>
        fields={loginFields}
        schema={loginSchema}
        onSubmitAction={loginAction}
        submitButton={<SubmitButton submitLabel="Sign In" />}
        submitCallback={handleSubmitCallback}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FormField<LoginType>
              field={{
                id: 'remember',
                name: 'remember',
                type: 'checkbox',
                className: 'border-border accent-primary h-4 w-4 rounded',
              }}
              wrapperComponent={({ children }) => <>{children}</>}
            />
            <Typography
              variant="label"
              size="sm"
              className="text-typography-muted"
              htmlFor="remember"
            >
              Remember me
            </Typography>
          </div>

          <Button
            variant="link"
            href="/forgot-password"
            theme="secondary"
            size="sm"
            className="text-primary hover:text-primary w-auto border-none! bg-transparent px-0 hover:bg-transparent hover:underline"
          >
            Forgot password?
          </Button>
        </div>
      </FormWrapper>

      {/* Divider */}
      {/* <div className="relative my-4 flex items-center">
        <div className="border-border grow border-t"></div>
        <Typography variant="span" className="text-typography-muted mx-4">
          Or continue with
        </Typography>
        <div className="border-border grow border-t"></div>
      </div> */}

      {/* OAuth Buttons */}
      {/* <div className="flex flex-col gap-3">
        <Button
          size="sm"
          image={
            <Image
              src={linkedInIcon}
              alt="google"
              width={16}
              height={16}
              className="brightness-0 invert"
            />
          }
        >
          Continue with Google
        </Button>

        <Button
          size="sm"
          image={
            <Image
              src={linkedInIcon}
              alt="linkedin"
              width={16}
              height={16}
              className="brightness-0 invert"
            />
          }
        >
          Continue with LinkedIn
        </Button>
      </div> */}

      {/* Signup */}
      <div className="mt-4 flex items-center justify-center gap-1">
        <Typography variant="p" size="sm">
          Don’t have an account?
        </Typography>
        <Button
          variant="link"
          href="/signup"
          theme="secondary"
          size="sm"
          className="text-primary hover:text-primary w-auto border-none! bg-transparent px-0 hover:bg-transparent hover:underline"
        >
          Create account
        </Button>
      </div>
    </div>
  );
}
