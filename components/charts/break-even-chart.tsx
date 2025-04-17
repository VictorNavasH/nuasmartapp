"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Label,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface BreakEvenChartProps {
  title?: string
  description?: string
  data: any[]
  height?: number
  breakEvenPoint?: number
  breakEvenUnits?: number
}

export function BreakEvenChart({
  title = "Análisis de Punto de Equilibrio",
  description = "Visualización de ingresos, costes fijos y variables",
  data,
  height = 400,
  breakEvenPoint,
  breakEvenUnits,
}: BreakEvenChartProps) {
  // Formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card className="w-full border-t-4 border-t-[#EFF7F6]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} vertical={false} />
              <XAxis
                dataKey="unidades"
                label={{ value: "Unidades vendidas / Ocupación (%)", position: "insideBottom", offset: -15 }}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M€`
                  if (value >= 1000) return `${(value / 1000).toFixed(0)}k€`
                  return `${value}€`
                }}
              />
              <Tooltip
                formatter={(value: number, name: string) => {
                  if (name === "ingresos") return [formatCurrency(value), "Ingresos"]
                  if (name === "costosFijos") return [formatCurrency(value), "Costos Fijos"]
                  if (name === "costosVariables") return [formatCurrency(value), "Costos Variables"]
                  if (name === "costosTotales") return [formatCurrency(value), "Costos Totales"]
                  return [formatCurrency(value), name]
                }}
                labelFormatter={(value) => `Ocupación: ${value}%`}
              />
              <Legend verticalAlign="top" height={36} />

              {/* Línea de ingresos */}
              <Line
                type="monotone"
                dataKey="ingresos"
                name="Ingresos"
                stroke="#02b1c4"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />

              {/* Línea de costos totales */}
              <Line
                type="monotone"
                dataKey="costosTotales"
                name="Costos Totales"
                stroke="#fe6d73"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />

              {/* Línea de costos fijos */}
              <Line
                type="monotone"
                dataKey="costosFijos"
                name="Costos Fijos"
                stroke="#ffce85"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />

              {/* Línea de referencia para el punto de equilibrio */}
              {breakEvenUnits && (
                <ReferenceLine
                  x={breakEvenUnits}
                  stroke="#17c3b2"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  label={
                    <Label
                      value={`Punto de Equilibrio: ${breakEvenUnits}%`}
                      position="insideTopRight"
                      fill="#17c3b2"
                      fontSize={12}
                    />
                  }
                />
              )}

              {/* Línea de referencia para el valor monetario del punto de equilibrio */}
              {breakEvenPoint && (
                <ReferenceLine
                  y={breakEvenPoint}
                  stroke="#17c3b2"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  label={
                    <Label value={formatCurrency(breakEvenPoint)} position="insideRight" fill="#17c3b2" fontSize={12} />
                  }
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
