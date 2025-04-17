"use client"

import { TrendIndicator } from "@/components/stats/trend-indicator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, TrendingDown, TrendingUp, Target, Users, ShoppingCart } from "lucide-react"

interface CostKPIsProps {
  kpis: {
    foodCostRatio: number
    beverageCostRatio: number
    laborCostRatio: number
    primeCosteRatio: number
    salesPerLaborHour: number
    coversPerLaborHour: number
    averageCheck: number
    costTrend: number
    foodCostTrend: number
    laborCostTrend: number
    foodCostTarget: number
    foodCostVariance: number
    laborCostTarget: number
    laborCostVariance: number
    revenuePerSquareMeter: number
    costPerSquareMeter: number
    grossProfit: number
    grossProfitMargin: number
    operatingProfit: number
    operatingProfitMargin: number
    inventoryTurnover: number
    daysInventoryOutstanding: number
    industryAvgFoodCost: number
    industryAvgLaborCost: number
    industryAvgRentCost: number
  }
}

export function CostKPIs({ kpis }: CostKPIsProps) {
  // Formatear moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="ratios" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ratios">Ratios de Costes</TabsTrigger>
          <TabsTrigger value="efficiency">Eficiencia</TabsTrigger>
          <TabsTrigger value="targets">Objetivos</TabsTrigger>
          <TabsTrigger value="profitability">Rentabilidad</TabsTrigger>
        </TabsList>

        <TabsContent value="ratios" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-t-4 border-t-[#FF6384]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Coste de Comida</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{kpis.foodCostRatio}%</div>
                  <TrendIndicator value={kpis.foodCostTrend} reverseColors />
                </div>
                <p className="text-xs text-muted-foreground mt-1">vs. {kpis.industryAvgFoodCost}% media del sector</p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#36A2EB]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Coste de Bebida</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{kpis.beverageCostRatio}%</div>
                  <div className="flex items-center text-green-500">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span className="text-xs">-0.2%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Estable en los últimos 3 meses</p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#FFCE56]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Coste de Personal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{kpis.laborCostRatio}%</div>
                  <TrendIndicator value={kpis.laborCostTrend} reverseColors />
                </div>
                <p className="text-xs text-muted-foreground mt-1">vs. {kpis.industryAvgLaborCost}% media del sector</p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#4BC0C0]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Prime Coste</CardTitle>
                <CardDescription className="text-xs">Comida + Bebida</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{kpis.primeCosteRatio}%</div>
                  <TrendIndicator value={1.8} reverseColors />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Objetivo: 21.5%</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Ventas por Hora</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{formatCurrency(kpis.salesPerLaborHour)}</div>
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">+3.2%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Por hora trabajada</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Clientes por Hora</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{kpis.coversPerLaborHour}</div>
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">+1.5%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Por hora trabajada</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Rotación de Inventario</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{kpis.inventoryTurnover.toFixed(1)}x</div>
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">+0.8x</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Mensual</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Días de Inventario</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{kpis.daysInventoryOutstanding.toFixed(1)}</div>
                  <div className="flex items-center text-green-500">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span className="text-xs">-0.5</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Promedio de días</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="targets" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Objetivos de Coste de Comida</CardTitle>
                <CardDescription>Comparación con el objetivo establecido</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Objetivo</span>
                    </div>
                    <span className="font-medium">{kpis.foodCostTarget}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Actual</span>
                    </div>
                    <span className="font-medium">{kpis.foodCostRatio}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ArrowUpRight className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Desviación</span>
                    </div>
                    <span className={`font-medium ${kpis.foodCostVariance > 0 ? "text-red-500" : "text-green-500"}`}>
                      {kpis.foodCostVariance > 0 ? "+" : ""}
                      {kpis.foodCostVariance}%
                    </span>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between mb-1 text-xs">
                      <span>Progreso hacia objetivo</span>
                      <span className={kpis.foodCostVariance > 0 ? "text-red-500" : "text-green-500"}>
                        {kpis.foodCostVariance > 0
                          ? `${(100 - (kpis.foodCostVariance / kpis.foodCostTarget) * 100).toFixed(1)}%`
                          : "100%"}
                      </span>
                    </div>
                    <Progress
                      value={
                        kpis.foodCostVariance > 0 ? 100 - (kpis.foodCostVariance / kpis.foodCostTarget) * 100 : 100
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Objetivos de Coste de Personal</CardTitle>
                <CardDescription>Comparación con el objetivo establecido</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Objetivo</span>
                    </div>
                    <span className="font-medium">{kpis.laborCostTarget}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Actual</span>
                    </div>
                    <span className="font-medium">{kpis.laborCostRatio}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ArrowUpRight className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Desviación</span>
                    </div>
                    <span className={`font-medium ${kpis.laborCostVariance > 0 ? "text-red-500" : "text-green-500"}`}>
                      {kpis.laborCostVariance > 0 ? "+" : ""}
                      {kpis.laborCostVariance}%
                    </span>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between mb-1 text-xs">
                      <span>Progreso hacia objetivo</span>
                      <span className={kpis.laborCostVariance > 0 ? "text-red-500" : "text-green-500"}>
                        {kpis.laborCostVariance > 0
                          ? `${(100 - (kpis.laborCostVariance / kpis.laborCostTarget) * 100).toFixed(1)}%`
                          : "100%"}
                      </span>
                    </div>
                    <Progress
                      value={
                        kpis.laborCostVariance > 0 ? 100 - (kpis.laborCostVariance / kpis.laborCostTarget) * 100 : 100
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profitability" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-t-4 border-t-green-400">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Beneficio Bruto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{formatCurrency(kpis.grossProfit)}</div>
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">+2.5%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Margen: {kpis.grossProfitMargin}%</p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Beneficio Operativo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{formatCurrency(kpis.operatingProfit)}</div>
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">+1.8%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Margen: {kpis.operatingProfitMargin}%</p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-blue-400">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Ventas por m²</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{formatCurrency(kpis.revenuePerSquareMeter)}</div>
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">+3.2%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Mensual</p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-blue-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Coste por m²</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{formatCurrency(kpis.costPerSquareMeter)}</div>
                  <div className="flex items-center text-red-500">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">+2.1%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Mensual</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
