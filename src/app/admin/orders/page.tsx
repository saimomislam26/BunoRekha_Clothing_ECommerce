
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import OrdersTable from "./components/orders-table";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground flex items-center">
          <ShoppingCart className="mr-3 h-8 w-8 text-primary" />
          Manage Orders
        </h1>
        {/* Add New Order Button can go here if needed in future */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>
            View and manage all customer orders. (Table uses placeholder data)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrdersTable />
        </CardContent>
      </Card>
    </div>
  );
}
