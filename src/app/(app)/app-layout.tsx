"use client";
import Navbar from "@/components/layout/Navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="layout-main">{children}</main>
    </>
  );
}
