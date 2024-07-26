import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';

export async function middleware(req) {
  console.log('Request URL:', req.nextUrl.pathname);
  const session = await getSession({ req });
  if (!session && req.nextUrl.pathname !== '/auth/sign-in') {
    console.log('Redirecting to sign-in page');
    return NextResponse.redirect('/auth/sign-in');
  }
  return NextResponse.next();
}