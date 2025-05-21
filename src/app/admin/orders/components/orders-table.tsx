
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
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const placeholderOrders = [
  { id: "ORD101", customer: "Alice Wonderland", email: "alice@example.com", date: "2023-11-01", total: "$120.50", status: "Shipped", items: 2, shippingAddress: "123 Main St, Anytown, USA", paymentMethod: "Credit Card" },
  { id: "ORD102", customer: "Bob The Builder", email: "bob@example.com", date: "2023-11-03", total: "$75.00", status: "Processing", items: 1, shippingAddress: "456 Oak Ave, Anytown, USA", paymentMethod: "PayPal" },
  { id: "ORD103", customer: "Charlie Brown", email: "charlie@example.com", date: "2023-11-05", total: "$210.25", status: "Delivered", items: 3, shippingAddress: "789 Pine Rd, Anytown, USA", paymentMethod: "Credit Card" },
  { id: "ORD104", customer: "Diana Prince", email: "diana@example.com", date: "2023-11-06", total: "$99.99", status: "Pending", items: 1, shippingAddress: "321 Elm St, Anytown, USA", paymentMethod: "Stripe" },
  { id: "ORD105", customer: "Edward Scissorhands", email: "edward@example.com", date: "2023-11-08", total: "$35.50", status: "Cancelled", items: 1, shippingAddress: "654 Maple Dr, Anytown, USA", paymentMethod: "Credit Card" },
  { id: "ORD106", customer: "Fiona Gallagher", email: "fiona@example.com", date: "2023-11-10", total: "$180.00", status: "Shipped", items: 4, shippingAddress: "987 Birch Ln, Anytown, USA", paymentMethod: "PayPal" },
  { id: "ORD107", customer: "George Jetson", email: "george@example.com", date: "2023-11-12", total: "$55.75", status: "Processing", items: 1, shippingAddress: "159 Asteroid Ave, Orbit City", paymentMethod: "Credit Card" },
  { id: "ORD108", customer: "Harry Potter", email: "harry@example.com", date: "2023-11-14", total: "$300.00", status: "Delivered", items: 2, shippingAddress: "4 Privet Drive, Little Whinging", paymentMethod: "Gringotts Transfer" },
  { id: "ORD109", customer: "Iris West", email: "iris@example.com", date: "2023-11-15", total: "$88.20", status: "Shipped", items: 1, shippingAddress: "Central City, CC, USA", paymentMethod: "Stripe" },
  { id: "ORD110", customer: "John Doe", email: "john@example.com", date: "2023-11-18", total: "$165.00", status: "Pending", items: 3, shippingAddress: "Unknown Location", paymentMethod: "Credit Card" },
];

const ITEMS_PER_PAGE = 5;

export default function OrdersTable() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(placeholderOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = placeholderOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleViewOrder = (orderId: string) => {
    toast({
      title: "View Order",
      description: `Viewing details for order ${orderId}. (Functionality not implemented)`,
    });
    // In a real app, navigate to order detail page or show a modal
  };
  
  const getStatusVariant = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (status.toLowerCase()) {
      case "shipped": return "default"; // Primary like color
      case "processing": return "secondary";
      case "delivered": return "outline"; // Using outline to denote success
      case "pending": return "destructive"; // Highlighting pending with a variant
      case "cancelled": return "destructive" // Or a more muted destructive
      default: return "outline";
    }
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden sm:table-cell text-right">Total</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>{order.customer}</div>
                  <div className="text-xs text-muted-foreground hidden lg:block">{order.email}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                <TableCell className="hidden sm:table-cell text-right">{order.total}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={getStatusVariant(order.status)} className="capitalize">
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order.id)} title="View Order Details">
                    <Eye className="h-4 w-4" />
                  </Button>
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
