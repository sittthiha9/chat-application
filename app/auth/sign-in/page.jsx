"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex flex-col items-center mb-5">
        <p className="font-semibold text-3xl">Sign in</p>
        <p className="text-muted/80 text-sm mt-3">
          Don't have an account yet?{" "}
          <span className="underline text-primary font-semibold cursor-pointer">
            Register here
          </span>
        </p>
      </div>
      <Card className="w-[450px] bg-white pt-6 border-muted/10 shadow-md">
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signIn("credentials", {
                redirect: true,
                callbackUrl: "/",
              });
            }}
          >
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  required
                  id="name"
                  placeholder="Enter your name"
                  autoFocus
                  className="border-muted/80"
                />
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  required
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="border-muted/80"
                />
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  required
                  id="password"
                  placeholder="Enter your password"
                  className="border-muted/80"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex">
          <Button className="w-full">Sign in</Button>
        </CardFooter>
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

    // <div>
    //   <h1>Sign In</h1>
    //   <form
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       signIn("credentials", {
    //         redirect: true,
    //         callbackUrl: "/",
    //       });
    //     }}
    //   >
    //     <input name="email" type="email" placeholder="Email" required />
    //     <input
    //       name="password"
    //       type="password"
    //       placeholder="Password"
    //       required
    //     />
    //     <button type="submit">Sign In</button>
    //   </form>
    // </div>
  );
}
