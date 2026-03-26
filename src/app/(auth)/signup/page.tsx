'use client';
import { signupAction } from '@/actions/auth/auth.action';
import { signupSchema, SignupType } from '@/schemas/auth.schema';
import Typography from '@/components/ui/Typography';
import Heading from '@/components/ui/Heading';
import Logo from '@/components/Logo';
import Button from '@/components/ui/Button';
import { Field } from '@/types/form.types';
import FormWrapper, { SubmitButton } from '@/components/forms/FormWrapper';
import FormField from '@/components/forms/FormField';
import { Lock, Mail, ShieldCheck, User } from 'lucide-react';
import { ActionResponse } from '@/types/action.types';

const signupFields: Field[] = [
  {
    name: 'name',
    icon: User,
    placeholder: 'Enter your name',
    type: 'text',
    themeSize: 'sm',
  },
  {
    name: 'email',
    icon: Mail,
    placeholder: 'Enter your email',
    type: 'email',
    themeSize: 'sm',
  },
  {
    name: 'password',
    icon: Lock,
    placeholder: 'Create your password',
    type: 'password',
    themeSize: 'sm',
  },
  {
    name: 'confirmPassword',
    icon: ShieldCheck,
    placeholder: 'Confirm your password',
    type: 'password',
    themeSize: 'sm',
  },
];

export default function SignupForm() {
  const handleSubmitCallback = (response: ActionResponse) => {
    if (response.success) {
      console.log('Signup successful:', response);
    }
  };
  return (
    <div className="border-border bg-background w-full max-w-md rounded-2xl border p-8 shadow-sm">
      <Logo href="/" logoSize={30} textSize="sm" className="mx-auto mb-6 h-10 w-fit font-bold" />

      {/* Heading */}
      <Heading variant="h5" className="text-typography font-heading1 mb-2 text-center">
        Create your account
      </Heading>

      <Typography variant="p" className="text-muted-foreground mb-4 text-center">
        Start optimizing your resume in minutes
      </Typography>

      <FormWrapper<SignupType, ActionResponse>
        fields={signupFields}
        schema={signupSchema}
        onSubmitAction={signupAction}
        submitButton={<SubmitButton submitLabel="Sign Up" />}
        submitCallback={handleSubmitCallback}
      >
        <div className="mb-4 flex items-start gap-2">
          <FormField<SignupType>
            field={{
              id: 'terms',
              name: 'terms',
              type: 'checkbox',
              className: 'border-border accent-primary h-6 w-4 rounded',
            }}
            wrapperComponent={({ children }) => <>{children}</>}
          />

          <Typography variant="label" size="sm" className="text-typography-muted" htmlFor="terms">
            I agree to the{' '}
            <a href="#" className="text-primary hover:underline">
              Terms of Service{' '}
            </a>
            and{' '}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </Typography>
        </div>
      </FormWrapper>

      <div className="mt-4 flex items-center justify-center gap-1">
        <Typography variant="p" size="sm">
          Already have an account?
        </Typography>
        <Button
          variant="link"
          href="/signin"
          theme="secondary"
          size="sm"
          className="text-primary hover:text-primary w-auto border-none! bg-transparent px-0 hover:bg-transparent hover:underline"
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}
