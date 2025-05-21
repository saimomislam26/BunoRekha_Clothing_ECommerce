import ProductGrid from '@/components/product/ProductGrid';
import { getFeaturedProducts } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Featured Collection
        </h2>
        <p className="text-md md:text-lg text-muted-foreground max-w-xl mx-auto">
          Discover our handpicked selection of signature BunoRekha pieces.
        </p>
      </div>
      
      <ProductGrid products={featuredProducts.slice(0,4)} /> {/* Show limited items, e.g., 4 */}

      {featuredProducts.length > 4 && (
        <div className="text-center mt-12">
          <Link href="/products" passHref>
            <Button variant="outline" size="lg" className="text-primary border-primary hover:bg-primary/10 group">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
