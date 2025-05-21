
"use client"

import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "January", sales: 1860, fill: "hsl(var(--chart-1))" },
  { month: "February", sales: 3050, fill: "hsl(var(--chart-1))" },
  { month: "March", sales: 2370, fill: "hsl(var(--chart-1))" },
  { month: "April", sales: 730, fill: "hsl(var(--chart-2))" },
  { month: "May", sales: 2090, fill: "hsl(var(--chart-2))" },
  { month: "June", sales: 2140, fill: "hsl(var(--chart-2))" },
];

const chartConfig = {
  sales: {
    label: "Sales ($)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function MonthlySalesChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
            accessibilityLayer 
            data={chartData} 
            margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip
            cursor={<Rectangle fill="hsl(var(--accent))" opacity={0.2} radius={4} />}
            content={<ChartTooltipContent />} 
          />
          <Bar 
            dataKey="sales" 
            radius={[4, 4, 0, 0]} 
            fill="var(--color-sales)" 
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
