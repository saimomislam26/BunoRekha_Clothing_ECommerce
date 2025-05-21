"use client"; 

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProductBySlug, getProductById } from '@/lib/placeholder-data'; // Assuming slug is used as id for now
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, CheckCircle, ShieldCheck, Truck } from 'lucide-react';
import WishlistButton from '@/components/product/WishlistButton';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

// This is a client component because it uses hooks like useState, useEffect
// and potentially interacts with user actions (size/color selection, add to cart).

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // params.id is actually the slug from the placeholder data structure
    const fetchedProduct = getProductBySlug(params.id) || getProductById(params.id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      if (fetchedProduct.availableSizes.length > 0) {
        setSelectedSize(fetchedProduct.availableSizes[0]);
      }
      if (fetchedProduct.availableColors.length > 0) {
        setSelectedColor(fetchedProduct.availableColors[0]);
      }
    }
  }, [params.id]);

  if (!product) {
    return <div className="py-12 text-center">Loading product details or product not found...</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
        toast({ title: "Selection Incomplete", description: "Please select a size.", variant: "destructive" });
        return;
    }
    if (!selectedColor && product.availableColors.length > 0) {
        toast({ title: "Selection Incomplete", description: "Please select a color.", variant: "destructive" });
        return;
    }
    // Logic to add to cart
    console.log('Added to cart:', { product, selectedSize, selectedColor, quantity });
    toast({ title: "Added to Cart!", description: `${product.name} has been added to your cart.`});
  };

  const mainImage = product.images[currentImageIndex];

  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Image Gallery */}
        <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-xl bg-card">
                <Image
                src={mainImage}
                alt={`${product.name} - view ${currentImageIndex + 1}`}
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-300"
                data-ai-hint={product.dataAiHint || 'clothing detail'}
                key={mainImage} // Force re-render on image change for transition
                />
            </div>
            {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                    <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                        index === currentImageIndex ? 'border-primary scale-105' : 'border-transparent hover:border-primary/50'
                    }`}
                    >
                    <Image
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                    />
                    </button>
                ))}
                </div>
            )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">{product.name}</h1>
          
          <div className="flex items-center space-x-4">
            <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</p>
            )}
          </div>

          {product.rating && (
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating!) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">({product.reviewsCount} reviews)</span>
            </div>
          )}

          <p className="text-foreground/80 leading-relaxed">{product.description}</p>
          
          {product.availableColors.length > 0 && (
            <div className="space-y-2">
              <Label className="text-base font-medium">Color: <span className="text-primary">{selectedColor?.name}</span></Label>
              <RadioGroup value={selectedColor?.name} onValueChange={(value) => setSelectedColor(product.availableColors.find(c => c.name === value) || null)}>
                <div className="flex flex-wrap gap-2">
                  {product.availableColors.map((color) => (
                    <RadioGroupItem key={color.name} value={color.name} id={`color-${color.name}`} className="sr-only" aria-label={color.name} />
                    <Label
                      htmlFor={`color-${color.name}`}
                      style={{ backgroundColor: color.hex }}
                      className={`h-8 w-8 rounded-full border-2 cursor-pointer transition-all ${selectedColor?.name === color.name ? 'ring-2 ring-offset-2 ring-primary border-background' : 'border-card hover:border-primary/50'}`}
                      title={color.name}
                    />
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {product.availableSizes.length > 0 && (
             <div className="space-y-2">
                <Label className="text-base font-medium">Size: <span className="text-primary">{selectedSize}</span></Label>
                <RadioGroup value={selectedSize || undefined} onValueChange={setSelectedSize}>
                    <div className="flex flex-wrap gap-2">
                    {product.availableSizes.map((size) => (
                        <RadioGroupItem key={size} value={size} id={`size-${size}`} className="sr-only" aria-label={size}/>
                        <Label
                        htmlFor={`size-${size}`}
                        className={cn(
                            "px-4 py-2 border rounded-md cursor-pointer transition-colors text-sm",
                            selectedSize === size
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card hover:border-primary/50"
                        )}
                        >
                        {size}
                        </Label>
                    ))}
                    </div>
                </RadioGroup>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 rounded-r-none border-r"><span className="text-xl">-</span></Button>
              <span className="w-12 text-center text-lg font-medium">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 rounded-l-none border-l"><span className="text-xl">+</span></Button>
            </div>
            <Button size="lg" onClick={handleAddToCart} className="flex-grow bg-primary hover:bg-accent text-primary-foreground text-base py-3">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <WishlistButton productId={product.id} className="h-12 w-12 border border-border rounded-md" />
          </div>
          
          {product.stock < 10 && product.stock > 0 && (
            <p className="text-destructive text-sm">Only {product.stock} left in stock!</p>
          )}
          {product.stock === 0 && (
            <p className="text-destructive text-sm">Out of stock.</p>
          )}

          <Separator className="my-6" />

          <div className="space-y-3 text-sm">
            <div className="flex items-center text-foreground/80">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Authentic BunoRekha Design</span>
            </div>
            <div className="flex items-center text-foreground/80">
                <ShieldCheck className="h-5 w-5 text-blue-500 mr-2" />
                <span>Secure Checkout & Payment</span>
            </div>
            <div className="flex items-center text-foreground/80">
                <Truck className="h-5 w-5 text-orange-500 mr-2" />
                <span>Fast & Reliable Shipping</span>
            </div>
          </div>

          {product.longDescription && (
            <>
            <Separator className="my-6" />
            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Product Details</h3>
                <p className="text-foreground/80 whitespace-pre-line">{product.longDescription}</p>
            </div>
            </>
          )}
          
          <Separator className="my-6" />
           <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Related Products</h3>
              {/* Placeholder for related products */}
              <p className="text-muted-foreground">More styles you might love will appear here.</p>
              <Link href="/products">
                <Button variant="link" className="text-primary p-0 mt-2">Browse more products &rarr;</Button>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
