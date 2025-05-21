
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  change?: string;
  changeType?: "positive" | "negative";
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon: Icon, change, changeType }) => (
  <Card className="shadow-sm hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-5 w-5 text-primary" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <p className="text-xs text-muted-foreground pt-1">{description}</p>
      {change && (
        <p className={`text-xs mt-1 ${changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
          {change}
        </p>
      )}
    </CardContent>
  </Card>
);


export default function DashboardStatsCards() {
  const stats: StatCardProps[] = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      description: "+20.1% from last month",
      icon: DollarSign,
      change: "+$8,000",
      changeType: "positive"
    },
    {
      title: "Total Orders",
      value: "2,350",
      description: "+180.1% from last month",
      icon: CreditCard,
      change: "+350 orders",
      changeType: "positive"
    },
    {
      title: "Repeat Customers",
      value: "320",
      description: "15% of total customers",
      icon: Users,
      change: "+12 new repeaters",
      changeType: "positive"
    },
    {
      title: "Active Sessions",
      value: "573",
      description: "Users currently online",
      icon: Activity,
      change: "-5 since last hour",
      changeType: "negative"
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
