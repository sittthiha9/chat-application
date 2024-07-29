import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const VerifyAccount = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Card className="w-[450px] bg-white pt-6 border-muted/10 shadow-md">
        <CardContent>
          <div className="flex flex-col items-center">
            <p className="font-semibold text-3xl">Verify Your Account</p>
            <p className="text-muted/80 text-sm mt-3">
              We have sent a verification code to your email.
            </p>
          </div>

          <form className="flex flex-col items-center justify-center mt-8">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button className="w-2/4 mt-6">Submit</Button>
          </form>
          <p className="text-muted/80 text-sm mt-9 text-center">
            Did not receive OTP?{" "}
            <Link
              href={""}
              className="underline text-primary font-semibold cursor-pointer"
            >
              Resend
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyAccount;
