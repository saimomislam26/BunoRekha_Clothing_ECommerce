
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground flex items-center">
          <Settings className="mr-3 h-8 w-8 text-primary" />
          Admin Settings
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Site Configuration</CardTitle>
          <CardDescription>
            Manage general site settings, payment gateways, shipping options, etc. (Functionality Coming Soon)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section will provide options to configure various aspects of your e-commerce site.
            Currently, this is a placeholder page.
          </p>
          <div className="mt-6 p-8 border border-dashed border-border rounded-md text-center text-muted-foreground">
            Site settings and configuration options will be available here.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
