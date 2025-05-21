
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product, CartItemType } from '@/types'; // Updated CartItemType
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import WishlistButton from './WishlistButton';
import { useToast } from "@/hooks/use-toast";
import { getOrCreateCartId, generateCartItemId } from '@/lib/cart-utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();

  const handleAddToCart = async () => {
    const selectedSize = product.availableSizes.length > 0 ? product.availableSizes[0] : 'One Size';
    const selectedColor = product.availableColors.length > 0 
      ? product.availableColors[0] 
      : { name: 'Default', hex: '#000000' }; // Ensure selectedColor is an object

    const cartId = getOrCreateCartId();
    if (!cartId) {
        toast({ title: "Error", description: "Could not identify cart.", variant: "destructive" });
        return;
    }
    
    const itemToAdd = {
        productId: product.id,
        quantity: 1,
        selectedSize,
        selectedColor,
    };

    try {
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Cart-Id': cartId,
            },
            body: JSON.stringify(itemToAdd),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add item to cart');
        }

        // const updatedCart = await response.json(); // You can use updatedCart if needed
        toast({
            title: "Added to Cart!",
            description: `${product.name} has been added to your cart.`,
        });

    } catch (error) {
        console.error("Failed to add to cart:", error);
        toast({
            title: "Error",
            description: (error as Error).message || "Could not add item to cart.",
            variant: "destructive",
        });
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-primary/20 hover:shadow-2xl transform hover:-translate-y-1">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
            data-ai-hint={product.dataAiHint || 'clothing item'}
          />
          {product.originalPrice && (
            <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-2 py-1 text-xs font-semibold rounded">
              SALE
            </div>
          )}
           <div className="absolute top-3 right-3">
            <WishlistButton productId={product.id} />
          </div>
        </div>
      </Link>
      <div className="p-4 md:p-5">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="text-lg font-semibold text-foreground truncate group-hover:text-primary transition-colors" title={product.name}>
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1 truncate">{product.category}</p>
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
          {product.rating && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <Button 
          variant="default" 
          className="w-full mt-4 bg-primary hover:bg-accent text-primary-foreground transition-colors duration-300"
          aria-label={`Add ${product.name} to cart`}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
