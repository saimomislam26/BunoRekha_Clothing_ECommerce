"use client";

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";


interface WishlistButtonProps {
  productId: string;
  initialIsWishlisted?: boolean;
  className?: string;
}

const WishlistButton = ({ productId, initialIsWishlisted = false, className }: WishlistButtonProps) => {
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    // In a real app, you'd fetch the wishlist state for this product
    // For now, we can use localStorage as a simple client-side persistence example
    const wishlistedItems = JSON.parse(localStorage.getItem('wishlist') || '{}');
    if (wishlistedItems[productId]) {
      setIsWishlisted(true);
    }
  }, [productId]);

  const toggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent link navigation if inside a ProductCard link
    e.stopPropagation();
    
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);

    // Update localStorage
    const wishlistedItems = JSON.parse(localStorage.getItem('wishlist') || '{}');
    if (newWishlistState) {
      wishlistedItems[productId] = true;
      toast({ title: "Added to Wishlist", description: "Item successfully added to your wishlist." });
    } else {
      delete wishlistedItems[productId];
      toast({ title: "Removed from Wishlist", description: "Item removed from your wishlist." });
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlistedItems));

    // In a real app, you'd make an API call here
  };

  if (!isClient) {
    // Render a placeholder or nothing until client-side hydration
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("rounded-full bg-card/50 hover:bg-card/80 backdrop-blur-sm text-foreground transition-colors duration-300", className)}
        aria-label="Add to wishlist"
        disabled
      >
        <Heart className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleWishlist}
      className={cn(
        "rounded-full bg-card/50 hover:bg-card/80 backdrop-blur-sm text-foreground transition-colors duration-300",
        isWishlisted ? 'text-destructive hover:text-destructive/80' : 'hover:text-destructive',
        className
      )}
      aria-pressed={isWishlisted}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
    </Button>
  );
};

export default WishlistButton;
