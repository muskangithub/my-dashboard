"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";
import { DashboardContent } from "../components/dashboard-content";
import { RightColumn } from "../components/right-column";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 bg-white">
                <DashboardContent />
              </div>
              <div className="w-full lg:w-1/3">
                <RightColumn />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
