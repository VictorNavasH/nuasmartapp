import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SectorComparison } from "@/components/costs/sector-comparison"
import { CostTrends } from "@/components/costs/cost-trends"
import { analysis, categories, sectorStandardData } from "@/lib/cost-data"
import { CustomPieChart } from "@/components/charts/pie-chart"

export default function AnalisisCostes() {
  // Preparar datos para el gráfico de pastel
  const pieChartData = analysis.categoryBreakdown.map((item) => ({
    name: categories.find((c) => c.id === item.category)?.name || item.category,
    value: item.percentage,
  }))

  return (
    <div className="space-y-6">
      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-t-4 border-t-[#7BDFF2]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Costes Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("es-ES", {
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 0,
                }).format(analysis.totalCosts)}
              </div>
              <div className="flex items-center text-red-500">
                <span className="text-xs">+2.8%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{analysis.costPercentage}% sobre ventas</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[#B2F7EF]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Prime Coste</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">32.5%</div>
              <div className="flex items-center text-red-500">
                <span className="text-xs">+1.8%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Comida + Bebida</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[#EFF7F6]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Coste de Personal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">28.7%</div>
              <div className="flex items-center text-red-500">
                <span className="text-xs">+2.1%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs. 26% objetivo</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[#F7D6E0]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Margen Bruto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">38.8%</div>
              <div className="flex items-center text-green-500">
                <span className="text-xs">+0.5%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {new Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }).format(38800)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tendencias" className="w-[100%]">
        <TabsList>
          <TabsTrigger value="tendencias">Tendencias</TabsTrigger>
          <TabsTrigger value="comparativa">Comparativa Sectorial</TabsTrigger>
          <TabsTrigger value="detalle">Detalle</TabsTrigger>
        </TabsList>

        <TabsContent value="tendencias" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendencias de Costes</CardTitle>
              <CardDescription>Evolución de los costes a lo largo del tiempo</CardDescription>
            </CardHeader>
            <CardContent>
              <CostTrends
                trendsData={analysis.monthlyCosts}
                categories={categories}
                totalCostTrend={analysis.totalCostTrend}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparativa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparativa Sectorial</CardTitle>
              <CardDescription>Comparación de tus costes con los estándares del sector</CardDescription>
            </CardHeader>
            <CardContent>
              <SectorComparison
                restaurantData={analysis.categoryBreakdown}
                sectorData={sectorStandardData}
                categories={categories}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detalle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Costes</CardTitle>
              <CardDescription>Desglose porcentual por categoría</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-full max-w-3xl">
                <CustomPieChart title="" data={pieChartData} colors={categories.map((cat) => cat.color)} height={350} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Principales Categorías</CardTitle>
              <CardDescription>Categorías con mayor impacto en los costes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysis.categoryBreakdown
                  .sort((a, b) => b.percentage - a.percentage)
                  .slice(0, 6)
                  .map((item, index) => {
                    const category = categories.find((c) => c.id === item.category)
                    return (
                      <div key={index} className="space-y-2 bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: category?.color || "#e2e8f0" }}
                            />
                            <span className="font-medium">{category?.name || item.category}</span>
                          </div>
                          <span className="text-sm font-semibold">{item.percentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${item.percentage}%`,
                              backgroundColor: category?.color || "#e2e8f0",
                            }}
                          />
                        </div>
                        <div className="text-right font-medium">
                          {new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "EUR",
                            maximumFractionDigits: 0,
                          }).format(item.value)}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumen de Costes</CardTitle>
              <CardDescription>Análisis detallado de la estructura de costes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Coste Total</p>
                  <p className="text-2xl font-bold">{analysis.totalCosts.toLocaleString("es-ES")} €</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Porcentaje sobre Ventas</p>
                  <p className="text-2xl font-bold">{analysis.costPercentage}%</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Ventas Totales</p>
                  <p className="text-2xl font-bold">{analysis.totalRevenue.toLocaleString("es-ES")} €</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
