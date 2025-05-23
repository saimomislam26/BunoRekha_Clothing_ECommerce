
"use client"; 

import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { auth } from '@/lib/firebase'; // Firebase auth not used
import { useRouter } from 'next/navigation'; 
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from 'react'; // Removed useEffect
// import type { User as FirebaseUser } from 'firebase/auth'; // FirebaseUser type not used


const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  // const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null); // Firebase currentUser not used
  // const [isLoadingUser, setIsLoadingUser] = useState(true); // isLoadingUser not needed without Firebase

  // useEffect(() => { // Firebase auth state listener removed
  //   if (auth) {
  //     const unsubscribe = auth.onAuthStateChanged((user) => {
  //       setCurrentUser(user);
  //       setIsLoadingUser(false);
  //       // if (!user) {
  //       //   router.push('/login'); 
  //       // }
  //     });
  //     return () => unsubscribe();
  //   } else {
  //     setIsLoadingUser(false); // If auth is not available, stop loading
  //   }
  // }, [router]);


  const handleLogout = async () => {
    // try { // Firebase signout logic removed
    //   if (auth) {
    //     await auth.signOut();
    //   }
      toast({
        title: 'Logged Out (Placeholder)',
        description: 'You have been logged out.',
      });
      router.push('/login'); 
    // } catch (error: any) {
    //   toast({
    //     title: 'Logout Failed',
    //     description: error.message || 'Could not log out. Please try again.',
    //     variant: 'destructive',
    //   });
    // }
  };
  
  // if (isLoadingUser) { // isLoadingUser check removed
  //   return (
  //     <div className="flex min-h-screen w-full items-center justify-center bg-muted/40">
  //       Loading admin panel...
  //     </div>
  //   );
  // }


  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      {/* Desktop Sidebar */}
      <aside className="sticky top-0 h-screen hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <span className="text-xl">BunoRekha</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <ul className="grid items-start px-4 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto p-4 border-t">
            <Button variant="outline" className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col sm:pl-64"> 
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4">
          {/* Mobile Menu Trigger */}
          <div className="sm:hidden">
             <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Admin Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[260px] bg-background p-0">
                    <div className="flex h-16 items-center border-b px-6">
                        <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold" onClick={() => setIsMobileSheetOpen(false)}>
                            <LayoutDashboard className="h-6 w-6 text-primary" />
                            <span className="text-xl">BunoRekha</span>
                        </Link>
                    </div>
                    <nav className="flex-1 overflow-auto py-4">
                        <ul className="grid items-start px-4 text-sm font-medium">
                            {navItems.map((item) => (
                            <li key={item.label}>
                                <Link
                                href={item.href}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
                                onClick={() => setIsMobileSheetOpen(false)}
                                >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                                </Link>
                            </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="mt-auto p-4 border-t">
                        <Button variant="outline" className="w-full" onClick={() => { handleLogout(); setIsMobileSheetOpen(false); }}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </SheetContent>
             </Sheet>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {/* {currentUser ? currentUser.email || 'Admin User' : 'Admin User'} // Firebase currentUser not used */}
              Admin User
            </span>
          </div>
        </header>
        <main className="flex-1 p-4 sm:px-4 sm:py-4">
          {children}
        </main>
        <footer className="border-t bg-background p-4 text-center text-sm text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} BunoRekha Admin Panel
        </footer>
      </div>
    </div>
  );
}
