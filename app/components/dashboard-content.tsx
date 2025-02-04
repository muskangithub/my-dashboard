"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SimpleBarChart } from "./simplebarchart";
import { ProductTable } from "./product-table";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Dashboard content with authentication check
export function DashboardContent() {
  const router = useRouter();
  const [purchaseData, setPurchaseData] = useState<any>(null);
  // Check if the user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/login"); // Redirect to login page if not logged in
    }
  }, [router]);

  // Fetching dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const credentials = btoa("trial:assignment123");
        const response = await fetch(
          "http://3.111.196.92:8020/api/v1/sample_assignment_api_1",
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${credentials}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setPurchaseData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  if (purchaseData === null) {
    return <p>Loading...</p>; // Loading state while data is being fetched
  }

  return (
    <div className="p-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Purchase Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Purchase</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <div className="text-lg font-semibold">
              {purchaseData?.purchases}
            </div>
            <Badge className="flex gap-2 bg-green-200 text-green-600 border-green-600">
              +32%
              <TrendingUp />
            </Badge>
          </CardContent>
        </Card>

        {/* Revenue Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <div className="text-lg font-semibold">
              ${purchaseData?.revenue}
            </div>
            <Badge className="flex gap-2 bg-green-200 text-green-600 border-green-600">
              +49%
              <TrendingUp />
            </Badge>
          </CardContent>
        </Card>

        {/* Refund Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refund</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <div className="text-lg font-semibold">{purchaseData?.refunds}</div>
            <Badge className="flex gap-2 bg-red-200 text-red-600 border-red-600">
              -7%
              <TrendingDown />
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleBarChart />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader className="flex justify-between w-full flex-row items-center">
            <CardTitle>Top Products </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Full results</Button>
                </TooltipTrigger>
                <TooltipContent>Click to View full results</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <ProductTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
