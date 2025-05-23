
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label'; // Label not explicitly used, FormLabel is
import SignInWithGoogleButton from '@/components/auth/SignInWithGoogleButton';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
// import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase auth not used
// import { auth } from '@/lib/firebase'; // Firebase auth not used
// import { useRouter } from 'next/navigation';


const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  // const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    console.log("Login attempt with:", data);
    toast({
      title: "Login (Placeholder)",
      description: "Email/password login is a placeholder. Actual login functionality is not implemented.",
    });
    // try {
    //   if (!auth) {
    //      toast({ title: "Login Failed", description: "Authentication service not available.", variant: "destructive" });
    //      return;
    //   }
    //   await signInWithEmailAndPassword(auth, data.email, data.password);
    //   toast({ title: "Logged In!", description: "Welcome back." });
    //   router.push('/');
    // } catch (error: any) {
    //   toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    // }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold text-primary">Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onLoginSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-accent text-primary-foreground">
              Login
            </Button>
          </form>
        </Form>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <SignInWithGoogleButton />
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 text-sm">
        <Link href="/forgot-password"> {/* Placeholder link */}
          <span className="underline hover:text-primary">Forgot your password?</span>
        </Link>
        <p className="text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/signup">
            <span className="font-semibold underline hover:text-primary">Sign up</span>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
