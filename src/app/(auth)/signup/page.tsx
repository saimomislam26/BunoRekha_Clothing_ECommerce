
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SignInWithGoogleButton from '@/components/auth/SignInWithGoogleButton';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '@/lib/firebase';
// import { useRouter } from 'next/navigation';

const signupFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

export default function SignupPage() {
  const { toast } = useToast();
  // const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const onSignupSubmit = async (data: SignupFormValues) => {
    // Placeholder for email/password signup
    console.log("Signup attempt with:", data);
    toast({
      title: "Sign Up (Placeholder)",
      description: "Email/password signup is not yet implemented. Use Google Sign-In.",
    });
    // try {
    //   await createUserWithEmailAndPassword(auth, data.email, data.password);
    //   toast({ title: "Account Created!", description: "Welcome! You can now log in." });
    //   router.push('/login');
    // } catch (error: any) {
    //   toast({ title: "Sign Up Failed", description: error.message, variant: "destructive" });
    // }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold text-primary">Create Account</CardTitle>
        <CardDescription>Enter your details to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSignupSubmit)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-accent text-primary-foreground">
              Create Account
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
      <CardFooter className="flex justify-center text-sm">
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login">
            <span className="font-semibold underline hover:text-primary">Login</span>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
