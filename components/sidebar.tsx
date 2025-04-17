"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Calendar,
  MenuIcon,
  X,
  TrendingUp,
  BarChart2,
  CreditCard,
  BrainCircuit,
  PieChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Comparativas",
    icon: BarChart2,
    href: "/comparativas",
  },
  {
    title: "Datos Operativos",
    icon: Calendar,
    href: "/operativos",
  },
  {
    title: "Análisis Financiero",
    icon: BarChart3,
    href: "/financiero",
  },
  {
    title: "Análisis de Costes",
    icon: PieChart,
    href: "/analisis-costes",
  },
  {
    title: "Créditos",
    icon: CreditCard,
    href: "/creditos",
  },
  {
    title: "Pronósticos",
    icon: TrendingUp,
    href: "/pronosticos",
  },
  {
    title: "Asistente IA",
    icon: BrainCircuit,
    href: "/asistente",
  },
  {
    title: "Configuración",
    icon: Settings,
    href: "/configuracion",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button - only visible on small screens */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <MenuIcon className="h-6 w-6" />
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar for Mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transform transition-transform duration-300 md:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              N
            </div>
            <span className="font-bold text-xl text-secondary-blue">NÜA Finance</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex flex-col gap-1 p-2">
          {menuItems.map((item) => (
            <Link key={item.title} href={item.href} onClick={() => setIsMobileOpen(false)}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  pathname === item.href ? "bg-[#bee1e6] text-secondary-blue" : "hover:bg-muted text-secondary-blue",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </div>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>NR</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-secondary-blue">Mi Restaurante</p>
              <p className="text-xs text-secondary-blue opacity-75">Administrador</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar for Desktop */}
      <div
        className={cn(
          "hidden md:flex flex-col h-screen border-r bg-white transition-all duration-300",
          isCollapsed ? "w-[80px]" : "w-[250px]",
        )}
      >
        <div className="flex h-16 items-center px-4 border-b justify-between">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                N
              </div>
              <span className="font-bold text-xl text-text-primary">NÜA Finance</span>
            </Link>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 mx-auto rounded-full bg-primary flex items-center justify-center text-white font-bold">
              N
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={isCollapsed ? "mx-auto" : ""}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex flex-col gap-1 p-2 flex-1 bg-white rounded-md">
          {menuItems.map((item) => (
            <Link key={item.title} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 rounded-md transition-colors",
                  isCollapsed ? "justify-center py-3" : "px-3 py-2",
                  pathname === item.href ? "bg-[#bee1e6] text-secondary-blue" : "hover:bg-muted text-secondary-blue",
                )}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span>{item.title}</span>}
              </div>
            </Link>
          ))}
        </nav>
        <div className="border-t p-4">
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>NR</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div>
                <p className="text-sm font-medium text-secondary-blue">Mi Restaurante</p>
                <p className="text-xs text-secondary-blue opacity-75">Administrador</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
