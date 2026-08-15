import Sidebar from "@/component/Sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}