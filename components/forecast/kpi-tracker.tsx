"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendIndicator } from "@/components/stats/trend-indicator"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"

interface KpiTrackerProps {
  title: string
  description?: string
  kpis: {
    name: string
    target: number
    current: number
    unit: string
    trend?: number
    status: "success" | "warning" | "danger"
  }[]
}

export function KpiTracker({ title, description, kpis }: KpiTrackerProps) {
  // Formatear valor según la unidad
  const formatValue = (value: number, unit: string) => {
    if (unit === "€") {
      return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(value)
    }
    if (unit === "%") {
      return `${value}%`
    }
    return `${value}${unit}`
  }

  // Calcular porcentaje de progreso
  const calculateProgress = (current: number, target: number) => {
    // Si el target es 0, evitar división por cero
    if (target === 0) return 0

    // Si el target es negativo (reducción), invertir la lógica
    if (target < 0) {
      if (current <= target) return 100
      if (current <= 0) return Math.abs(current / target) * 100
      return 0
    }

    // Para targets positivos
    if (current >= target) return 100
    if (current < 0) return 0
    return (current / target) * 100
  }

  // Obtener color según el estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-[#17c3b2]"
      case "warning":
        return "bg-[#ffce85]"
      case "danger":
        return "bg-[#fe6d73]"
      default:
        return "bg-primary"
    }
  }

  // Obtener icono según el estado
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-[#17c3b2]" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-[#ffce85]" />
      case "danger":
        return <XCircle className="h-5 w-5 text-[#fe6d73]" />
      default:
        return null
    }
  }

  return (
    <Card className="border-t-4 border-t-[#B2F7EF]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {kpis.map((kpi, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(kpi.status)}
                  <span className="font-medium">{kpi.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{formatValue(kpi.current, kpi.unit)}</span>
                  <span className="text-muted-foreground">de {formatValue(kpi.target, kpi.unit)}</span>
                  {kpi.trend !== undefined && <TrendIndicator value={kpi.trend} />}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Progress
                    value={calculateProgress(kpi.current, kpi.target)}
                    className="h-2"
                    indicatorClassName={cn(getStatusColor(kpi.status))}
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {Math.round(calculateProgress(kpi.current, kpi.target))}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
