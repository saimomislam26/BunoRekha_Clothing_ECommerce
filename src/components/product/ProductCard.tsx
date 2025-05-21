import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import WishlistButton from './WishlistButton'; // Assume this component exists

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-primary/20 hover:shadow-2xl transform hover:-translate-y-1">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transform transition-transform duration-500 ease-in-out group-hover:scale-110"
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
          // onClick={() => console.log(`Add to cart: ${product.id}`)} // Placeholder action
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
