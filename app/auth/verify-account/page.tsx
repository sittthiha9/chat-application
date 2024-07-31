"use client"

import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Card, CardContent} from "@/components/ui/card";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import {Button} from "@/components/ui/button";

const FormSchema = z.object({
  otp: z.string().length(6, {
    message: "OTP must be 6 characters.",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

const VerifyAccount = () => {
  const router = useRouter();
  const [expirationTime, setExpirationTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const {control, handleSubmit, watch, setValue} = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otp = watch('otp');
  const userEmail = localStorage.getItem('userEmail') || '';
  const awaitingVerification = localStorage.getItem('awaitingVerification');

  useEffect(() => {
    if (!awaitingVerification) {
      router.push('/auth/sign-up');
    }
  }, [awaitingVerification, router]);

  useEffect(() => {
    const fetchOtpExpiration = async () => {
      try {
        const res = await fetch('/api/fetch-otp-expiration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: userEmail}),
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error('Failed to fetch OTP expiration:', errorText);
          throw new Error('Failed to fetch OTP expiration');
        }

        const data = await res.json();
        setExpirationTime(new Date(data.expiration));
      } catch (error) {
        console.error("Error fetching OTP expiration:", error);
        setError("Something went wrong while fetching OTP expiration.");
      }
    };

    fetchOtpExpiration();
  }, [userEmail]);

  useEffect(() => {
    if (!expirationTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = expirationTime.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        setError("OTP has expired. Please request a new one.");
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expirationTime]);

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: userEmail, otp: data.otp}),
      });

      const result = await res.json();

      if (result.status === 'success') {
        localStorage.removeItem('awaitingVerification');
        localStorage.removeItem('userEmail');
        router.push('/auth/sign-in');
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("An error occurred while verifying OTP.");
    }
  };

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Card className="w-[450px] bg-white pt-6 border-muted/10 shadow-md">
        <CardContent>
          {error && <p className="text-red-500 text-center text-sm mb-3 bg-red-500/10 py-2">{error}</p>}
          <div className="flex flex-col items-center">
            <p className="font-semibold text-3xl">Verify Your Account</p>
            <p className="text-muted/80 text-sm mt-3">
              We have sent a verification code to your email.
            </p>
          </div>

          <form className="flex flex-col items-center justify-center mt-8" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="otp"
              control={control}
              render={({field}) => (
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        handleChange={(index, value) => {
                          const newOtp = field.value.split('');
                          newOtp[index] = value;
                          setValue('otp', newOtp.join(''));
                        }}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
            <Button className="w-2/4 mt-6" type="submit">Submit</Button>
          </form>
          {!error ? (
            <p className="text-muted/80 text-sm mt-7 text-center">
              Resend OTP in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </p>
          ) : (
            <p className="text-muted/80 text-sm mt-7 underline cursor-pointer text-center">
              Resend OTP
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyAccount;