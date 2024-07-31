import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';  // Adjust this import based on your prisma setup

export async function POST(request: Request) {
  const { email } = await request.json();

  const existingOtp = await prisma.otp.findFirst({
    where: {
      email,
    },
    select: {
      expiration: true,
    },
  });

  if (!existingOtp) {
    return NextResponse.json({ status: 'error', message: 'OTP not found' }, { status: 404 });
  }

  return NextResponse.json({ status: 'success', expiration: existingOtp.expiration });
}
