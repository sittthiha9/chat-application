import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';  // Adjust this import based on your prisma setup
import { addMinutes } from 'date-fns';

export async function POST(request: Request) {
  const { email, otp } = await request.json();

  // Set OTP expiration time to 1 minute
  const expiration = addMinutes(new Date(), 2);

  // Save OTP in the database
  await prisma.otp.create({
    data: {
      email,
      otp,
      expiration,
    },
  });

  // Configure the transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // or your email provider
    auth: {
      user: process.env.EMAIL_USER, // your email address
      pass: process.env.EMAIL_PASS, // your email password
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It will expire in 1 minute.`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ status: 'error', error: 'Failed to send email' }, { status: 500 });
  }
}
