"use client";

import { useState } from "react";
import DashboardHeader from "./components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <>
      {/* SIDEBAR */}
      <DashboardHeader onOpenSidebar={() => setOpenSidebar(true)} />

      {/* CONTENT */}
        {children}
    </>
  );
}