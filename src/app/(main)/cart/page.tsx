
"use client";

import { useState, useEffect } from 'react';
import type { StoredCartItem, CartItem, Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { placeholderProducts } from '@/lib/placeholder-data'; // To get full product details

const CART_STORAGE_KEY = 'bunorekhaCart';

// Function to merge cart items from localStorage with full product details
const enrichCartItems = (storedItems: StoredCartItem[]): CartItem[] => {
  return storedItems.map(storedItem => {
    const productDetail = placeholderProducts.find(p => p.id === storedItem.productId);
    if (!productDetail) {
      console.error(`Product with ID ${storedItem.productId} not found for cart item.`);
      return null; 
    }
    return {
      ...storedItem,
      product: productDetail,
      id: storedItem.cartItemId, // Use cartItemId as the unique ID for list keys
    };
  }).filter(item => item !== null) as CartItem[];
};


export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  

  useEffect(() => {
    setIsLoading(true);
    try {
      const storedCartJson = localStorage.getItem(CART_STORAGE_KEY);
      const storedCartItems: StoredCartItem[] = storedCartJson ? JSON.parse(storedCartJson) : [];
      setCartItems(enrichCartItems(storedCartItems));
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      toast({ title: "Error Loading Cart", description: "Could not load your cart.", variant: "destructive" });
      setCartItems([]); // Ensure cart is empty on error
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const updateCartInStorageAndState = (updatedStoredItems: StoredCartItem[]) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedStoredItems));
    setCartItems(enrichCartItems(updatedStoredItems));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 0) return; // Prevent negative quantity

    const storedCartItems: StoredCartItem[] = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    let updatedItems: StoredCartItem[];

    if (newQuantity === 0) {
      updatedItems = storedCartItems.filter(item => item.cartItemId !== cartItemId);
      toast({ title: "Item Removed", description: "Item removed from your cart." });
    } else {
      updatedItems = storedCartItems.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      );
      toast({ title: "Quantity Updated", description: "Item quantity updated in your cart." });
    }
    updateCartInStorageAndState(updatedItems);
  };

  const removeItem = (cartItemId: string) => {
    const storedCartItems: StoredCartItem[] = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    const updatedItems = storedCartItems.filter(item => item.cartItemId !== cartItemId);
    updateCartInStorageAndState(updatedItems);
    toast({ title: "Item Removed", description: "Item removed from your cart." });
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
