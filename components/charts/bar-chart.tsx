"use client"

import { useState, useMemo } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BarChartProps {
  title: string
  description?: string
  data: any[]
  categories: string[]
  index: string
  colors?: string[]
  height?: number
  valueFormatter?: (value: number) => string
  showLegend?: boolean
}

type TimePeriod = "day" | "week" | "month" | "year" | "all"

export function CustomBarChart({
  title,
  description,
  data,
  categories,
  index,
  colors = ["#02b1c4", "#227c9d"],
  height = 300,
  valueFormatter = (value: number) => `€${value.toLocaleString()}`,
  showLegend = false,
}: BarChartProps) {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("month")

  // Filtrar datos según el período seleccionado
  const filteredData = useMemo(() => {
    if (timePeriod === "all") return data

    // Para esta demo, simplemente limitamos la cantidad de datos mostrados
    // En una implementación real, filtrarías por fecha
    switch (timePeriod) {
      case "day":
        return data.slice(-1) // Último día
      case "week":
        return data.slice(-7) // Última semana
      case "month":
        return data.slice(-12) // Último mes (asumiendo que son datos mensuales)
      case "year":
        return data // Todo el año
      default:
        return data
    }
  }, [data, timePeriod])

  // Validación de datos
  if (!data || data.length === 0 || !categories || categories.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">No hay datos disponibles</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full border-t-4 border-t-[#B2F7EF]">
      <CardHeader className="px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex items-center gap-2">
            <Select value={timePeriod} onValueChange={(value: TimePeriod) => setTimePeriod(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Día</SelectItem>
                <SelectItem value="week">Semana</SelectItem>
                <SelectItem value="month">Mes</SelectItem>
                <SelectItem value="year">Año</SelectItem>
                <SelectItem value="all">Todo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {showLegend && (
          <div className="flex items-center gap-4 mt-4">
            {categories.map((category, i) => (
              <div key={category} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      category === "ingresos"
                        ? "#02f2d2"
                        : category === "gastos"
                          ? "#fe6d73"
                          : category === "real"
                            ? "#edadff"
                            : colors[i % colors.length],
                  }}
                />
                <span className="text-sm text-secondary-blue">{category}</span>
              </div>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} vertical={false} />
              <XAxis
                dataKey={index}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#364f6b" }}
                tickMargin={10}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#364f6b" }}
                tickMargin={10}
                width={50}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
                  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
                  return value.toString()
                }}
              />
              <Tooltip
                formatter={(value: number) => [valueFormatter(value)]}
                contentStyle={{
                  backgroundColor: "white",
                  borderColor: "#e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  color: "#364f6b",
                }}
              />
              {categories.map((category, i) => (
                <Bar
                  key={category}
                  dataKey={category}
                  fill={
                    category === "ingresos"
                      ? "#02f2d2"
                      : category === "gastos"
                        ? "#fe6d73"
                        : category === "real"
                          ? "#edadff"
                          : category === "anterior"
                            ? "#edadff"
                            : colors[i % colors.length]
                  }
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
