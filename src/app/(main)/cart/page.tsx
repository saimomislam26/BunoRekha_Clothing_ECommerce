
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { CartItem, Product, CartDocument, CartItemType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { getOrCreateCartId } from '@/lib/cart-utils';
import { placeholderProducts } from '@/lib/placeholder-data'; // To get full product details


// Function to merge cart items from DB (which only have product IDs) with full product details
const enrichCartItems = (dbItems: CartItemType[]): CartItem[] => {
  return dbItems.map(dbItem => {
    const productDetail = placeholderProducts.find(p => p.id === dbItem.productId);
    if (!productDetail) {
      // This case should ideally not happen if product IDs are always valid
      console.error(`Product with ID ${dbItem.productId} not found for cart item.`);
      // Fallback or skip item
      return null; 
    }
    return {
      ...dbItem,
      product: productDetail,
      id: dbItem.cartItemId, // Use cartItemId as the unique ID on the client for list keys etc.
    };
  }).filter(item => item !== null) as CartItem[]; // Filter out any nulls if product wasn't found
};


export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      const cartId = getOrCreateCartId();
      if (!cartId) {
        toast({ title: "Error", description: "Could not identify cart.", variant: "destructive" });
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/cart', {
          method: 'GET',
          headers: { 'X-Cart-Id': cartId },
        });

        if (!response.ok) {
          let errorResponseMessage = 'Failed to fetch cart'; // Default message
          try {
            const errorData = await response.json();
            if (errorData && errorData.message) {
              errorResponseMessage = errorData.message;
            } else if (errorData && errorData.error) {
              errorResponseMessage = errorData.error;
            } else {
              errorResponseMessage = `Server error: ${response.status} ${response.statusText}`;
            }
            console.error('API error response when fetching cart:', errorData);
          } catch (jsonError) {
            try {
              const errorText = await response.text();
              errorResponseMessage = errorText.substring(0, 200) || `Server error: ${response.status} ${response.statusText}`;
              console.error('API error text response when fetching cart:', errorText);
            } catch (textError) {
               errorResponseMessage = `Server error: ${response.status} ${response.statusText}. Unable to read error body.`;
               console.error('Failed to read error response body when fetching cart');
            }
          }
          throw new Error(errorResponseMessage);
        }
        
        const data: CartDocument = await response.json();
        if (data && data.items) {
            setCartItems(enrichCartItems(data.items));
        } else {
            setCartItems([]);
        }
      } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Could not load your cart.";
        console.error("Error fetching cart:", error);
        toast({ title: "Error Loading Cart", description: errorMessage, variant: "destructive" });
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [toast]);

  const updateQuantity = async (cartItemId: string, newQuantity: number) => {
    const cartId = getOrCreateCartId();
    if (!cartId) {
        toast({ title: "Error", description: "Could not identify cart.", variant: "destructive" });
        return;
    }
    if (newQuantity < 0) return;

    try {
        const response = await fetch('/api/cart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Cart-Id': cartId,
            },
            body: JSON.stringify({ cartItemId, newQuantity }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update quantity');
        }
        const updatedCartData: CartDocument = await response.json();
        if (updatedCartData && updatedCartData.items) {
            setCartItems(enrichCartItems(updatedCartData.items));
        } else {
             setCartItems([]);
        }
        if (newQuantity === 0) {
            toast({ title: "Item Removed", description: "Item quantity set to 0 and removed." });
        } else {
            toast({ title: "Quantity Updated", description: "Item quantity updated in your cart." });
        }
    } catch (error) {
        console.error("Error updating quantity:", error);
        toast({ title: "Error", description: (error as Error).message || "Could not update quantity.", variant: "destructive"});
    }
  };

  const removeItem = async (cartItemId: string) => {
    const cartId = getOrCreateCartId();
     if (!cartId) {
        toast({ title: "Error", description: "Could not identify cart.", variant: "destructive" });
        return;
    }
    try {
        const response = await fetch('/api/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Cart-Id': cartId,
            },
            body: JSON.stringify({ cartItemId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to remove item');
        }
        const updatedCartData: CartDocument = await response.json();
         if (updatedCartData && updatedCartData.items) {
            setCartItems(enrichCartItems(updatedCartData.items));
        } else {
             setCartItems([]);
        }
        toast({ title: "Item Removed", description: "Item removed from your cart." });

    } catch (error) {
        console.error("Error removing item:", error);
        toast({ title: "Error", description: (error as Error).message || "Could not remove item.", variant: "destructive"});
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = subtotal > 50 || subtotal === 0 ? 0 : 10; // Example: Free shipping over $50
  const total = subtotal + shippingCost;

  if (isLoading) {
    return <div className="py-12 text-center">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground opacity-50 mb-6" />
        <h1 className="text-3xl font-bold text-primary mb-4">Your Cart is Empty</h1>
        <p className="text-lg text-muted-foreground mb-8">Add some beautiful BunoRekha pieces to your cart.</p>
        <Link href="/products">
          <Button size="lg" className="bg-primary hover:bg-accent text-primary-foreground">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-card rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-primary">Shopping Cart</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Review your items and proceed to checkout.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-card rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative transition-all hover:shadow-primary/10">
              <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="absolute top-2 right-2 text-muted-foreground hover:text-destructive" aria-label="Remove item">
                <X className="h-5 w-5" />
              </Button>
              <Link href={`/products/${item.product.slug}`} className="block shrink-0">
                <div className="relative w-24 h-32 sm:w-32 sm:h-40 rounded-md overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    data-ai-hint={item.product.dataAiHint || 'clothing item'}
                  />
                </div>
              </Link>
              <div className="flex-grow space-y-1 text-center sm:text-left">
                <Link href={`/products/${item.product.slug}`}>
                  <h2 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">{item.product.name}</h2>
                </Link>
                <p className="text-sm text-muted-foreground">Size: {item.selectedSize}</p>
                <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start">
                  Color: {item.selectedColor.name} 
                  <span style={{ backgroundColor: item.selectedColor.hex }} className="inline-block w-3 h-3 rounded-full ml-2 border border-border"></span>
                </p>
                <p className="text-lg font-bold text-primary">${item.product.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center border rounded-md self-center sm:self-auto mt-2 sm:mt-0">
                <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-10 w-10 rounded-r-none border-r"><Minus className="h-4 w-4" /></Button>
                <span className="w-10 text-center text-md font-medium">{item.quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-10 w-10 rounded-l-none border-l"><Plus className="h-4 w-4" /></Button>
              </div>
              <p className="text-lg font-semibold text-foreground w-full sm:w-auto text-right sm:text-left mt-2 sm:mt-0">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 bg-card p-6 rounded-lg shadow-md space-y-6 sticky top-24">
          <h2 className="text-2xl font-semibold text-primary">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-foreground/80">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/80">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="flex items-center gap-2">
                <Input type="text" placeholder="Discount code" className="h-10 bg-background/50"/>
                <Button variant="outline" className="h-10 border-primary text-primary hover:bg-primary/10">Apply</Button>
            </div>
            <Separator className="my-3 bg-border/50" />
            <div className="flex justify-between text-xl font-bold text-foreground">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Button 
            size="lg" 
            className="w-full bg-primary hover:bg-accent text-primary-foreground text-lg py-3"
            onClick={() => toast({ title: "Coming Soon!", description: "Checkout functionality is under development."})}
            >
            Proceed to Checkout
          </Button>
          <p className="text-xs text-muted-foreground text-center">Secure payments by Stripe & PayPal (Placeholder).</p>
        </div>
      </div>
    </div>
  );
}
