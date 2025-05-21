
"use client"; // Required for useRouter and useState

import Link from 'next/link';
import { ShoppingCart, Heart, User, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NavLink from './NavLink';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Corrected import

const Header = () => {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const router = useRouter();
  const [desktopSearchTerm, setDesktopSearchTerm] = useState('');
  const [mobileSearchTerm, setMobileSearchTerm] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);


  const handleSearch = (term: string) => {
    if (term.trim()) {
      router.push(`/products?search=${encodeURIComponent(term.trim())}`);
      setDesktopSearchTerm(''); // Clear input after search
      setMobileSearchTerm('');  // Clear input after search
      setIsSheetOpen(false); // Close sheet if mobile search initiated it
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <span className="text-3xl font-bold text-primary hover:text-accent transition-colors">
            BunoRekha
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="hidden sm:flex items-center space-x-2 bg-secondary rounded-md p-1">
            <Input
              type="search"
              placeholder="Search products..."
              className="h-9 w-full md:w-[200px] lg:w-[250px] bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={desktopSearchTerm}
              onChange={(e) => setDesktopSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch(desktopSearchTerm);
                }
              }}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-foreground hover:text-primary h-8 w-8"
              onClick={() => handleSearch(desktopSearchTerm)}
              aria-label="Search products"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          
          <Button variant="ghost" size="icon" asChild className="text-foreground hover:text-primary">
            <Link href="/wishlist">
              <Heart className="h-6 w-6" />
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-foreground hover:text-primary">
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-foreground hover:text-primary hidden md:inline-flex">
             <Link href="#"> {/* Placeholder for user account/login */}
              <User className="h-6 w-6" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background p-6">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                     <Link key={item.href} href={item.href} passHref legacyBehavior>
                        <a onClick={() => setIsSheetOpen(false)} className="text-lg text-foreground/80 hover:text-primary transition-colors">
                          {item.label}
                        </a>
                    </Link>
                  ))}
                  <div className="flex items-center space-x-2 bg-secondary rounded-md p-1 mt-4">
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="h-9 w-full bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={mobileSearchTerm}
                      onChange={(e) => setMobileSearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSearch(mobileSearchTerm);
                        }
                      }}
                    />
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-foreground hover:text-primary h-8 w-8"
                        onClick={() => handleSearch(mobileSearchTerm)}
                        aria-label="Search products"
                    >
                      <Search className="h-5 w-5" />
                      <span className="sr-only">Search</span>
                    </Button>
                  </div>
                   <Button variant="ghost" asChild className="text-foreground hover:text-primary justify-start text-lg p-2 mt-2">
                     <Link href="#"> {/* Placeholder for user account/login */}
                      <User className="h-6 w-6 mr-3" />
                      Account
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
