"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ScoreCard() {
  const radius = 50;
  const circumference = Math.PI * radius;
  const score = 70;
  const progress = (score / 100) * circumference;

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Your Score</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-[200px] text-center my-2">
          <svg width="200" height="140" viewBox="0 0 120 60">
            <path
              d="M 10 50 A 50 50 0 0 1 110 50"
              fill="none"
              stroke="#ddd"
              strokeWidth="10"
            />
            <path
              d="M 10 50 A 50 50 0 0 1 110 50"
              fill="none"
              stroke="blue"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center">
            <span className="text-xl font-bold">{score}</span>
            <div>of 100 points</div>
          </div>
        </div>
        <div className="border-t-2 py-4 flex flex-col gap-2">
          <span className="text-xl text-black font-bold">You are Good</span>
          <span className="text-lg text-gray-500">
            Your sales performance is better than others
          </span>

          <div className="mt-2">
            <Button className="border bg-white text-gray-600 rounded-3xl shadow-md">
              Improve your score
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
