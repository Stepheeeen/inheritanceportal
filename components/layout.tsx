"use client"

import type React from "react"

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <div className="portal-container min-h-screen bg-white">{children}</div>
}
