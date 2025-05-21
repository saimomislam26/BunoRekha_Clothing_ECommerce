"use client";

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Filter, X } from 'lucide-react';

const uniqueCategories = ['Sarees', 'Kurtas', 'Tops', 'Accessories', 'Jewelry']; // Example data
const uniqueSizes = ['S', 'M', 'L', 'XL', 'Free Size', 'One Size']; // Example data
const uniqueColors = ['Gold', 'Charcoal', 'Natural Linen', 'Light Charcoal']; // Example data
const uniqueStyles = ['Ethnic Festive', 'Modern Ethnic', 'Elegant Evening', 'Casual Chic', 'Artisanal', 'Minimalist']; // Example data

const ProductFilters = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  // Placeholder for selected filters state
  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  // ... and so on

  const handleApplyFilters = () => {
    // Logic to apply filters would go here
    console.log("Applying filters with price range:", priceRange);
  };
  
  const handleClearFilters = () => {
    setPriceRange([0, 500]);
    // Clear other selected filters
    console.log("Filters cleared");
  };


  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
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
                <Checkbox id={`cat-${category}`} />
                <Label htmlFor={`cat-${category}`} className="font-normal text-sm text-foreground/80">{category}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium hover:text-accent">Price Range</AccordionTrigger>
          <AccordionContent className="pt-4">
            <Slider
              defaultValue={[priceRange[0], priceRange[1]]}
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
                <Checkbox id={`size-${size}`} />
                <Label htmlFor={`size-${size}`} className="font-normal text-sm text-foreground/80">{size}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="text-base font-medium hover:text-accent">Color</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {uniqueColors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox id={`color-${color}`} />
                <Label htmlFor={`color-${color}`} className="font-normal text-sm text-foreground/80">{color}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="style">
          <AccordionTrigger className="text-base font-medium hover:text-accent">Style</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {uniqueStyles.map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox id={`style-${style}`} />
                <Label htmlFor={`style-${style}`} className="font-normal text-sm text-foreground/80">{style}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Button onClick={handleApplyFilters} className="w-full mt-8 bg-primary hover:bg-accent text-primary-foreground">
        Apply Filters
      </Button>
    </div>
  );
};

export default ProductFilters;
