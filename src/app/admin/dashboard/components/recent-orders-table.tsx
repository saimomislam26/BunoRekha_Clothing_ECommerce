
"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";

const placeholderOrders = [
  {
    id: "ORD001",
    customer: "Liam Johnson",
    email: "liam@example.com",
    date: "2023-10-23",
    total: "$250.00",
    status: "Shipped",
    items: 3,
  },
  {
    id: "ORD002",
    customer: "Olivia Smith",
    email: "olivia@example.com",
    date: "2023-10-24",
    total: "$150.75",
    status: "Processing",
    items: 2,
  },
  {
    id: "ORD003",
    customer: "Noah Williams",
    email: "noah@example.com",
    date: "2023-10-25",
    total: "$350.00",
    status: "Delivered",
    items: 1,
  },
  {
    id: "ORD004",
    customer: "Emma Brown",
    email: "emma@example.com",
    date: "2023-10-26",
    total: "$450.50",
    status: "Pending",
    items: 5,
  },
  {
    id: "ORD005",
    customer: "Ava Jones",
    email: "ava@example.com",
    date: "2023-10-27",
    total: "$50.25",
    status: "Shipped",
    items: 1,
  },
];

export default function RecentOrdersTable() {
  const getStatusVariant = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (status.toLowerCase()) {
      case "shipped":
        return "default"; // Primary color
      case "processing":
        return "secondary";
      case "delivered":
        return "outline"; // Using outline to look like success
      case "pending":
        return "destructive"; // Using destructive for pending to make it stand out
      default:
        return "outline";
    }
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Recent Orders
        </CardTitle>
        <CardDescription>
          A list of the most recent orders. (Placeholder data)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="hidden sm:table-cell text-center">Items</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {placeholderOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="hidden sm:table-cell font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell className="hidden md:table-cell">{order.email}</TableCell>
                <TableCell className="hidden lg:table-cell">{order.date}</TableCell>
                <TableCell className="text-right">{order.total}</TableCell>
                <TableCell className="hidden sm:table-cell text-center">{order.items}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={getStatusVariant(order.status)} className="capitalize">
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
