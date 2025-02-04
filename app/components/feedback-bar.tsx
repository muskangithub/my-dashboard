"use client";
import { useState, useEffect } from "react";

export default function FeedbackBar() {
  const [feedbackData, setFeedbackData] = useState([
    { label: "Negative", value: 0, color: "bg-red-500" },
    { label: "Neutral", value: 0, color: "bg-yellow-500" },
    { label: "Positive", value: 0, color: "bg-green-500" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await fetch(
          "http://3.111.196.92:8020/api/v1/sample_assignment_api_5/",
          {
            method: "GET",
            headers: {
              Authorization: "Basic " + btoa("trial:assignment123"), // Basic Auth
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch feedback data");
        const data = await response.json();
        setFeedbackData([
          { label: "Negative", value: data?.negative, color: "bg-red-500" },
          { label: "Neutral", value: data?.neutral, color: "bg-yellow-500" },
          { label: "Positive", value: data?.positive, color: "bg-green-500" },
        ]);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbackData();
  }, []);

  if (loading) return <p>Loading Feedback...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  const total = feedbackData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4 border border-gray-200">
      <h2 className="text-md font-bold text-gray-600">Community Feedback</h2>
      <h3 className="text-2xl font-bold ">Mostly Positive</h3>

      <div className="flex items-center gap-2 w-full bg-white rounded-full h-4 overflow-hidden">
        {feedbackData?.map((item) => (
          <div
            key={item?.label}
            className={`${item?.color} h-4 rounded-lg`}
            style={{ width: `${(item?.value / total) * 100}%` }}
          ></div>
        ))}
      </div>

      <div className="flex justify-between text-sm font-semibold text-gray-800 ">
        {feedbackData.map((item) => (
          <div key={item?.label} className="flex flex-col">
            <span>{item?.label}</span>
            <span>{item?.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
