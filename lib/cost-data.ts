// Datos de ejemplo para la estructura de costes

export const categories = [
  { id: "food", name: "Comida", color: "#FF6384" },
  { id: "beverage", name: "Bebida", color: "#36A2EB" },
  { id: "labor", name: "Personal", color: "#FFCE56" },
  { id: "rent", name: "Alquiler", color: "#4BC0C0" },
  { id: "utilities", name: "Suministros", color: "#9966FF" },
  { id: "marketing", name: "Marketing", color: "#FF9F40" },
  { id: "insurance", name: "Seguros", color: "#C9CBCF" },
  { id: "software", name: "Software", color: "#7BC043" },
  { id: "maintenance", name: "Mantenimiento", color: "#F37735" },
  { id: "other", name: "Otros", color: "#8D8D8D" },
]

export const analysis = {
  totalCosts: 45000,
  totalRevenue: 100000,
  costPercentage: 45,
  categoryBreakdown: [
    { category: "food", value: 15000, percentage: 33.33 },
    { category: "beverage", value: 7500, percentage: 16.67 },
    { category: "labor", value: 12000, percentage: 26.67 },
    { category: "rent", value: 5000, percentage: 11.11 },
    { category: "utilities", value: 1500, percentage: 3.33 },
    { category: "marketing", value: 1000, percentage: 2.22 },
    { category: "insurance", value: 800, percentage: 1.78 },
    { category: "software", value: 700, percentage: 1.56 },
    { category: "maintenance", value: 1000, percentage: 2.22 },
    { category: "other", value: 500, percentage: 1.11 },
  ],
  monthlyCosts: [
    {
      month: "Ene",
      food: 14000,
      beverage: 7000,
      labor: 11500,
      rent: 5000,
      utilities: 1400,
      marketing: 900,
      insurance: 800,
      software: 700,
      maintenance: 950,
      other: 450,
    },
    {
      month: "Feb",
      food: 14500,
      beverage: 7200,
      labor: 11800,
      rent: 5000,
      utilities: 1450,
      marketing: 950,
      insurance: 800,
      software: 700,
      maintenance: 980,
      other: 470,
    },
    {
      month: "Mar",
      food: 15000,
      beverage: 7500,
      labor: 12000,
      rent: 5000,
      utilities: 1500,
      marketing: 1000,
      insurance: 800,
      software: 700,
      maintenance: 1000,
      other: 500,
    },
    {
      month: "Abr",
      food: 15200,
      beverage: 7600,
      labor: 12100,
      rent: 5000,
      utilities: 1520,
      marketing: 1020,
      insurance: 800,
      software: 700,
      maintenance: 1020,
      other: 510,
    },
    {
      month: "May",
      food: 15500,
      beverage: 7700,
      labor: 12300,
      rent: 5000,
      utilities: 1550,
      marketing: 1050,
      insurance: 800,
      software: 700,
      maintenance: 1050,
      other: 520,
    },
    {
      month: "Jun",
      food: 16000,
      beverage: 8000,
      labor: 12500,
      rent: 5000,
      utilities: 1600,
      marketing: 1100,
      insurance: 800,
      software: 700,
      maintenance: 1100,
      other: 550,
    },
  ],
  totalCostTrend: [
    { month: "Ene", value: 42700, percentage: 42.7 },
    { month: "Feb", value: 43850, percentage: 43.85 },
    { month: "Mar", value: 45000, percentage: 45.0 },
    { month: "Abr", value: 45470, percentage: 45.47 },
    { month: "May", value: 46170, percentage: 46.17 },
    { month: "Jun", value: 47350, percentage: 47.35 },
  ],
  // KPIs y métricas adicionales
  kpis: {
    // Ratios de costes
    foodCostRatio: 15.0, // % sobre ventas
    beverageCostRatio: 7.5, // % sobre ventas
    laborCostRatio: 12.0, // % sobre ventas
    primeCosteRatio: 22.5, // Comida + Bebida

    // Eficiencia operativa
    salesPerLaborHour: 42.5, // Ventas por hora trabajada
    coversPerLaborHour: 3.2, // Clientes atendidos por hora trabajada
    averageCheck: 28.5, // Ticket medio por cliente

    // Tendencias
    costTrend: 2.8, // % de incremento en costes totales
    foodCostTrend: 3.5, // % de incremento en costes de comida
    laborCostTrend: 2.1, // % de incremento en costes de personal

    // Objetivos y desviaciones
    foodCostTarget: 14.0, // Objetivo de coste de comida %
    foodCostVariance: 1.0, // Desviación respecto al objetivo
    laborCostTarget: 11.0, // Objetivo de coste de personal %
    laborCostVariance: 1.0, // Desviación respecto al objetivo

    // Métricas de productividad
    revenuePerSquareMeter: 320, // Ventas por metro cuadrado
    costPerSquareMeter: 144, // Coste por metro cuadrado

    // Métricas de rentabilidad
    grossProfit: 55000, // Beneficio bruto
    grossProfitMargin: 55.0, // Margen de beneficio bruto %
    operatingProfit: 25000, // Beneficio operativo
    operatingProfitMargin: 25.0, // Margen de beneficio operativo %

    // Métricas de eficiencia
    inventoryTurnover: 12.5, // Rotación de inventario
    daysInventoryOutstanding: 7.2, // Días de inventario pendiente

    // Comparativas sectoriales
    industryAvgFoodCost: 14.0, // Media del sector en coste de comida %
    industryAvgLaborCost: 11.0, // Media del sector en coste de personal %
    industryAvgRentCost: 5.0, // Media del sector en coste de alquiler %
  },
  // Datos históricos para análisis de tendencias
  historicalData: {
    // Costes totales por año
    yearlyTotalCosts: [
      { year: 2021, value: 480000 },
      { year: 2022, value: 510000 },
      { year: 2023, value: 540000 },
      { year: 2024, value: 568200 }, // Proyección basada en datos actuales
    ],
    // Ratios de costes por año
    yearlyRatios: [
      {
        year: 2021,
        food: 14.2,
        beverage: 7.1,
        labor: 11.5,
        rent: 5.0,
        utilities: 3.0,
        marketing: 2.0,
        other: 6.2,
      },
      {
        year: 2022,
        food: 14.5,
        beverage: 7.2,
        labor: 11.8,
        rent: 5.0,
        utilities: 3.1,
        marketing: 2.1,
        other: 6.3,
      },
      {
        year: 2023,
        food: 14.8,
        beverage: 7.4,
        labor: 12.0,
        rent: 5.0,
        utilities: 3.2,
        marketing: 2.2,
        other: 6.4,
      },
      {
        year: 2024,
        food: 15.0,
        beverage: 7.5,
        labor: 12.0,
        rent: 5.0,
        utilities: 3.3,
        marketing: 2.2,
        other: 6.5,
      },
    ],
  },
  // Recomendaciones basadas en el análisis
  recommendations: [
    {
      category: "food",
      title: "Optimizar costes de comida",
      description: "Los costes de comida están un 1% por encima del objetivo. Revisar proveedores y negociar precios.",
      potentialSavings: 10000,
      priority: "alta",
    },
    {
      category: "labor",
      title: "Mejorar planificación de personal",
      description: "Optimizar horarios según afluencia para reducir horas improductivas.",
      potentialSavings: 8000,
      priority: "media",
    },
    {
      category: "utilities",
      title: "Reducir consumo energético",
      description: "Implementar medidas de eficiencia energética para reducir costes de suministros.",
      potentialSavings: 3000,
      priority: "baja",
    },
  ],
}

export const sectorStandardData = [
  { category: "food", average: 30.0, min: 28.0, max: 32.0 },
  { category: "beverage", average: 15.0, min: 13.0, max: 17.0 },
  { category: "labor", average: 30.0, min: 28.0, max: 32.0 },
  { category: "rent", average: 10.0, min: 8.0, max: 12.0 },
  { category: "utilities", average: 3.0, min: 2.5, max: 3.5 },
  { category: "marketing", average: 3.0, min: 2.0, max: 4.0 },
  { category: "insurance", average: 2.0, min: 1.5, max: 2.5 },
  { category: "software", average: 1.5, min: 1.0, max: 2.0 },
  { category: "maintenance", average: 3.0, min: 2.0, max: 4.0 },
  { category: "other", average: 2.5, min: 1.5, max: 3.5 },
]
