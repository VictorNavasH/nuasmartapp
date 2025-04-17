"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ForecastComparisonChartProps {
  title: string
  description?: string
  data: any[]
  dataKey: string
  forecastKey: string
  xAxisKey?: string
  height?: number
  colors?: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  targetValue?: number
  targetLabel?: string
}

export function ForecastComparisonChart({
  title,
  description,
  data,
  dataKey,
  forecastKey,
  xAxisKey = "name",
  height = 300,
  colors = ["#02b1c4", "#ffce85"],
  valueFormatter = (value: number) => `€${value.toLocaleString()}`,
  showLegend = true,
  targetValue,
  targetLabel = "Objetivo",
}: ForecastComparisonChartProps) {
  // Validación de datos
  if (!data || data.length === 0) {
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
    <Card className="w-full border-t-4 border-t-[#7BDFF2]">
      <CardHeader className="px-6 py-4">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} vertical={false} />
              <XAxis
                dataKey={xAxisKey}
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
                formatter={(value: number, name: string) => {
                  if (name === dataKey) return [valueFormatter(value), "Real"]
                  if (name === forecastKey) return [valueFormatter(value), "Previsión"]
                  return [valueFormatter(value), name]
                }}
                contentStyle={{
                  backgroundColor: "white",
                  borderColor: "#e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  color: "#364f6b",
                }}
              />
              {showLegend && (
                <Legend
                  verticalAlign="top"
                  height={36}
                  formatter={(value) => {
                    if (value === dataKey) return "Real"
                    if (value === forecastKey) return "Previsión"
                    return value
                  }}
                />
              )}
              <Line
                type="monotone"
                dataKey={dataKey}
                name={dataKey}
                stroke={colors[0]}
                strokeWidth={2}
                dot={{ r: 4, fill: colors[0], strokeWidth: 0 }}
                activeDot={{ r: 6, fill: colors[0], strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey={forecastKey}
                name={forecastKey}
                stroke={colors[1]}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4, fill: colors[1], strokeWidth: 0 }}
                activeDot={{ r: 6, fill: colors[1], strokeWidth: 0 }}
              />
              {targetValue && (
                <ReferenceLine
                  y={targetValue}
                  stroke="#17c3b2"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  label={<Label value={targetLabel} position="insideRight" fill="#17c3b2" fontSize={12} />}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
