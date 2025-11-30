"use client"

import { Home, History, ShoppingCart, FileText } from "lucide-react"

interface NavigationProps {
  currentPage: string
  onNavigate: (page: any) => void
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: "dashboard", label: "Case Overview", icon: Home },
    { id: "verification", label: "Verification", icon: FileText },
    { id: "evidence", label: "Evidence", icon: FileText },
    { id: "history", label: "History & Statements", icon: History },
    { id: "charges", label: "Clearance Charges", icon: ShoppingCart },
  ]

  return (
    <nav className="bg-[#0C1B33] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="font-bold text-lg flex-shrink-0">
          <span className="text-[#CDAA4A]">◆</span> Inheritance Portal
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded transition whitespace-nowrap text-sm ${
                currentPage === item.id
                  ? "bg-[#CDAA4A] text-[#0C1B33] font-semibold"
                  : "hover:bg-[#1a2a47] text-gray-200"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
