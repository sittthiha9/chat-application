import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';  // Adjust this import based on your prisma setup

export async function POST(request: Request) {
  const {email, otp} = await request.json();

  const existingOtp = await prisma.otp.findFirst({
    where: {
      email,
      otp,
    },
  });

  if (!existingOtp) {
    return NextResponse.json({status: 'error', message: 'Invalid OTP'}, {status: 400});
  }

  const currentTime = new Date();
  if (existingOtp.expiration < currentTime) {
    return NextResponse.json({status: 'error', message: 'OTP has expired'}, {status: 400});
  }

  // Delete OTP after successful verification
  await prisma.otp.delete({
    where: {
      id: existingOtp.id,
    },
  });

  return NextResponse.json({status: 'success'});
}