"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LineChartProps {
  title: string
  description?: string
  data: any[]
  dataKey: string
  xAxisKey?: string
  yAxisKey?: string
  secondaryYAxisKey?: string
  secondaryDataKey?: string
  height?: number
  categories?: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
}

export function CustomLineChart({
  title,
  description,
  data,
  dataKey,
  xAxisKey = "name",
  yAxisKey = "value",
  secondaryYAxisKey,
  secondaryDataKey,
  height = 300,
  colors = ["#02b1c4", "#fe6d73"],
  valueFormatter = (value: number) => `€${value.toLocaleString()}`,
  showLegend = false,
}: LineChartProps) {
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
            <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
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
                  const formattedName =
                    name === yAxisKey ? dataKey : name === secondaryYAxisKey ? secondaryDataKey : name
                  return [valueFormatter(value), formattedName]
                }}
                contentStyle={{
                  backgroundColor: "white",
                  borderColor: "#e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  color: "#364f6b",
                }}
              />
              <Line
                type="monotone"
                dataKey={yAxisKey}
                name={dataKey}
                stroke={colors[0]}
                strokeWidth={2}
                dot={{ r: 4, fill: colors[0], strokeWidth: 0 }}
                activeDot={{ r: 6, fill: colors[0], strokeWidth: 0 }}
              />
              {secondaryYAxisKey && (
                <Line
                  type="monotone"
                  dataKey={secondaryYAxisKey}
                  name={secondaryDataKey || secondaryYAxisKey}
                  stroke={colors[1]}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4, fill: colors[1], strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: colors[1], strokeWidth: 0 }}
                />
              )}
              {showLegend && (
                <Legend
                  verticalAlign="top"
                  height={36}
                  formatter={(value) => {
                    return <span style={{ color: "#364f6b" }}>{value}</span>
                  }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
