"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Download, FileText } from "lucide-react"
import { CustomBarChart } from "@/components/charts/bar-chart"

interface FutureForecastProps {
  title: string
  description?: string
  monthlyData: any[]
  quarterlyData: any[]
  yearlyData: any[]
}

export function FutureForecast({ title, description, monthlyData, quarterlyData, yearlyData }: FutureForecastProps) {
  const [timeframe, setTimeframe] = useState<"monthly" | "quarterly" | "yearly">("monthly")

  // Determinar qué datos mostrar según el timeframe seleccionado
  const getData = () => {
    switch (timeframe) {
      case "monthly":
        return monthlyData
      case "quarterly":
        return quarterlyData
      case "yearly":
        return yearlyData
      default:
        return monthlyData
    }
  }

  return (
    <Card className="border-t-4 border-t-[#edadff]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="monthly" onValueChange={(value) => setTimeframe(value as any)}>
          <div className="px-6 pt-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="monthly">Mensual</TabsTrigger>
              <TabsTrigger value="quarterly">Trimestral</TabsTrigger>
              <TabsTrigger value="yearly">Anual</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monthly" className="p-6">
            <CustomBarChart
              title=""
              description=""
              data={monthlyData}
              categories={["ingresos", "gastos", "beneficio"]}
              index="periodo"
              showLegend={true}
              height={300}
            />
          </TabsContent>

          <TabsContent value="quarterly" className="p-6">
            <CustomBarChart
              title=""
              description=""
              data={quarterlyData}
              categories={["ingresos", "gastos", "beneficio"]}
              index="periodo"
              showLegend={true}
              height={300}
            />
          </TabsContent>

          <TabsContent value="yearly" className="p-6">
            <CustomBarChart
              title=""
              description=""
              data={yearlyData}
              categories={["ingresos", "gastos", "beneficio"]}
              index="periodo"
              showLegend={true}
              height={300}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4 bg-muted/20">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>Última actualización: 15 abril 2025</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Ver detalles</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
