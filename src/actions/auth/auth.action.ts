/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { loginSchema, LoginType, signupSchema, SignupType } from '@/schemas/auth.schema';
import { ActionResponse } from '@/types/action.types';
import { cookies } from 'next/headers';
import { z } from 'zod';
export async function loginAction(data: LoginType): Promise<ActionResponse> {
  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: z.flattenError(result.error).fieldErrors };
  }
  const response = await fetch(`${process.env.API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log('Login successful:', data);
      return data;
    })
    .catch((error) => {
      // console.error('Login error:', error);
      return { success: false, message: error.message };
    });

  if (response.success) {
    // 2. Set the secure cookie
    const cookieStore = await cookies();
    const foundAdmin = response.data?.role.find((role: any) => role.roleName === 'ROLE_ADMIN');
    const isAdmin = foundAdmin ? true : false;
    cookieStore.set('is-admin', isAdmin?.toString() || 'false', {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in prod
      sameSite: 'strict', // Protects against CSRF
      path: '/', // Available everywhere in the app
      maxAge: 60 * 60 * 24, // 1 day in seconds
    });

    cookieStore.set('token', response.data?.token || 'false', {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in prod
      sameSite: 'strict', // Protects against CSRF
      path: '/', // Available everywhere in the app
      maxAge: 60 * 60 * 24, // 1 day in seconds
    });
    response.data.isAdmin = isAdmin || false;
  }
  // Simulated database check (e.g., check if user exists)
  // if (data.email === 'taken@example.com') {
  //   return {
  //     success: false,
  //     errors: { email: ['This email is already registered.'] },
  //   };
  // }

  return response;
}

export async function signupAction(data: SignupType): Promise<ActionResponse> {
  const result = signupSchema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: z.flattenError(result.error).fieldErrors };
  }

  // // Simulated database check (e.g., check if user exists)
  // if (data.email === 'taken@example.com') {
  //   return {
  //     success: false,
  //     errors: { email: ['This email is already registered.'] },
  //   };
  // }

  return { success: true };
}
