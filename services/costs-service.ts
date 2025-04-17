import type { CostItem, CostCategory, CostAnalysis } from "@/types/costs"
import { v4 as uuidv4 } from "uuid"

// Datos predefinidos para categorías
const defaultCategories: CostCategory[] = [
  {
    id: "cat-1",
    name: "Personal",
    subcategories: ["Salarios", "Seguridad Social", "Formación", "Bonificaciones"],
    color: "#02b1c4",
    isEditable: false,
  },
  {
    id: "cat-2",
    name: "Instalaciones",
    subcategories: ["Alquiler", "Mantenimiento", "Seguros", "Impuestos"],
    color: "#fe6d73",
    isEditable: false,
  },
  {
    id: "cat-3",
    name: "Suministros",
    subcategories: ["Electricidad", "Agua", "Gas", "Internet", "Teléfono"],
    color: "#ffce85",
    isEditable: false,
  },
  {
    id: "cat-4",
    name: "Materia Prima",
    subcategories: ["Comida", "Bebida", "Productos de limpieza"],
    color: "#edadff",
    isEditable: false,
  },
  {
    id: "cat-5",
    name: "Marketing",
    subcategories: ["Publicidad", "Promociones", "Redes sociales", "Eventos"],
    color: "#17c3b2",
    isEditable: false,
  },
  {
    id: "cat-6",
    name: "Software",
    subcategories: ["Licencias", "Suscripciones", "Mantenimiento"],
    color: "#227c9d",
    isEditable: false,
  },
  {
    id: "cat-7",
    name: "Financieros",
    subcategories: ["Intereses", "Comisiones bancarias", "Seguros financieros"],
    color: "#ff4797",
    isEditable: false,
  },
  {
    id: "cat-8",
    name: "Otros",
    subcategories: ["Varios", "Imprevistos"],
    color: "#364f6b",
    isEditable: false,
  },
]

// Datos predefinidos para costes
const defaultCosts: CostItem[] = [
  {
    id: "cost-1",
    name: "Alquiler local",
    amount: 3500,
    category: "Instalaciones",
    subcategory: "Alquiler",
    isFixed: true,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-2",
    name: "Salarios personal cocina",
    amount: 12000,
    category: "Personal",
    subcategory: "Salarios",
    isFixed: true,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-3",
    name: "Salarios personal sala",
    amount: 10000,
    category: "Personal",
    subcategory: "Salarios",
    isFixed: true,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-4",
    name: "Seguridad Social",
    amount: 7000,
    category: "Personal",
    subcategory: "Seguridad Social",
    isFixed: true,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-5",
    name: "Electricidad",
    amount: 1200,
    category: "Suministros",
    subcategory: "Electricidad",
    isFixed: false,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-6",
    name: "Agua",
    amount: 450,
    category: "Suministros",
    subcategory: "Agua",
    isFixed: false,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-7",
    name: "Gas",
    amount: 850,
    category: "Suministros",
    subcategory: "Gas",
    isFixed: false,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-8",
    name: "Internet y teléfono",
    amount: 120,
    category: "Suministros",
    subcategory: "Internet",
    isFixed: true,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-9",
    name: "Compra de alimentos",
    amount: 15000,
    category: "Materia Prima",
    subcategory: "Comida",
    isFixed: false,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-10",
    name: "Compra de bebidas",
    amount: 8000,
    category: "Materia Prima",
    subcategory: "Bebida",
    isFixed: false,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-11",
    name: "Productos de limpieza",
    amount: 600,
    category: "Materia Prima",
    subcategory: "Productos de limpieza",
    isFixed: false,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-12",
    name: "Publicidad en redes sociales",
    amount: 500,
    category: "Marketing",
    subcategory: "Redes sociales",
    isFixed: true,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-13",
    name: "Eventos promocionales",
    amount: 1200,
    category: "Marketing",
    subcategory: "Eventos",
    isFixed: false,
    periodicity: "quarterly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-14",
    name: "Software TPV",
    amount: 150,
    category: "Software",
    subcategory: "Suscripciones",
    isFixed: true,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-15",
    name: "Software contabilidad",
    amount: 80,
    category: "Software",
    subcategory: "Suscripciones",
    isFixed: true,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-16",
    name: "Intereses préstamo",
    amount: 450,
    category: "Financieros",
    subcategory: "Intereses",
    isFixed: true,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-17",
    name: "Comisiones bancarias",
    amount: 120,
    category: "Financieros",
    subcategory: "Comisiones bancarias",
    isFixed: false,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-18",
    name: "Seguros",
    amount: 350,
    category: "Instalaciones",
    subcategory: "Seguros",
    isFixed: true,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-19",
    name: "Mantenimiento local",
    amount: 300,
    category: "Instalaciones",
    subcategory: "Mantenimiento",
    isFixed: false,
    periodicity: "monthly",
    lastUpdated: new Date(),
  },
  {
    id: "cost-20",
    name: "Impuestos locales",
    amount: 800,
    category: "Instalaciones",
    subcategory: "Impuestos",
    isFixed: true,
    periodicity: "quarterly",
    lastUpdated: new Date(),
  },
]

// Datos estándar del sector para comparación
export const sectorStandardData = {
  Personal: 35,
  Instalaciones: 15,
  Suministros: 8,
  "Materia Prima": 30,
  Marketing: 5,
  Software: 2,
  Financieros: 3,
  Otros: 2,
}

// Clase de servicio para gestionar los costes
export class CostsService {
  private costs: CostItem[]
  private categories: CostCategory[]
  private previousAnalysis: CostAnalysis | null = null

  constructor() {
    // Inicializar con datos predefinidos o cargar desde localStorage
    this.costs = this.loadCosts()
    this.categories = this.loadCategories()
  }

  // Cargar costes desde localStorage o usar predefinidos
  private loadCosts(): CostItem[] {
    try {
      const storedCosts = localStorage.getItem("nua_costs")
      if (storedCosts) {
        const parsedCosts = JSON.parse(storedCosts)
        // Convertir strings de fecha a objetos Date
        return parsedCosts.map((cost: any) => ({
          ...cost,
          lastUpdated: new Date(cost.lastUpdated),
        }))
      }
    } catch (error) {
      console.error("Error al cargar costes:", error)
    }
    return [...defaultCosts]
  }

  // Cargar categorías desde localStorage o usar predefinidas
  private loadCategories(): CostCategory[] {
    try {
      const storedCategories = localStorage.getItem("nua_cost_categories")
      if (storedCategories) {
        return JSON.parse(storedCategories)
      }
    } catch (error) {
      console.error("Error al cargar categorías:", error)
    }
    return [...defaultCategories]
  }

  // Guardar costes en localStorage
  private saveCosts(): void {
    try {
      localStorage.setItem("nua_costs", JSON.stringify(this.costs))
    } catch (error) {
      console.error("Error al guardar costes:", error)
    }
  }

  // Guardar categorías en localStorage
  private saveCategories(): void {
    try {
      localStorage.setItem("nua_cost_categories", JSON.stringify(this.categories))
    } catch (error) {
      console.error("Error al guardar categorías:", error)
    }
  }

  // Obtener todos los costes
  getCosts(): CostItem[] {
    return [...this.costs]
  }

  // Obtener todas las categorías
  getCategories(): CostCategory[] {
    return [...this.categories]
  }

  // Añadir un nuevo coste
  addCost(cost: Omit<CostItem, "id" | "lastUpdated">): CostItem {
    const newCost: CostItem = {
      ...cost,
      id: uuidv4(),
      lastUpdated: new Date(),
    }
    this.costs.push(newCost)
    this.saveCosts()
    return newCost
  }

  // Actualizar un coste existente
  updateCost(cost: CostItem): CostItem {
    const index = this.costs.findIndex((c) => c.id === cost.id)
    if (index !== -1) {
      this.costs[index] = {
        ...cost,
        lastUpdated: new Date(),
      }
      this.saveCosts()
      return this.costs[index]
    }
    throw new Error(`Coste con ID ${cost.id} no encontrado`)
  }

  // Eliminar un coste
  deleteCost(id: string): void {
    this.costs = this.costs.filter((cost) => cost.id !== id)
    this.saveCosts()
  }

  // Añadir una nueva categoría
  addCategory(category: Omit<CostCategory, "id">): CostCategory {
    const newCategory: CostCategory = {
      ...category,
      id: uuidv4(),
    }
    this.categories.push(newCategory)
    this.saveCategories()
    return newCategory
  }

  // Actualizar una categoría existente
  updateCategory(category: CostCategory): CostCategory {
    const index = this.categories.findIndex((c) => c.id === category.id)
    if (index !== -1) {
      // Verificar si la categoría es editable
      if (!this.categories[index].isEditable) {
        throw new Error(`La categoría ${category.name} no es editable`)
      }
      this.categories[index] = category
      this.saveCategories()
      return this.categories[index]
    }
    throw new Error(`Categoría con ID ${category.id} no encontrada`)
  }

  // Eliminar una categoría
  deleteCategory(id: string): void {
    const category = this.categories.find((c) => c.id === id)
    if (!category) {
      throw new Error(`Categoría con ID ${id} no encontrada`)
    }
    if (!category.isEditable) {
      throw new Error(`La categoría ${category.name} no es editable`)
    }

    // Verificar si hay costes asociados a esta categoría
    const associatedCosts = this.costs.filter((cost) => cost.category === category.name)
    if (associatedCosts.length > 0) {
      throw new Error(`No se puede eliminar la categoría porque tiene ${associatedCosts.length} costes asociados`)
    }

    this.categories = this.categories.filter((c) => c.id !== id)
    this.saveCategories()
  }

  // Importar datos
  importData(data: { costs: Omit<CostItem, "id" | "lastUpdated">[]; categories?: Omit<CostCategory, "id">[] }): void {
    // Guardar análisis actual como previo
    this.previousAnalysis = this.analyzeData()

    // Importar costes
    if (data.costs && Array.isArray(data.costs)) {
      const newCosts = data.costs.map((cost) => ({
        ...cost,
        id: uuidv4(),
        lastUpdated: new Date(),
      }))
      this.costs = [...this.costs, ...newCosts]
      this.saveCosts()
    }

    // Importar categorías
    if (data.categories && Array.isArray(data.categories)) {
      const newCategories = data.categories.map((category) => ({
        ...category,
        id: uuidv4(),
        isEditable: true, // Las categorías importadas son editables
      }))
      this.categories = [...this.categories, ...newCategories]
      this.saveCategories()
    }
  }

  // Exportar datos
  exportData(): { costs: CostItem[]; categories: CostCategory[] } {
    return {
      costs: this.costs,
      categories: this.categories,
    }
  }

  // Analizar datos para obtener estadísticas
  analyzeData(): CostAnalysis {
    // Calcular costes totales
    const totalCosts = this.costs.reduce((sum, cost) => {
      // Ajustar según periodicidad para obtener valor mensual
      let monthlyAmount = cost.amount
      if (cost.periodicity === "quarterly") monthlyAmount /= 3
      if (cost.periodicity === "annual") monthlyAmount /= 12
      if (cost.periodicity === "oneTime") monthlyAmount = 0 // No se considera en análisis mensual

      return sum + monthlyAmount
    }, 0)

    // Calcular costes fijos
    const fixedCosts = this.costs
      .filter((cost) => cost.isFixed)
      .reduce((sum, cost) => {
        let monthlyAmount = cost.amount
        if (cost.periodicity === "quarterly") monthlyAmount /= 3
        if (cost.periodicity === "annual") monthlyAmount /= 12
        if (cost.periodicity === "oneTime") monthlyAmount = 0

        return sum + monthlyAmount
      }, 0)

    // Calcular porcentajes
    const fixedPercentage = (fixedCosts / totalCosts) * 100
    const variablePercentage = 100 - fixedPercentage

    // Calcular desglose por categorías
    const categoriesMap = new Map<string, number>()

    this.costs.forEach((cost) => {
      let monthlyAmount = cost.amount
      if (cost.periodicity === "quarterly") monthlyAmount /= 3
      if (cost.periodicity === "annual") monthlyAmount /= 12
      if (cost.periodicity === "oneTime") monthlyAmount = 0

      const currentAmount = categoriesMap.get(cost.category) || 0
      categoriesMap.set(cost.category, currentAmount + monthlyAmount)
    })

    const categoriesBreakdown = Array.from(categoriesMap.entries()).map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / totalCosts) * 100,
    }))

    // Calcular proyección anual
    const annualProjection = totalCosts * 12

    return {
      totalCosts,
      fixedCosts,
      variableCosts: totalCosts - fixedCosts,
      fixedPercentage,
      variablePercentage,
      categoriesBreakdown,
      monthlyAverage: totalCosts,
      annualProjection,
    }
  }

  // Obtener análisis previo
  getPreviousAnalysis(): CostAnalysis | null {
    return this.previousAnalysis
  }

  // Restablecer datos a los valores predeterminados
  resetToDefaults(): void {
    this.costs = [...defaultCosts]
    this.categories = [...defaultCategories]
    this.saveCosts()
    this.saveCategories()
  }

  // Obtener datos de tendencias por categoría
  getTrendsData() {
    // Simulación de datos de tendencias para los últimos 6 meses
    return [
      {
        month: "Ene",
        Personal: 12000,
        Alimentos: 8500,
        Bebidas: 3200,
        Suministros: 1800,
        Alquiler: 4000,
        Marketing: 1200,
      },
      {
        month: "Feb",
        Personal: 11800,
        Alimentos: 8200,
        Bebidas: 3100,
        Suministros: 1750,
        Alquiler: 4000,
        Marketing: 1300,
      },
      {
        month: "Mar",
        Personal: 12200,
        Alimentos: 8800,
        Bebidas: 3300,
        Suministros: 1900,
        Alquiler: 4000,
        Marketing: 1100,
      },
      {
        month: "Abr",
        Personal: 12500,
        Alimentos: 9000,
        Bebidas: 3400,
        Suministros: 2000,
        Alquiler: 4000,
        Marketing: 1250,
      },
      {
        month: "May",
        Personal: 13000,
        Alimentos: 9200,
        Bebidas: 3600,
        Suministros: 2100,
        Alquiler: 4000,
        Marketing: 1400,
      },
      {
        month: "Jun",
        Personal: 13500,
        Alimentos: 9500,
        Bebidas: 3800,
        Suministros: 2200,
        Alquiler: 4000,
        Marketing: 1500,
      },
    ]
  }

  // Obtener datos de tendencia de coste total
  getTotalCostTrend() {
    // Simulación de datos de tendencia de coste total
    return [
      { month: "Ene", total: 30700, percentageOfRevenue: 68 },
      { month: "Feb", total: 30150, percentageOfRevenue: 67 },
      { month: "Mar", total: 31300, percentageOfRevenue: 69 },
      { month: "Abr", total: 32150, percentageOfRevenue: 70 },
      { month: "May", total: 33300, percentageOfRevenue: 71 },
      { month: "Jun", total: 34500, percentageOfRevenue: 72 },
    ]
  }
}

// Exportar una instancia del servicio
export const costsService = new CostsService()
