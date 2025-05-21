"use client";

import { useState, useEffect } from 'react';
import type { Product } from '@/types';
import { placeholderProducts } from '@/lib/placeholder-data'; // For fetching full product details
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface WishlistedItemDetails extends Product {
  // any additional properties if needed
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistedItemDetails[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
    const productIds = Object.keys(storedWishlist);
    
    const detailedItems = productIds
      .map(id => placeholderProducts.find(p => p.id === id))
      .filter(p => p !== undefined) as WishlistedItemDetails[];
      
    setWishlistItems(detailedItems);
  }, []);

  const removeFromWishlist = (productId: string) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);

    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
    delete storedWishlist[productId];
    localStorage.setItem('wishlist', JSON.stringify(storedWishlist));
    toast({ title: "Removed from Wishlist", description: "Item removed from your wishlist." });
  };

  if (!isClient) {
    return <div className="py-12 text-center">Loading wishlist...</div>;
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-20">
        <Heart className="mx-auto h-24 w-24 text-muted-foreground opacity-50 mb-6" />
        <h1 className="text-3xl font-bold text-primary mb-4">Your Wishlist is Empty</h1>
        <p className="text-lg text-muted-foreground mb-8">Looks like you haven't added anything to your wishlist yet.</p>
        <Link href="/products">
          <Button size="lg" className="bg-primary hover:bg-accent text-primary-foreground">
            Discover Products
          </Button>
        </Link>
      </div>
    );
  }
  
  // Use a placeholder svg for Heart icon if it's not available directly
  function Heart({className}: {className?: string}) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    );
  }


  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-card rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-primary">My Wishlist</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Your curated collection of BunoRekha favorites.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-card rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-center gap-4 transition-all hover:shadow-primary/10">
            <Link href={`/products/${item.slug}`} className="block shrink-0">
              <div className="relative w-24 h-32 sm:w-32 sm:h-40 rounded-md overflow-hidden">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={item.dataAiHint || 'clothing item'}
                />
              </div>
            </Link>
            <div className="flex-grow text-center sm:text-left">
              <Link href={`/products/${item.slug}`}>
                <h2 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">{item.name}</h2>
              </Link>
              <p className="text-sm text-muted-foreground">{item.category}</p>
              <p className="text-lg font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 sm:mt-0">
              <Button variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button variant="ghost" size="icon" onClick={() => removeFromWishlist(item.id)} className="text-destructive hover:bg-destructive/10" aria-label="Remove from wishlist">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
