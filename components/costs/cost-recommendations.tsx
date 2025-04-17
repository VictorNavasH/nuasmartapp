"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, DollarSign } from "lucide-react"

interface Recommendation {
  category: string
  title: string
  description: string
  potentialSavings: number
  priority: string
}

interface CostRecommendationsProps {
  recommendations: Recommendation[]
  categories: { id: string; name: string; color: string }[]
}

export function CostRecommendations({ recommendations, categories }: CostRecommendationsProps) {
  // Formatear moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Obtener color de categoría
  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    return category?.color || "#888888"
  }

  // Obtener nombre de categoría
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    return category?.name || categoryId
  }

  // Obtener color de prioridad
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "alta":
        return "bg-red-100 text-red-800"
      case "media":
        return "bg-yellow-100 text-yellow-800"
      case "baja":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        <h3 className="text-lg font-medium">Recomendaciones para optimizar costes</h3>
      </div>

      {recommendations.map((recommendation, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="h-1" style={{ backgroundColor: getCategoryColor(recommendation.category) }}></div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base">{recommendation.title}</CardTitle>
                <CardDescription>{getCategoryName(recommendation.category)}</CardDescription>
              </div>
              <Badge className={getPriorityColor(recommendation.priority)}>Prioridad {recommendation.priority}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">{recommendation.description}</p>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm font-medium">Ahorro potencial</span>
              </div>
              <span className="font-bold text-green-600">{formatCurrency(recommendation.potentialSavings)}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
