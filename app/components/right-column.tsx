"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreCard } from "./score-card";
import { SalesChart } from "./sales-chart";
import FeedbackBar from "./feedback-bar";

export function RightColumn() {
  return (
    <div className="flex flex-col gap-6">
      <ScoreCard />
      <SalesChart />
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <FeedbackBar />
        </CardContent>
      </Card>
    </div>
  );
}
