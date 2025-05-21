
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import CustomersTable from "./components/customers-table";

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground flex items-center">
          <Users className="mr-3 h-8 w-8 text-primary" />
          Manage Customers
        </h1>
        {/* Add New Customer Button can go here if needed in future */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>
            View and manage customer accounts. (Table uses placeholder data)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CustomersTable />
        </CardContent>
      </Card>
    </div>
  );
}
