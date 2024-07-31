"use client";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {registerSchema, RegisterSchema} from "@/lib/schemas/registerSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerUser} from "@/app/actions/authActions";
import {useToast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {useRouter} from "next/navigation";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting, isValid},
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const {toast} = useToast();
  const router = useRouter();

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);

    if (result.status === "success") {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      console.log("🚀 ~ onSubmit ~ otp:", otp);
      await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: data.email, otp}),
      });
      console.log("done");
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('awaitingVerification', 'true');
      router.push("/auth/verify-account");
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((e) => {
          const fieldName = e.path.join(".");
          setError(fieldName as keyof RegisterSchema, {
            message: e.message,
          });
          toast({
            title: "Error!",
            description: `${e.message}.`,
            action: <ToastAction altText="close">Close</ToastAction>,
          });
        });
      }
    }
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
                <div>
                  <Input
                    {...register("name")}
                    id="name"
                    placeholder="Enter your name"
                    autoFocus
                    className={`border-muted/80 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Email Field */}
              <div className="flex flex-col space-y-3">
                <Label htmlFor="email">Email</Label>
                <div>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`border-muted/80 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                </div>
              </div>
              {/* Password Field */}
              <div className="flex flex-col space-y-3">
                <Label htmlFor="password">Password</Label>
                <div>
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
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {errors.root?.serverError && (
              <p className="text-red-500 text-sm">
                {errors.root.serverError.message}
              </p>
            )}
            <Button className="w-full mt-6" disabled={isSubmitting || !isValid}>
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
