
"use client";

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignInWithGoogleButton() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: 'Signed In Successfully!',
        description: 'Welcome back!',
      });
      router.push('/'); // Redirect to homepage or dashboard after sign-in
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      toast({
        title: 'Sign-In Failed',
        description: error.message || 'Could not sign in with Google. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={handleSignIn}
    >
      <Image src="/google-logo.svg" alt="Google logo" width={20} height={20} className="mr-2" data-ai-hint="logo google" />
      Sign in with Google
    </Button>
  );
}
