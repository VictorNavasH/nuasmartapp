"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react"

interface PieChartProps {
  title: string
  description?: string
  data: {
    name: string
    value: number
  }[]
  standardData?: Record<string, number>
  colors?: string[]
  height?: number
  valueFormatter?: (value: number) => string
}

export function CustomPieChart({
  title,
  description,
  data,
  standardData,
  colors = ["#02b1c4", "#227c9d", "#edadff", "#ffce85", "#ff4797", "#fe6d73"],
  height = 300,
  valueFormatter = (value: number) => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    return `${((value / total) * 100).toFixed(1)}%`
  },
}: PieChartProps) {
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

  // Calcular el total para los porcentajes
  const total = data.reduce((sum, item) => sum + item.value, 0)

  // Función para crear una versión suave del color
  const getSoftColor = (color: string) => {
    // Convertir el color hex a rgba con opacidad 0.08 (más suave)
    return `${color}15` // 15 en hexadecimal es aproximadamente 8% de opacidad
  }

  // Renderizador personalizado para las etiquetas dentro del donut
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-sm font-medium">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  // Modificar la clase border-t para usar el color #EFF7F6 de la paleta
  return (
    <Card className="w-full border-t-4 border-t-[#EFF7F6]">
      <CardHeader className="px-6 py-4">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="flex flex-col md:flex-row h-auto">
          <div className="w-full md:w-2/5 h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={renderCustomizedLabel}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => {
                    const percent = ((value / total) * 100).toFixed(1)
                    return [`${percent}%`, name]
                  }}
                  contentStyle={{
                    backgroundColor: "white",
                    borderColor: "#e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    color: "#364f6b",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {data.map((entry, index) => {
              const percent = (entry.value / total) * 100
              const percentFormatted = percent.toFixed(1)
              const color = colors[index % colors.length]
              const softColor = getSoftColor(color)

              // Comparación con estándar de la industria si está disponible
              let comparison = null
              if (standardData && standardData[entry.name] !== undefined) {
                const diff = percent - standardData[entry.name]
                const diffFormatted = Math.abs(diff).toFixed(1)
                const standardPercent = standardData[entry.name]

                if (Math.abs(diff) < 1) {
                  comparison = (
                    <div className="flex items-center text-xs text-gray-500">
                      <ArrowRightIcon className="h-3 w-3 mr-1 text-[#FF91C1]" />
                      <span>Estándar: {standardPercent}%</span>
                    </div>
                  )
                } else if (diff > 0) {
                  comparison = (
                    <div className="flex items-center text-xs text-gray-500">
                      <ArrowUpIcon className="h-3 w-3 mr-1 text-[#FF91C1]" />
                      <span>
                        {diffFormatted}% sobre estándar ({standardPercent}%)
                      </span>
                    </div>
                  )
                } else {
                  comparison = (
                    <div className="flex items-center text-xs text-gray-500">
                      <ArrowDownIcon className="h-3 w-3 mr-1 text-[#FF91C1]" />
                      <span>
                        {diffFormatted}% bajo estándar ({standardPercent}%)
                      </span>
                    </div>
                  )
                }
              }

              return (
                <div
                  key={entry.name}
                  className="p-3 rounded-lg shadow-sm border border-gray-100"
                  style={{
                    background: `linear-gradient(to bottom, white, ${softColor})`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    <div className="flex justify-between w-full">
                      <span className="text-sm font-medium text-secondary-blue">{entry.name}</span>
                      <span className="text-sm font-medium text-secondary-blue">{percentFormatted}%</span>
                    </div>
                  </div>

                  {/* Barra de progreso */}
                  <div className="mt-2 w-full bg-white/50 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${percentFormatted}%`,
                        backgroundColor: color,
                      }}
                    ></div>
                  </div>

                  {/* Comparación con estándar */}
                  {standardData && standardData[entry.name] !== undefined && (
                    <div className="mt-3 flex flex-wrap items-center justify-between">
                      <div className="flex items-center gap-1 mr-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                        <span className="text-xs">Actual: {percentFormatted}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-secondary-blue/70"></div>
                        <span className="text-xs">Estándar: {standardData[entry.name]}%</span>
                      </div>
                    </div>
                  )}

                  {/* Barra de comparación visual mejorada */}
                  {standardData && standardData[entry.name] !== undefined && (
                    <div className="mt-2 relative w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                      {/* Barra actual */}
                      <div
                        className="h-full rounded-l-full"
                        style={{
                          width: `${Math.min(percent, 100)}%`,
                          backgroundColor: color,
                        }}
                      ></div>

                      {/* Marcador de estándar */}
                      <div
                        className="absolute top-0 h-full w-0.5 bg-secondary-blue"
                        style={{
                          left: `${Math.min(standardData[entry.name], 100)}%`,
                        }}
                      ></div>
                    </div>
                  )}

                  {comparison && <div className="mt-2 text-xs">{comparison}</div>}
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
