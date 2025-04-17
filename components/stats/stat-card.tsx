import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendIndicator } from "@/components/stats/trend-indicator"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  trend?: number
  trendLabel?: string
  description?: string
  currency?: boolean
  colorClass?: string
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  trendLabel,
  description,
  currency = false,
  colorClass,
}: StatCardProps) {
  // Determine si el valor es positivo o negativo
  const isPositive = typeof value === "number" ? value >= 0 : true

  // Usar el color basado en si el valor es positivo o negativo
  const valueColor = isPositive ? "text-[#17c3b2]" : "text-[#fe6d73]"

  // Asignar colores de la paleta según el título
  let borderColor = "border-t-[#B2F7EF]" // Color por defecto

  if (title === "Ticket Medio") {
    borderColor = "border-t-[#7BDFF2]"
  } else if (title === "Ocupación Media") {
    borderColor = "border-t-[#B2F7EF]"
  } else if (title === "Punto de Equilibrio") {
    borderColor = "border-t-[#EFF7F6]"
  } else if (title === "Beneficio Neto") {
    borderColor = "border-t-[#F7D6E0]"
  } else if (title === "EBITDA") {
    borderColor = "border-t-[#F2B5D4]"
  } else if (title === "Gastos Totales") {
    borderColor = "border-t-[#fe6d73]" // Color rojo para gastos
  } else if (title === "Días Abiertos") {
    borderColor = "border-t-[#7BDFF2]"
  } else if (title === "Ratio Aprovechamiento") {
    borderColor = "border-t-[#B2F7EF]"
  } else if (title === "Alertas Activas") {
    // Mantener el color original para las alertas
    borderColor = "" // Se usará el colorClass proporcionado
  }

  // Forzar el estilo para Gastos Totales
  if (title === "Gastos Totales") {
    return (
      <Card className={cn("overflow-hidden bg-gradient-to-b from-white to-[#f8f9fa] border-t-4 border-t-[#fe6d73]")}>
        <CardContent className="px-4 py-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-blue">Gastos Totales</p>
              <h3 className="text-2xl font-bold mt-1 text-[#fe6d73]">
                {new Intl.NumberFormat("es-ES", {
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 0,
                }).format(typeof value === "number" ? value : 0)}
              </h3>
              {trend !== undefined && (
                <div className="mt-1">
                  <TrendIndicator value={trend} label={trendLabel} />
                </div>
              )}
              <p className="text-xs text-text-secondary mt-1">
                {typeof value === "number" && `${Math.round((value / 66000) * 100)}% sobre ventas`}
              </p>
            </div>
            <div className="p-2 bg-primary-light/30 rounded-full">
              <div className="w-6 h-6 flex items-center justify-center text-[#ff4797]">{icon}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("overflow-hidden bg-gradient-to-b from-white to-[#f8f9fa]", colorClass || borderColor)}>
      <CardContent className="px-4 py-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-secondary-blue">{title}</p>
            <h3 className={cn("text-2xl font-bold mt-1", valueColor)}>
              {currency && typeof value === "number"
                ? new Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 0,
                  }).format(value)
                : value}
            </h3>
            {trend !== undefined && (
              <div className="mt-1">
                <TrendIndicator value={trend} label={trendLabel} />
              </div>
            )}
            {description && <p className="text-xs text-text-secondary mt-1">{description}</p>}
          </div>
          <div className="p-2 bg-primary-light/30 rounded-full">
            <div className="w-6 h-6 flex items-center justify-center">
              {title === "Ticket Medio" || title === "Beneficio Neto" || title === "EBITDA" ? (
                <div className="text-[#ff4797]">{icon}</div>
              ) : (
                <div className="w-6 h-6 flex items-center justify-center text-[#ff4797]">{icon}</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
