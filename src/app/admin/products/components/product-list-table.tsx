
"use client";

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { placeholderProducts } from "@/lib/placeholder-data";
import type { Product } from "@/types";
import Image from "next/image";
import { Edit, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 5;

export default function ProductListTable() {
  const products: Product[] = placeholderProducts; // Using placeholder data
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAction = (action: string, productName: string) => {
    toast({
      title: `Action: ${action}`,
      description: `${action} action for "${productName}" is a placeholder.`,
    });
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden sm:table-cell">Stock</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative h-12 w-12 rounded-md overflow-hidden border">
                    <Image
                      src={product.images[0] || 'https://placehold.co/100x100.png'}
                      alt={product.name}
                      fill
                      className="object-cover"
                      data-ai-hint={product.dataAiHint || "product image"}
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="hidden md:table-cell">${product.price.toFixed(2)}</TableCell>
                <TableCell className="hidden sm:table-cell">{product.stock}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={product.stock > 0 ? "default" : "destructive"} className={product.stock > 0 ? "bg-green-500 hover:bg-green-600" : ""}>
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </Badge>
                  {product.isFeatured && <Badge variant="secondary" className="ml-2">Featured</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1 sm:gap-2 justify-end">
                    <Button variant="ghost" size="icon" onClick={() => handleAction("View", product.name)} title="View Product">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleAction("Edit", product.name)} title="Edit Product">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80" onClick={() => handleAction("Delete", product.name)} title="Delete Product">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </>
  );
}
