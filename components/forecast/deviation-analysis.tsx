"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface DeviationAnalysisProps {
  title: string
  description?: string
  data: {
    category: string
    forecast: number
    actual: number
    unit: string
    impact: "positive" | "negative" | "neutral"
    notes?: string
  }[]
}

export function DeviationAnalysis({ title, description, data }: DeviationAnalysisProps) {
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

  // Calcular desviación
  const calculateDeviation = (actual: number, forecast: number) => {
    if (forecast === 0) return 0
    return ((actual - forecast) / Math.abs(forecast)) * 100
  }

  // Renderizar icono de desviación
  const renderDeviationIcon = (actual: number, forecast: number, impact: string) => {
    const deviation = calculateDeviation(actual, forecast)

    if (Math.abs(deviation) < 1) {
      return <Minus className="h-4 w-4 text-gray-400" />
    }

    if ((deviation > 0 && impact === "positive") || (deviation < 0 && impact === "negative")) {
      return <TrendingUp className="h-4 w-4 text-[#17c3b2]" />
    }

    if ((deviation < 0 && impact === "positive") || (deviation > 0 && impact === "negative")) {
      return <TrendingDown className="h-4 w-4 text-[#fe6d73]" />
    }

    return <Minus className="h-4 w-4 text-gray-400" />
  }

  // Obtener color de desviación
  const getDeviationColor = (actual: number, forecast: number, impact: string) => {
    const deviation = calculateDeviation(actual, forecast)

    if (Math.abs(deviation) < 1) {
      return "text-gray-400"
    }

    if ((deviation > 0 && impact === "positive") || (deviation < 0 && impact === "negative")) {
      return "text-[#17c3b2]"
    }

    if ((deviation < 0 && impact === "positive") || (deviation > 0 && impact === "negative")) {
      return "text-[#fe6d73]"
    }

    return "text-gray-400"
  }

  return (
    <Card className="border-t-4 border-t-[#F7D6E0]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Previsión</TableHead>
              <TableHead className="text-right">Real</TableHead>
              <TableHead className="text-right">Desviación</TableHead>
              <TableHead>Impacto</TableHead>
              <TableHead>Notas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => {
              const deviation = calculateDeviation(item.actual, item.forecast)

              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell className="text-right">{formatValue(item.forecast, item.unit)}</TableCell>
                  <TableCell className="text-right">{formatValue(item.actual, item.unit)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {renderDeviationIcon(item.actual, item.forecast, item.impact)}
                      <span className={getDeviationColor(item.actual, item.forecast, item.impact)}>
                        {deviation > 0 ? "+" : ""}
                        {deviation.toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-normal",
                        item.impact === "positive" && "bg-green-50 text-green-700 border-green-200",
                        item.impact === "negative" && "bg-red-50 text-red-700 border-red-200",
                        item.impact === "neutral" && "bg-gray-50 text-gray-700 border-gray-200",
                      )}
                    >
                      {item.impact === "positive" ? "Positivo" : item.impact === "negative" ? "Negativo" : "Neutral"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.notes || "-"}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
