"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Importar Recharts de manera dinámica para evitar problemas de SSR
const ScatterChart = dynamic(() => import("recharts").then((mod) => mod.ScatterChart), { ssr: false })
const Scatter = dynamic(() => import("recharts").then((mod) => mod.Scatter), { ssr: false })
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), { ssr: false })
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), { ssr: false })
const ZAxis = dynamic(() => import("recharts").then((mod) => mod.ZAxis), { ssr: false })
const CartesianGrid = dynamic(() => import("recharts").then((mod) => mod.CartesianGrid), { ssr: false })
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false })
const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false })

interface ScatterChartDynamicProps {
  data: any[]
  height?: number
}

export function ScatterChartDynamic({ data, height = 400 }: ScatterChartDynamicProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div style={{ height }} className="flex items-center justify-center">
        Cargando gráfico...
      </div>
    )
  }

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis
            dataKey="x"
            type="number"
            name="día"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#8ca6c5" }}
            tickMargin={10}
            tickFormatter={(value) => {
              const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
              return dias[value - 1] || ""
            }}
          />
          <YAxis
            dataKey="y"
            type="number"
            name="ingresos"
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
          <ZAxis dataKey="size" range={[60, 400]} name="ocupación" />
          <Tooltip
            formatter={(value, name) => {
              if (name === "ingresos")
                return [new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value), name]
              if (name === "ocupación") return [`${value}%`, name]
              return [value, name]
            }}
            contentStyle={{
              backgroundColor: "white",
              borderColor: "#e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          />
          <Scatter name="Datos" data={data} fill="#02b1c4" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
