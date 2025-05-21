
"use client";

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Not used currently
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Filter, X } from 'lucide-react';

const uniqueCategories = ['Sarees', 'Kurtas', 'Tops', 'Accessories', 'Jewelry'];
const uniqueSizes = ['S', 'M', 'L', 'XL', 'Free Size', 'One Size'];
const uniqueColors = ['Gold', 'Charcoal', 'Natural Linen', 'Light Charcoal', 'Deep Charcoal', 'Charcoal & Gold', 'Charcoal Gold']; // Added from product data
const uniqueStyles = ['Ethnic Festive', 'Modern Ethnic', 'Elegant Evening', 'Casual Chic', 'Artisanal', 'Minimalist'];

export interface FilterCriteria {
  categories: string[];
  sizes: string[];
  colors: string[];
  styles: string[];
  priceRange: [number, number];
  searchQuery?: string; // Added for search functionality
}

interface ProductFiltersProps {
  onApplyFilters: (filters: FilterCriteria) => void;
  initialFilters?: Partial<FilterCriteria>;
}

const ProductFilters = ({ onApplyFilters, initialFilters }: ProductFiltersProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters?.categories || []);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(initialFilters?.sizes || []);
  const [selectedColors, setSelectedColors] = useState<string[]>(initialFilters?.colors || []);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(initialFilters?.styles || []);
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters?.priceRange || [0, 500]);

  const handleCheckboxChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    currentValues: string[],
    value: string,
    checked: boolean | 'indeterminate'
  ) => {
    if (checked === true) {
      setter([...currentValues, value]);
    } else {
      setter(currentValues.filter((v) => v !== value));
    }
  };

  const handleApplyFiltersInternal = () => {
    // This function is called when the "Apply Filters" button is clicked.
    // It passes the UI-selected filters, not the search query from URL.
    // The parent component (ProductsPage) will merge this with the URL search query.
    onApplyFilters({
      categories: selectedCategories,
      sizes: selectedSizes,
      colors: selectedColors,
      styles: selectedStyles,
      priceRange,
      // searchQuery is handled by ProductsPage based on URL
    });
  };
  
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedStyles([]);
    setPriceRange([0, 500]); 
    onApplyFilters({
      categories: [],
      sizes: [],
      colors: [],
      styles: [],
      priceRange: [0, 1000],
      searchQuery: initialFilters?.searchQuery || '', // Preserve current search query if needed, or clear it
    });
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-primary flex items-center">
          <Filter className="mr-2 h-5 w-5" />
          Filters
        </h3>
        <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-muted-foreground hover:text-destructive">
          <X className="mr-1 h-4 w-4" /> Clear All
        </Button>
      </div>
      
      <Accordion type="multiple" defaultValue={['category', 'price']} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="text-base font-medium hover:text-accent">Category</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {uniqueCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox 
                  id={`cat-${category}`} 
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => handleCheckboxChange(setSelectedCategories, selectedCategories, category, checked)}
                />
                <Label htmlFor={`cat-${category}`} className="font-normal text-sm text-foreground/80 cursor-pointer">{category}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium hover:text-accent">Price Range</AccordionTrigger>
          <AccordionContent className="pt-4">
            <Slider
              value={priceRange} 
              max={1000} 
              step={10}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger className="text-base font-medium hover:text-accent">Size</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
             {uniqueSizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox 
                  id={`size-${size}`} 
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={(checked) => handleCheckboxChange(setSelectedSizes, selectedSizes, size, checked)}
                />
                <Label htmlFor={`size-${size}`} className="font-normal text-sm text-foreground/80 cursor-pointer">{size}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="text-base font-medium hover:text-accent">Color</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {uniqueColors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox 
                  id={`color-${color}`} 
                  checked={selectedColors.includes(color)}
                  onCheckedChange={(checked) => handleCheckboxChange(setSelectedColors, selectedColors, color, checked)}
                />
                <Label htmlFor={`color-${color}`} className="font-normal text-sm text-foreground/80 cursor-pointer">{color}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="style">
          <AccordionTrigger className="text-base font-medium hover:text-accent">Style</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {uniqueStyles.map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox 
                  id={`style-${style}`} 
                  checked={selectedStyles.includes(style)}
                  onCheckedChange={(checked) => handleCheckboxChange(setSelectedStyles, selectedStyles, style, checked)}
                />
                <Label htmlFor={`style-${style}`} className="font-normal text-sm text-foreground/80 cursor-pointer">{style}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Button onClick={handleApplyFiltersInternal} className="w-full mt-8 bg-primary hover:bg-accent text-primary-foreground">
        Apply Filters
      </Button>
    </div>
  );
};

export default ProductFilters;
