"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useState, useEffect } from "react";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border rounded shadow-md">
        <p className="font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.stroke }}
            ></span>
            <span>{entry?.name}: </span>
            <span className="font-bold">{entry?.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function SalesChart() {
  const [sales, setSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch("/api/sales");
        if (!response.ok) throw new Error("Failed to fetch sales data");
        const data = await response.json();

        const formattedData = data.map((item: any) => ({
          month: new Date(item.date).toLocaleString("en-US", {
            month: "short",
            year: "2-digit",
          }),
          web: Number(item.web_sales),
          offline: Number(item.offline_sales),
        }));

        setSales(formattedData);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) return <p>Loading sales data...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Sales Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sales}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#ccc"
              strokeWidth={0.5}
              vertical={false}
            />

            <XAxis dataKey="month" axisLine={true} tick={false} />
            <YAxis
              ticks={[0, 2000, 4000, 6000]}
              tickFormatter={(value) => `${value / 1000}k`}
              tick={{ fontSize: 12 }}
              domain={[0, "auto"]}
            />

            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="web"
              name="Web Sales"
              stroke="#00008B"
              strokeWidth={0.3}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="offline"
              name="Offline Sales"
              stroke="#87CEFA"
              strokeWidth={0.3}
              dot={{ r: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-3 items-center w-full">
          <div className="flex flex-col gap-1 ">
            <div className="flex gap-2 items-center">
              Web sales <div className="h-3 w-3 bg-[#00008B]"></div>
            </div>
            <div>1304%</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              Offline selling <div className="h-3 w-3 bg-[#87CEFA]"></div>
            </div>
            <div>473%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
