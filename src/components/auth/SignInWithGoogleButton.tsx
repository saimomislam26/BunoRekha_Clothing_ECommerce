
"use client";

// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '@/lib/firebase'; // Firebase auth is not used in this version
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
// import { useRouter } from 'next/navigation'; // Not used for redirection in this version
import Image from 'next/image';

export default function SignInWithGoogleButton() {
  const { toast } = useToast();
  // const router = useRouter();

  const handleSignIn = async () => {
    // Firebase sign-in logic removed
    toast({
      title: 'Google Sign-In (Placeholder)',
      description: 'Google Sign-In functionality is currently not active.',
    });
    // const provider = new GoogleAuthProvider();
    // try {
    //   if (!auth) {
    //     toast({
    //       title: 'Sign-In Failed',
    //       description: 'Firebase authentication is not configured.',
    //       variant: 'destructive',
    //     });
    //     return;
    //   }
    //   await signInWithPopup(auth, provider);
    //   toast({
    //     title: 'Signed In Successfully!',
    //     description: 'Welcome back!',
    //   });
    //   router.push('/'); // Redirect to homepage or dashboard after sign-in
    // } catch (error: any) {
    //   console.error('Google Sign-In Error:', error);
    //   toast({
    //     title: 'Sign-In Failed',
    //     description: error.message || 'Could not sign in with Google. Please try again.',
    //     variant: 'destructive',
    //   });
    // }
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
