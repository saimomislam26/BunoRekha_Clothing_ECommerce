
"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation'; // Added
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
  priceRange: [0, 1000],
  searchQuery: '', // Added
};

export default function ProductsPage() {
  const allProducts = useMemo(() => getAllProducts(), []);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]); // Initialize empty, let useEffect populate
  const [activeFilters, setActiveFilters] = useState<FilterCriteria>(defaultFilters);
  const searchParams = useSearchParams();

  // This useEffect handles initial load and updates from URL search parameter changes
  useEffect(() => {
    const searchQueryFromUrl = searchParams.get('search') || '';
    // Combine current UI filters (if any) with the search query from URL
    const filtersToApply = {
      ...activeFilters, // Contains categories, price, etc. from user's UI interaction
      searchQuery: searchQueryFromUrl,
    };
    // setActiveFilters(filtersToApply); // Update activeFilters to include the latest search query
    applyFilteringLogic(filtersToApply); // Apply the combined filters

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, allProducts]); // Rerun when searchParams or allProducts change
                                  // activeFilters is not here to avoid potential loops if applyFilteringLogic sets it.

  const applyFilteringLogic = (filters: FilterCriteria) => {
    setActiveFilters(filters); // Keep activeFilters state in sync
    let filtered = [...allProducts];
    const query = filters.searchQuery?.toLowerCase().trim();

    // Search query filter (if query exists)
    if (query) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.style && product.style.toLowerCase().includes(query)) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

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

  // This function is called by ProductFilters component when user applies UI filters
  const handleUiFiltersChange = (uiFiltersFromComponent: FilterCriteria) => {
    const currentSearchQuery = searchParams.get('search') || ''; // Get current search from URL
    const combinedFilters = {
        ...uiFiltersFromComponent, // Filters from the UI (categories, price etc.)
        searchQuery: currentSearchQuery, // Ensure search query is part of it
    };
    applyFilteringLogic(combinedFilters);
  };


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
          {/* Pass the current activeFilters (which includes URL search query) to ProductFilters
              so it can initialize its own state if needed, or for the "Clear All" button. */}
          <ProductFilters onApplyFilters={handleUiFiltersChange} initialFilters={activeFilters} />
        </aside>
        <main className="w-full md:w-3/4 lg:w-4/5">
          <ProductGrid products={displayedProducts} />
        </main>
      </div>
    </div>
  );
}
