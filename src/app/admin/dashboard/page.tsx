
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import MonthlySalesChart from "./components/monthly-sales-chart";
// import DashboardStatsCards from "./components/dashboard-stats-cards";
// import RecentOrdersTable from "./components/recent-orders-table";
// import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard - Minimal Test</h1>
      </div>

      {/*
      <DashboardStatsCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4">
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

        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity (Placeholder)
            </CardTitle>
            <CardDescription>A log of recent important events.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              {[
                {user: "Olivia Martin", action: "placed order #3124", time: "5m ago"},
                {user: "Jackson Lee", action: "updated product 'Silk Kurta'", time: "1h ago"},
                {user: "Admin", action: "logged in", time: "2h ago"},
                {user: "Isabella Nguyen", action: "registered", time: "3h ago"},
              ].map((activity, idx) => (
                 <li key={idx} className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-foreground">{activity.user}</span>
                      <span className="text-muted-foreground"> {activity.action}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <RecentOrdersTable />
      */}
    </div>
  );
}
