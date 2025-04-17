"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CostTrendsProps {
  trendsData: any[]
  categories: { id: string; name: string; color: string }[]
  totalCostTrend: { month: string; value: number; percentage: number }[]
}

export function CostTrends({ trendsData, categories, totalCostTrend }: CostTrendsProps) {
  const [viewMode, setViewMode] = useState<"all" | "selected" | "total">("total")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([categories[0].id, categories[1].id])

  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    } else {
      setSelectedCategories([...selectedCategories, categoryId])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Select value={viewMode} onValueChange={(value: "all" | "selected" | "total") => setViewMode(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar vista" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="total">Coste Total</SelectItem>
            <SelectItem value="all">Todas las Categorías</SelectItem>
            <SelectItem value="selected">Categorías Seleccionadas</SelectItem>
          </SelectContent>
        </Select>

        {viewMode === "selected" && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-3 py-1 text-xs rounded-full ${
                  selectedCategories.includes(category.id)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
                onClick={() => handleCategoryToggle(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-[400px]">
        {viewMode === "total" ? (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={totalCostTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" unit="%" domain={[0, 100]} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "Porcentaje") return [`${value}%`, name]
                  return [`${Number(value).toLocaleString("es-ES")} €`, name]
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="value" name="Coste Total" fill="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="percentage" name="Porcentaje" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${Number(value).toLocaleString("es-ES")} €`]} />
              <Legend />
              {(viewMode === "all" ? categories : categories.filter((c) => selectedCategories.includes(c.id))).map(
                (category) => (
                  <Line
                    key={category.id}
                    type="monotone"
                    dataKey={category.id}
                    name={category.name}
                    stroke={category.color}
                    activeDot={{ r: 8 }}
                  />
                ),
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
