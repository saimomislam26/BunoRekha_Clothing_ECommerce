import ProductGrid from '@/components/product/ProductGrid';
import ProductFilters from '@/components/product/ProductFilters';
import { getAllProducts } from '@/lib/placeholder-data';
import { Separator } from '@/components/ui/separator';

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-card rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-primary">Our Collection</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Explore the exquisite range of BunoRekha apparel and accessories.
        </p>
      </section>

      <Separator />

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <ProductFilters />
        </aside>
        <main className="w-full md:w-3/4 lg:w-4/5">
          {/* Add sorting options here later if needed */}
          <ProductGrid products={products} />
        </main>
      </div>
    </div>
  );
}
