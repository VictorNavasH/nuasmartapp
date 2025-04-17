// Tipos para la estructura de costes
export interface CostItem {
  id: string
  name: string
  amount: number
  category: string
  subcategory?: string
  isFixed: boolean
  periodicity: "monthly" | "quarterly" | "annual" | "oneTime"
  notes?: string
  lastUpdated: Date
}

export interface CostCategory {
  id: string
  name: string
  subcategories: string[]
  color: string
  icon?: string
  isEditable: boolean
}

export interface CostAnalysis {
  totalCosts: number
  fixedCosts: number
  variableCosts: number
  fixedPercentage: number
  variablePercentage: number
  categoriesBreakdown: {
    category: string
    amount: number
    percentage: number
  }[]
  monthlyAverage: number
  annualProjection: number
}
