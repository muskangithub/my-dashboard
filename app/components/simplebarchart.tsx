"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useState, useEffect } from "react";

type ChartType = { Month: string; This_year: number; Last_year: number };

export function SimpleBarChart() {
  const [data, setData] = useState<ChartType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch("/api/charts");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) return <p>Loading Chart...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <ChartContainer
      config={{
        Last_year: {
          label: "Last Year",
          color: "green",
        },
        This_year: {
          label: "This Year",
          color: "blue",
        },
      }}
      className="h-[300px] bg-white shadow-md rounded-lg p-4"
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
        style={{ background: "white" }}
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Month" />
          <YAxis />
          <ChartTooltip content={<CustomTooltip />} cursor={false} />
          <Legend />
          <Bar dataKey="Last_year" fill="green" name="Last Year" />
          <Bar dataKey="This_year" fill="blue" name="This Year" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload?.length) {
    // Extract values for both bars (This_year and Last_year)
    const thisYearData = payload.find(
      (entry) => entry?.dataKey === "This_year"
    );
    const lastYearData = payload.find(
      (entry) => entry?.dataKey === "Last_year"
    );

    return (
      <div className="bg-white p-3 shadow-lg rounded-md border border-gray-200">
        <p className="text-black font-bold">{label}</p>
        {thisYearData && (
          <p style={{ color: "blue" }} className="text-sm">
            <strong>This Year:</strong> {thisYearData?.value}
          </p>
        )}
        {lastYearData && (
          <p style={{ color: "green" }} className="text-sm">
            <strong>Last Year:</strong> {lastYearData?.value}
          </p>
        )}
      </div>
    );
  }

  return null;
}
