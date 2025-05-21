
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Save, UploadCloud } from "lucide-react";
import { placeholderProducts } from "@/lib/placeholder-data"; // For categories, sizes example

// Example data for select dropdowns (in a real app, this might come from a DB or config)
const exampleCategories = Array.from(new Set(placeholderProducts.map(p => p.category)));
const exampleSizes = Array.from(new Set(placeholderProducts.flatMap(p => p.availableSizes)));

const productFormSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  longDescription: z.string().optional(),
  price: z.coerce.number().positive("Price must be a positive number."),
  originalPrice: z.coerce.number().optional(),
  category: z.string().min(1, "Category is required."),
  availableSizes: z.string().min(1, "Enter at least one size (comma-separated)."), // Simplified to string for now
  // For a more robust solution, availableColors would be an array of objects
  availableColors: z.string().min(1, "Enter at least one color (e.g., Name:Hex, Name:Hex)."), // Simplified
  stock: z.coerce.number().int().min(0, "Stock can't be negative."),
  isFeatured: z.boolean().default(false),
  slug: z.string().min(3, "Slug must be at least 3 characters.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format."),
  // imageFiles: typeof window === 'undefined' ? z.any() : z.instanceof(FileList).optional(), // Placeholder for image uploads
  dataAiHint: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export default function AddProductForm() {
  const { toast } = useToast();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      longDescription: "",
      price: 0,
      category: exampleCategories[0] || "",
      availableSizes: "M, L, XL", // Example
      availableColors: "Charcoal:#333333, Gold:#D4AF37", // Example
      stock: 10,
      isFeatured: false,
      slug: "",
      dataAiHint: "",
    },
  });

  function onSubmit(data: ProductFormValues) {
    console.log("Product data submitted:", data);
    // In a real application, you would send this data to your backend API
    // and handle image uploads separately.

    // Parse sizes and colors from string input
    const parsedSizes = data.availableSizes.split(',').map(s => s.trim()).filter(s => s);
    const parsedColors = data.availableColors.split(',').map(c => {
        const parts = c.split(':');
        return { name: parts[0]?.trim(), hex: parts[1]?.trim() };
    }).filter(c => c.name && c.hex);
    
    const submissionData = {
        ...data,
        availableSizes: parsedSizes,
        availableColors: parsedColors,
    };
    console.log("Parsed submission data:", submissionData);

    toast({
      title: "Product Submitted (Mock)",
      description: `Product "${data.name}" data logged to console. Image upload not implemented.`,
    });
    // form.reset(); // Optionally reset form
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Silk Saree" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Slug</FormLabel>
              <FormControl>
                <Input placeholder="e.g., silk-saree" {...field} />
              </FormControl>
              <FormDescription>URL-friendly identifier (e.g., my-awesome-product).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Briefly describe the product." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="longDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Long Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Detailed product information." rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                    <Input type="number" step="0.01" placeholder="e.g., 99.99" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="originalPrice"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Original Price (Optional, for sales)</FormLabel>
                <FormControl>
                    <Input type="number" step="0.01" placeholder="e.g., 129.99" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                {/* In a real app, use a Select component with options from DB */}
                <Input placeholder="e.g., Sarees, Kurtas" {...field} />
              </FormControl>
              <FormDescription>Available categories: {exampleCategories.join(", ")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="availableSizes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Sizes</FormLabel>
              <FormControl>
                <Input placeholder="e.g., S, M, L, XL (comma-separated)" {...field} />
              </FormControl>
              <FormDescription>Enter sizes separated by commas. Example: {exampleSizes.slice(0,3).join(", ")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="availableColors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Colors</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Red:#FF0000, Blue:#0000FF" {...field} />
              </FormControl>
              <FormDescription>Format: ColorName:HexCode, separated by commas.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock Quantity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
            <FormLabel>Product Images (Placeholder)</FormLabel>
            <FormControl>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-1 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <Input id="dropzone-file" type="file" className="hidden" multiple disabled/> 
                        {/* 'disabled' as actual upload is not implemented */}
                    </label>
                </div> 
            </FormControl>
            <FormDescription>Image upload functionality is a placeholder.</FormDescription>
        </FormItem>

        <FormField
          control={form.control}
          name="dataAiHint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data AI Hint (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., silk dress" {...field} />
              </FormControl>
              <FormDescription>Keywords for AI placeholder image generation (max 2 words).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Feature this product?
                </FormLabel>
                <FormDescription>
                  Featured products may appear on the homepage or special sections.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving..." : <><Save className="mr-2 h-5 w-5" /> Save Product (Mock)</>}
        </Button>
      </form>
    </Form>
  );
}
