
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground flex items-center">
          <Users className="mr-3 h-8 w-8 text-primary" />
          Manage Customers
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Customer Overview</CardTitle>
          <CardDescription>
            View and manage customer accounts. (Functionality Coming Soon)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section will display a list of all registered customers, allowing you to view their details, order history, and manage accounts.
            Currently, this is a placeholder page.
          </p>
           <div className="mt-6 p-8 border border-dashed border-border rounded-md text-center text-muted-foreground">
            Customer management features will be implemented here.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
