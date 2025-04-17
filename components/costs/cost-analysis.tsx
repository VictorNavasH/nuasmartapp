"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CostItem, CostCategory, CostAnalysis } from "@/types/costs"
import { CustomPieChart } from "@/components/charts/pie-chart"
import { CustomBarChart } from "@/components/charts/bar-chart"
import { TrendIndicator } from "@/components/stats/trend-indicator"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, TrendingDown, Calendar } from "lucide-react"

interface CostAnalysisProps {
  costs: CostItem[]
  categories: CostCategory[]
  analysis: CostAnalysis
  previousAnalysis?: CostAnalysis
  standardData?: Record<string, number>
}

export function CostAnalysis({ costs, categories, analysis, previousAnalysis, standardData }: CostAnalysisProps) {
  // Formatear moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Calcular tendencia
  const calculateTrend = (current: number, previous?: number) => {
    if (!previous) return 0
    return ((current - previous) / previous) * 100
  }

  // Preparar datos para el gráfico de pastel
  const pieChartData = analysis.categoriesBreakdown.map((item) => ({
    name: item.category,
    value: item.amount,
  }))

  // Preparar datos para el gráfico de barras de costes fijos vs variables
  const fixedVsVariableData = [
    {
      name: "Distribución",
      fijos: analysis.fixedCosts,
      variables: analysis.totalCosts - analysis.fixedCosts,
    },
  ]

  // Preparar datos para el gráfico de barras de tendencia mensual
  const monthlyTrendData = [
    { month: "Ene", costes: 95000 },
    { month: "Feb", costes: 98000 },
    { month: "Mar", costes: 102000 },
    { month: "Abr", costes: 97000 },
    { month: "May", costes: 99000 },
    { month: "Jun", costes: 103000 },
    { month: "Jul", costes: 105000 },
    { month: "Ago", costes: 108000 },
    { month: "Sep", costes: 104000 },
    { month: "Oct", costes: analysis.totalCosts },
    { month: "Nov", costes: null },
    { month: "Dic", costes: null },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-t-4 border-t-[#7BDFF2]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Costes Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(analysis.totalCosts)}</div>
              {previousAnalysis && (
                <TrendIndicator
                  value={calculateTrend(analysis.totalCosts, previousAnalysis.totalCosts)}
                  reverseColors
                />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Promedio mensual: {formatCurrency(analysis.monthlyAverage)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[#B2F7EF]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Costes Fijos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(analysis.fixedCosts)}</div>
              {previousAnalysis && (
                <TrendIndicator
                  value={calculateTrend(analysis.fixedCosts, previousAnalysis.fixedCosts)}
                  reverseColors
                />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{analysis.fixedPercentage.toFixed(1)}% del total</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[#EFF7F6]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Costes Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(analysis.totalCosts - analysis.fixedCosts)}</div>
              {previousAnalysis && (
                <TrendIndicator
                  value={calculateTrend(
                    analysis.totalCosts - analysis.fixedCosts,
                    previousAnalysis.totalCosts - previousAnalysis.fixedCosts,
                  )}
                  reverseColors
                />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{analysis.variablePercentage.toFixed(1)}% del total</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[#F7D6E0]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Proyección Anual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(analysis.annualProjection)}</div>
              {previousAnalysis && (
                <TrendIndicator
                  value={calculateTrend(analysis.annualProjection, previousAnalysis.annualProjection)}
                  reverseColors
                />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Basado en los costes actuales</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="distribution" className="space-y-4">
        <TabsList>
          <TabsTrigger value="distribution">Distribución de Costes</TabsTrigger>
          <TabsTrigger value="fixed-variable">Fijos vs Variables</TabsTrigger>
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
        </TabsList>

        <TabsContent value="distribution">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Categoría</CardTitle>
                <CardDescription>Desglose de costes por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomPieChart
                  title=""
                  data={pieChartData}
                  standardData={standardData}
                  colors={categories.map((cat) => cat.color)}
                  height={350}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Principales Categorías de Costes</CardTitle>
                <CardDescription>Categorías con mayor impacto en los costes totales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.categoriesBreakdown
                    .sort((a, b) => b.amount - a.amount)
                    .slice(0, 5)
                    .map((category, index) => {
                      const categoryData = categories.find((cat) => cat.name === category.category)
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: categoryData?.color || "#e2e8f0" }}
                              />
                              <span className="font-medium">{category.category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{formatCurrency(category.amount)}</span>
                              <span className="text-sm text-muted-foreground">({category.percentage.toFixed(1)}%)</span>
                            </div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${category.percentage}%`,
                                backgroundColor: categoryData?.color || "#e2e8f0",
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}

                  <Separator />

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Otras categorías</span>
                    <span className="font-medium">
                      {formatCurrency(
                        analysis.categoriesBreakdown
                          .sort((a, b) => b.amount - a.amount)
                          .slice(5)
                          .reduce((sum, cat) => sum + cat.amount, 0),
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fixed-variable">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Costes Fijos vs Variables</CardTitle>
                <CardDescription>Proporción de costes fijos y variables</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomBarChart
                  title=""
                  data={fixedVsVariableData}
                  categories={["fijos", "variables"]}
                  index="name"
                  colors={["#02b1c4", "#fe6d73"]}
                  height={350}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análisis de Costes Fijos</CardTitle>
                <CardDescription>Desglose de los principales costes fijos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costs
                    .filter((cost) => cost.isFixed)
                    .sort((a, b) => b.amount - a.amount)
                    .slice(0, 5)
                    .map((cost, index) => {
                      const categoryData = categories.find((cat) => cat.name === cost.category)
                      const percentage = (cost.amount / analysis.fixedCosts) * 100
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: categoryData?.color || "#e2e8f0" }}
                              />
                              <span className="font-medium">{cost.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{formatCurrency(cost.amount)}</span>
                              <span className="text-sm text-muted-foreground">({percentage.toFixed(1)}%)</span>
                            </div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: categoryData?.color || "#e2e8f0",
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}

                  <Separator />

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Otros costes fijos</span>
                    <span className="font-medium">
                      {formatCurrency(
                        costs
                          .filter((cost) => cost.isFixed)
                          .sort((a, b) => b.amount - a.amount)
                          .slice(5)
                          .reduce((sum, cost) => sum + cost.amount, 0),
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tendencia Mensual de Costes</CardTitle>
                <CardDescription>Evolución de los costes totales</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomBarChart
                  title=""
                  data={monthlyTrendData}
                  categories={["costes"]}
                  index="month"
                  colors={["#02b1c4"]}
                  height={350}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análisis de Tendencias</CardTitle>
                <CardDescription>Cambios significativos en los costes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#EFF7F6] rounded-full">
                      <TrendingUp className="h-5 w-5 text-[#17c3b2]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Tendencia general</h3>
                      <p className="text-sm text-muted-foreground">
                        Los costes totales han{" "}
                        {previousAnalysis && analysis.totalCosts > previousAnalysis.totalCosts
                          ? "aumentado"
                          : "disminuido"}{" "}
                        un{" "}
                        {previousAnalysis
                          ? Math.abs(calculateTrend(analysis.totalCosts, previousAnalysis.totalCosts)).toFixed(1)
                          : "0"}
                        % respecto al período anterior.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F7D6E0]/30 rounded-full">
                      <TrendingDown className="h-5 w-5 text-[#fe6d73]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Mayor incremento</h3>
                      <p className="text-sm text-muted-foreground">
                        La categoría con mayor incremento es <span className="font-medium">Personal</span> con un
                        aumento del <span className="font-medium">8.3%</span>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#EFF7F6] rounded-full">
                      <TrendingUp className="h-5 w-5 text-[#17c3b2]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Mayor reducción</h3>
                      <p className="text-sm text-muted-foreground">
                        La categoría con mayor reducción es <span className="font-medium">Suministros</span> con una
                        disminución del <span className="font-medium">5.2%</span>.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#edadff]/20 rounded-full">
                      <Calendar className="h-5 w-5 text-[#edadff]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Proyección</h3>
                      <p className="text-sm text-muted-foreground">
                        Si la tendencia continúa, los costes anuales serán de{" "}
                        <span className="font-medium">{formatCurrency(analysis.annualProjection)}</span>, un{" "}
                        {previousAnalysis
                          ? calculateTrend(analysis.annualProjection, previousAnalysis.annualProjection) > 0
                            ? "aumento"
                            : "descenso"
                          : "cambio"}{" "}
                        del{" "}
                        {previousAnalysis
                          ? Math.abs(
                              calculateTrend(analysis.annualProjection, previousAnalysis.annualProjection),
                            ).toFixed(1)
                          : "0"}
                        % respecto al año anterior.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
