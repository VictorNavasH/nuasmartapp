"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface SectorComparisonProps {
  restaurantData: { category: string; value: number; percentage: number }[]
  sectorData: { category: string; value: number }[]
  categories: { id: string; name: string; color: string }[]
}

export function SectorComparison({ restaurantData, sectorData, categories }: SectorComparisonProps) {
  // Preparar los datos para la comparación
  const comparisonData = restaurantData.map((item) => {
    const sectorItem = sectorData.find((s) => s.category === item.category)
    const category = categories.find((c) => c.id === item.category)

    return {
      name: category?.name || item.category,
      restaurante: item.percentage,
      sector: sectorItem?.value || 0,
      diferencia: item.percentage - (sectorItem?.value || 0),
    }
  })

  return (
    <div className="space-y-6">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={comparisonData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="%" />
            <Tooltip formatter={(value) => [`${value}%`]} />
            <Legend />
            <Bar dataKey="restaurante" name="Tu Restaurante" fill="#8884d8" />
            <Bar dataKey="sector" name="Media del Sector" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Análisis de Desviaciones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">Por Encima del Sector</h4>
            <ul className="space-y-2">
              {comparisonData
                .filter((item) => item.diferencia > 0)
                .sort((a, b) => b.diferencia - a.diferencia)
                .map((item) => (
                  <li key={item.name} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="font-medium text-red-600">+{item.diferencia.toFixed(2)}%</span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Por Debajo del Sector</h4>
            <ul className="space-y-2">
              {comparisonData
                .filter((item) => item.diferencia < 0)
                .sort((a, b) => a.diferencia - b.diferencia)
                .map((item) => (
                  <li key={item.name} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="font-medium text-green-600">{item.diferencia.toFixed(2)}%</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
