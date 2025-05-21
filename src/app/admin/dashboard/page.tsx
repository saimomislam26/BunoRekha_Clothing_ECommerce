
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MonthlySalesChart from "./components/monthly-sales-chart";
import DashboardStatsCards from "./components/dashboard-stats-cards";
import RecentOrdersTable from "./components/recent-orders-table";
import { Activity, DollarSign } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
      </div>

      <DashboardStatsCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Monthly Sales Overview
            </CardTitle>
            <CardDescription>
              Placeholder sales data for the last 6 months.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <MonthlySalesChart />
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-3 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>A log of recent important events (placeholder data).</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              {[
                {user: "Olivia Martin", action: "placed order #ORD3124", time: "5m ago"},
                {user: "Jackson Lee", action: "updated product 'Silk Kurta'", time: "1h ago"},
                {user: "Admin User", action: "logged in", time: "2h ago"},
                {user: "Isabella Nguyen", action: "registered as a new customer", time: "3h ago"},
                {user: "Liam Johnson", action: "reviewed 'Golden Weave Saree'", time: "5h ago"},
              ].map((activity, idx) => (
                 <li key={idx} className="flex items-center justify-between border-b border-border/50 pb-2 last:border-b-0 last:pb-0">
                    <div>
                      <span className="font-medium text-foreground">{activity.user}</span>
                      <span className="text-muted-foreground"> {activity.action}</span>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <RecentOrdersTable />
    </div>
  );
}

