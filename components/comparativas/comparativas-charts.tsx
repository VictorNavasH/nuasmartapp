"use client"

import { CustomBarChart } from "@/components/charts/bar-chart"

// Tipos para los datos que recibirá el componente
interface ComparativasChartsProps {
  comparativaIngresosGastos: any[]
  ocupacionData: any[]
}

export function ComparativasCharts({ comparativaIngresosGastos, ocupacionData }: ComparativasChartsProps) {
  // Definir la función de formato dentro del componente cliente
  const percentageFormatter = (value: number) => `${value}%`

  return (
    <div className="grid gap-6">
      {/* Gráfica de comparativa de ingresos vs gastos - ahora ocupa toda la línea */}
      <CustomBarChart
        title="Comparativa Ingresos vs Gastos"
        description="Análisis mensual de ingresos y gastos durante los últimos 12 meses"
        data={comparativaIngresosGastos}
        categories={["ingresos", "gastos"]}
        index="mes"
        showLegend={true}
      />

      {/* Gráfica de ocupación */}
      <CustomBarChart
        title="Ocupación: Real vs Objetivo"
        description="Comparativa entre la ocupación real y el objetivo establecido"
        data={ocupacionData}
        categories={["real", "objetivo"]}
        index="mes"
        valueFormatter={percentageFormatter}
        showLegend={true}
      />
    </div>
  )
}
