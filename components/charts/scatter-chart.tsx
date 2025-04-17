"use client"

import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ScatterChartProps {
  title: string
  description?: string
  data: any[]
  xKey: string
  yKey: string
  zKey?: string
  height?: number
  colors?: string[]
  xFormatter?: (value: number) => string
  yFormatter?: (value: number) => string
}

export function CustomScatterChart({
  title,
  description,
  data,
  xKey,
  yKey,
  zKey,
  height = 300,
  colors = ["#02b1c4"],
  xFormatter = (value: number) => value.toString(),
  yFormatter = (value: number) => `€${value.toLocaleString()}`,
}: ScatterChartProps) {
  return (
    <Card className="border-t-4 border-t-[#F7D6E0]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
              <XAxis
                dataKey={xKey}
                type="number"
                name={xKey}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#8ca6c5" }}
                tickMargin={10}
                tickFormatter={xFormatter}
              />
              <YAxis
                dataKey={yKey}
                type="number"
                name={yKey}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#8ca6c5" }}
                tickMargin={10}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value / 1000000).toString()}M`
                  if (value >= 1000) return `${(value / 1000).toString()}k`
                  return value.toString()
                }}
              />
              {zKey && <ZAxis dataKey={zKey} range={[60, 400]} name={zKey} />}
              <Tooltip
                formatter={(value: number, name: string) => {
                  if (name === yKey) return [yFormatter(value), name]
                  return [xFormatter(value), name]
                }}
                contentStyle={{
                  backgroundColor: "white",
                  borderColor: "#e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              />
              <Scatter name="Datos" data={data} fill={colors[0]} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
