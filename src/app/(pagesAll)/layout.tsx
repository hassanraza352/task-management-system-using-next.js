import Sidebar from "@/component/Sidebar";
import { AuthProvider } from "@/context/AuthContext";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}