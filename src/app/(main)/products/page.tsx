
"use client";

import { useState, useEffect, useMemo } from 'react';
import ProductGrid from '@/components/product/ProductGrid';
import ProductFilters, { type FilterCriteria } from '@/components/product/ProductFilters';
import { getAllProducts } from '@/lib/placeholder-data';
import { Separator } from '@/components/ui/separator';
import type { Product } from '@/types';

const defaultFilters: FilterCriteria = {
  categories: [],
  sizes: [],
  colors: [],
  styles: [],
  priceRange: [0, 1000], // Default max price
};

export default function ProductsPage() {
  const allProducts = useMemo(() => getAllProducts(), []);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(allProducts);
  const [activeFilters, setActiveFilters] = useState<FilterCriteria>(defaultFilters);

  const handleApplyFilters = (filters: FilterCriteria) => {
    setActiveFilters(filters);
    let filtered = [...allProducts];

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category));
    }

    // Size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product => product.availableSizes.some(s => filters.sizes.includes(s)));
    }
    
    // Color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product => product.availableColors.some(c => filters.colors.includes(c.name)));
    }

    // Style filter
    if (filters.styles.length > 0) {
      filtered = filtered.filter(product => product.style && filters.styles.includes(product.style));
    }

    // Price range filter
    filtered = filtered.filter(product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);
    
    setDisplayedProducts(filtered);
  };

  // Apply initial filters on mount if any were set (e.g., from URL params in future)
  // For now, it just ensures initial display based on defaultFilters (which means all products)
  useEffect(() => {
    handleApplyFilters(activeFilters);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts]); // Only re-run if allProducts changes, which it shouldn't after initial load in this setup

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
          <ProductFilters onApplyFilters={handleApplyFilters} initialFilters={activeFilters} />
        </aside>
        <main className="w-full md:w-3/4 lg:w-4/5">
          {/* Add sorting options here later if needed */}
          <ProductGrid products={displayedProducts} />
        </main>
      </div>
    </div>
  );
}
