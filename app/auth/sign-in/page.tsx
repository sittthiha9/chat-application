"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, LoginSchema } from "@/lib/schemas/loginSchema";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex flex-col items-center mb-5">
        <p className="font-semibold text-3xl">Sign in</p>
        <p className="text-muted/80 text-sm mt-3">
          Don't have an account yet?{" "}
          <Link
            href={"sign-up"}
            className="underline text-primary font-semibold cursor-pointer"
          >
            Register here
          </Link>
        </p>
      </div>
      <Card className="w-[450px] bg-white pt-6 border-muted/10 shadow-md">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              {/* Email Field */}
              <div className="flex flex-col space-y-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`border-muted/80 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
              {/* Password Field */}
              <div className="flex flex-col space-y-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  className={`border-muted/80 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <Button className="w-full mt-6" disabled={isSubmitting || !isValid}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="flex flex-col items-center mt-5">
        <p className="text-muted/80 text-sm mt-3">
          Forgot your password?{" "}
          <span className="underline text-primary font-semibold cursor-pointer">
            Reset
          </span>
        </p>
      </div>
    </div>
  );
}
