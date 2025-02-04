"use client";

import { Home, BarChart2, Users, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: BarChart2, label: "Analytics", href: "/analytics" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 bg-gray-200">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          MyApp
        </h2>
      </div>
      <nav className="mt-6">
        <ul>
          {navItems.map((item, index) => {
            const isActive = pathname === item?.href;
            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isActive ? "bg-white dark:bg-gray-700" : ""
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 mr-3 ${
                      isActive ? "text-blue-500 fill-blue-500" : ""
                    }`}
                  />
                  <span className={isActive ? "font-medium" : ""}>
                    {item?.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
