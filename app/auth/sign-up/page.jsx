"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex flex-col items-center mb-5">
        <p className="font-semibold text-3xl">Sign up</p>
        <p className="text-muted/80 text-sm mt-3">
          Already have an account?{" "}
          <Link
            href={"sign-in"}
            className="underline text-primary font-semibold cursor-pointer"
          >
            Sign in here
          </Link>
        </p>
      </div>
      <Card className="w-[450px] bg-white pt-6 border-muted/10 shadow-md">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              {/* Name Field */}
              <div className="flex flex-col space-y-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  {...register("name", { required: "Name is required" })}
                  id="name"
                  placeholder="Enter your name"
                  autoFocus
                  className={`border-muted/80 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
              {/* Email Field */}
              <div className="flex flex-col space-y-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Entered value does not match email format",
                    },
                  })}
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
                  {...register("password", {
                    required: "Password is required",
                  })}
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
            <Button className="w-full mt-6" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
