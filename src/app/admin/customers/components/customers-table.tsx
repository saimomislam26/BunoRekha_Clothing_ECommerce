
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
import { Button } from "@/components/ui/button";
import { Eye, ChevronLeft, ChevronRight, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const placeholderCustomers = [
  { id: "CUST001", name: "Liam Johnson", email: "liam@example.com", joinDate: "2023-01-15", totalOrders: 5, totalSpent: "$580.00", avatar: "https://placehold.co/40x40/FFA500/FFFFFF.png?text=LJ" },
  { id: "CUST002", name: "Olivia Smith", email: "olivia@example.com", joinDate: "2023-02-20", totalOrders: 3, totalSpent: "$250.75", avatar: "https://placehold.co/40x40/FFC0CB/000000.png?text=OS" },
  { id: "CUST003", name: "Noah Williams", email: "noah@example.com", joinDate: "2023-03-10", totalOrders: 8, totalSpent: "$1200.00", avatar: "https://placehold.co/40x40/ADD8E6/000000.png?text=NW" },
  { id: "CUST004", name: "Emma Brown", email: "emma@example.com", joinDate: "2023-04-05", totalOrders: 2, totalSpent: "$150.00", avatar: "https://placehold.co/40x40/90EE90/000000.png?text=EB" },
  { id: "CUST005", name: "Ava Jones", email: "ava@example.com", joinDate: "2023-05-12", totalOrders: 12, totalSpent: "$2100.50", avatar: "https://placehold.co/40x40/FFFFE0/000000.png?text=AJ" },
  { id: "CUST006", name: "James Davis", email: "james@example.com", joinDate: "2023-06-18", totalOrders: 1, totalSpent: "$50.25", avatar: "https://placehold.co/40x40/D3D3D3/000000.png?text=JD" },
  { id: "CUST007", name: "Sophia Miller", email: "sophia@example.com", joinDate: "2023-07-22", totalOrders: 6, totalSpent: "$750.00", avatar: "https://placehold.co/40x40/E6E6FA/000000.png?text=SM" },
  { id: "CUST008", name: "Logan Wilson", email: "logan@example.com", joinDate: "2023-08-30", totalOrders: 4, totalSpent: "$430.80", avatar: "https://placehold.co/40x40/DA70D6/FFFFFF.png?text=LW" },
  { id: "CUST009", name: "Isabella Moore", email: "isabella@example.com", joinDate: "2023-09-02", totalOrders: 7, totalSpent: "$990.20", avatar: "https://placehold.co/40x40/AFEEEE/000000.png?text=IM" },
  { id: "CUST010", name: "Lucas Taylor", email: "lucas@example.com", joinDate: "2023-10-25", totalOrders: 9, totalSpent: "$1500.00", avatar: "https://placehold.co/40x40/DB7093/FFFFFF.png?text=LT" },
];

const ITEMS_PER_PAGE = 5;

export default function CustomersTable() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(placeholderCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = placeholderCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleViewCustomer = (customerId: string) => {
    toast({
      title: "View Customer",
      description: `Viewing details for customer ${customerId}. (Functionality not implemented)`,
    });
    // In a real app, navigate to customer detail page or show a modal
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return `${names[0][0]}${names[names.length -1][0]}`.toUpperCase();
  }

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] hidden sm:table-cell">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden lg:table-cell">Join Date</TableHead>
              <TableHead className="hidden sm:table-cell text-center">Orders</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="hidden sm:table-cell">
                  <Avatar>
                    <AvatarImage src={customer.avatar} alt={customer.name} data-ai-hint="person avatar"/>
                    <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell className="hidden md:table-cell">{customer.email}</TableCell>
                <TableCell className="hidden lg:table-cell">{customer.joinDate}</TableCell>
                <TableCell className="hidden sm:table-cell text-center">{customer.totalOrders}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleViewCustomer(customer.id)} title="View Customer Details">
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
