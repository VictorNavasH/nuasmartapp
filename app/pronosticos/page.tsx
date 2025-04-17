"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { financialMetrics } from "@/lib/mock-data"
import { ForecastComparisonChart } from "@/components/charts/forecast-comparison-chart"
import { KpiTracker } from "@/components/forecast/kpi-tracker"
import { DeviationAnalysis } from "@/components/forecast/deviation-analysis"
import { FutureForecast } from "@/components/forecast/future-forecast"
import { Calendar, FileText, AlertTriangle, TrendingUp, Lightbulb, ArrowRight } from "lucide-react"

// Datos para la sección de previsión y seguimiento
const datosComparativaVentas = [
  { mes: "Ene", real: 45000, prevision: 42000 },
  { mes: "Feb", real: 48000, prevision: 45000 },
  { mes: "Mar", real: 52000, prevision: 50000 },
  { mes: "Abr", real: 49000, prevision: 52000 },
  { mes: "May", real: 53000, prevision: 54000 },
  { mes: "Jun", real: 58000, prevision: 56000 },
  { mes: "Jul", real: 62000, prevision: 58000 },
  { mes: "Ago", real: 65000, prevision: 60000 },
  { mes: "Sep", real: 59000, prevision: 57000 },
  { mes: "Oct", real: 56000, prevision: 55000 },
  { mes: "Nov", real: null, prevision: 53000 },
  { mes: "Dic", real: null, prevision: 51000 },
]

const datosComparativaOcupacion = [
  { mes: "Ene", real: 65, prevision: 62 },
  { mes: "Feb", real: 68, prevision: 65 },
  { mes: "Mar", real: 72, prevision: 70 },
  { mes: "Abr", real: 70, prevision: 72 },
  { mes: "May", real: 74, prevision: 75 },
  { mes: "Jun", real: 78, prevision: 76 },
  { mes: "Jul", real: 82, prevision: 78 },
  { mes: "Ago", real: 85, prevision: 80 },
  { mes: "Sep", real: 80, prevision: 78 },
  { mes: "Oct", real: 78, prevision: 76 },
  { mes: "Nov", real: null, prevision: 74 },
  { mes: "Dic", real: null, prevision: 72 },
]

const kpisActuales = [
  {
    name: "Ingresos mensuales",
    target: 60000,
    current: 56000,
    unit: "€",
    trend: 3.5,
    status: "warning",
  },
  {
    name: "Ocupación media",
    target: 80,
    current: 78,
    unit: "%",
    trend: 2.1,
    status: "success",
  },
  {
    name: "Ticket medio",
    target: 32,
    current: 28.5,
    unit: "€",
    trend: -1.2,
    status: "warning",
  },
  {
    name: "Margen bruto",
    target: 70,
    current: 67.5,
    unit: "%",
    trend: 0.8,
    status: "success",
  },
  {
    name: "Reducción costes fijos",
    target: -5,
    current: -2.3,
    unit: "%",
    trend: -2.3,
    status: "danger",
  },
]

const datosDesviaciones = [
  {
    category: "Ingresos",
    forecast: 55000,
    actual: 56000,
    unit: "€",
    impact: "positive",
    notes: "Mayor afluencia en fines de semana",
  },
  {
    category: "Costes de personal",
    forecast: 18000,
    actual: 19200,
    unit: "€",
    impact: "negative",
    notes: "Horas extra no previstas",
  },
  {
    category: "Costes de materias primas",
    forecast: 16500,
    actual: 15800,
    unit: "€",
    impact: "positive",
    notes: "Mejora en negociación con proveedores",
  },
  {
    category: "Ocupación",
    forecast: 76,
    actual: 78,
    unit: "%",
    impact: "positive",
    notes: "Promociones efectivas",
  },
  {
    category: "Ticket medio",
    forecast: 29.5,
    actual: 28.5,
    unit: "€",
    impact: "negative",
    notes: "Menor consumo de bebidas",
  },
]

const previsionesMensuales = [
  { periodo: "Nov '25", ingresos: 53000, gastos: 41000, beneficio: 12000 },
  { periodo: "Dic '25", ingresos: 51000, gastos: 40000, beneficio: 11000 },
  { periodo: "Ene '26", ingresos: 47000, gastos: 38000, beneficio: 9000 },
  { periodo: "Feb '26", ingresos: 50000, gastos: 39000, beneficio: 11000 },
  { periodo: "Mar '26", ingresos: 54000, gastos: 42000, beneficio: 12000 },
  { periodo: "Abr '26", ingresos: 56000, gastos: 43000, beneficio: 13000 },
]

const previsionesTrimestral = [
  { periodo: "Q4 2025", ingresos: 160000, gastos: 124000, beneficio: 36000 },
  { periodo: "Q1 2026", ingresos: 151000, gastos: 119000, beneficio: 32000 },
  { periodo: "Q2 2026", ingresos: 175000, gastos: 134000, beneficio: 41000 },
  { periodo: "Q3 2026", ingresos: 190000, gastos: 143000, beneficio: 47000 },
]

const previsionesAnual = [
  { periodo: "2025", ingresos: 650000, gastos: 507000, beneficio: 143000 },
  { periodo: "2026", ingresos: 715000, gastos: 550000, beneficio: 165000 },
  { periodo: "2027", ingresos: 786000, gastos: 598000, beneficio: 188000 },
]

// Modificar la primera línea del componente PronosticosPage
export default function PronosticosPage() {
  // Estado para la simulación "What if"
  const [simulacion, setSimulacion] = useState({
    incrementoPrecio: 0,
    cambioPersonal: 0,
    diasAbiertos: 26,
    cambioCostesVariables: 0,
    cambioCostesInsumos: 0,
  })

  // Valores calculados para la simulación
  const resultadosSimulacion = {
    beneficioOriginal: financialMetrics.beneficioNeto.value,
    beneficioNuevo: Math.round(
      financialMetrics.beneficioNeto.value *
        (1 + simulacion.incrementoPrecio / 100) *
        (1 - simulacion.cambioPersonal / 100) *
        (simulacion.diasAbiertos / 26) *
        (1 - simulacion.cambioCostesVariables / 100) *
        (1 - simulacion.cambioCostesInsumos / 100),
    ),
    ticketMedioNuevo:
      Math.round(financialMetrics.ticketMedio.value * (1 + simulacion.incrementoPrecio / 100) * 100) / 100,
    ebitdaNuevo: Math.round(
      financialMetrics.ebitda.value *
        (1 + simulacion.incrementoPrecio / 100) *
        (1 - simulacion.cambioPersonal / 100) *
        (simulacion.diasAbiertos / 26) *
        (1 - simulacion.cambioCostesVariables / 100) *
        (1 - simulacion.cambioCostesInsumos / 100),
    ),
  }

  // Calcular la variación porcentual
  const variacionPorcentual = Math.round(
    ((resultadosSimulacion.beneficioNuevo - resultadosSimulacion.beneficioOriginal) /
      resultadosSimulacion.beneficioOriginal) *
      100,
  )

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-secondary-blue">Pronósticos</h2>
      </div>

      <Tabs defaultValue="simulacion" className="space-y-4">
        <TabsList>
          <TabsTrigger value="simulacion">Simulación "What If"</TabsTrigger>
          <TabsTrigger value="prevision">Previsión y Seguimiento</TabsTrigger>
        </TabsList>

        <TabsContent value="simulacion" className="space-y-4">
          <Card className="border-t-4 border-t-primary-light/70">
            <CardHeader>
              <CardTitle>Simulación "What If"</CardTitle>
              <CardDescription>Ajusta los parámetros para ver el impacto en el beneficio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Incremento/reducción de precios (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[simulacion.incrementoPrecio]}
                        min={-20}
                        max={20}
                        step={1}
                        onValueChange={(values) => setSimulacion({ ...simulacion, incrementoPrecio: values[0] })}
                      />
                      <span className="w-12 text-right">{simulacion.incrementoPrecio}%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Cambio en personal (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[simulacion.cambioPersonal]}
                        min={-20}
                        max={20}
                        step={1}
                        onValueChange={(values) => setSimulacion({ ...simulacion, cambioPersonal: values[0] })}
                      />
                      <span className="w-12 text-right">{simulacion.cambioPersonal}%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Días abiertos al mes</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[simulacion.diasAbiertos]}
                        min={20}
                        max={30}
                        step={1}
                        onValueChange={(values) => setSimulacion({ ...simulacion, diasAbiertos: values[0] })}
                      />
                      <span className="w-12 text-right">{simulacion.diasAbiertos}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ajuste en costes variables (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[simulacion.cambioCostesVariables]}
                        min={-20}
                        max={20}
                        step={1}
                        onValueChange={(values) => setSimulacion({ ...simulacion, cambioCostesVariables: values[0] })}
                      />
                      <span className="w-12 text-right">{simulacion.cambioCostesVariables}%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ajuste en costes de insumos (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[simulacion.cambioCostesInsumos]}
                        min={-20}
                        max={20}
                        step={1}
                        onValueChange={(values) => setSimulacion({ ...simulacion, cambioCostesInsumos: values[0] })}
                      />
                      <span className="w-12 text-right">{simulacion.cambioCostesInsumos}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="p-6 bg-muted rounded-lg space-y-6">
                    <h3 className="text-xl font-bold">Resultados de la simulación</h3>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="bg-white p-4 rounded-lg">
                        <div className="text-sm text-text-secondary">Beneficio Neto Original</div>
                        <div className="text-xl font-bold">
                          {new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "EUR",
                            maximumFractionDigits: 0,
                          }).format(resultadosSimulacion.beneficioOriginal)}
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg">
                        <div className="text-sm text-text-secondary">Beneficio Neto Nuevo</div>
                        <div className="text-xl font-bold">
                          {new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "EUR",
                            maximumFractionDigits: 0,
                          }).format(resultadosSimulacion.beneficioNuevo)}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-sm text-text-secondary">Impacto en Beneficio</div>
                      <div
                        className={`text-xl font-bold flex items-center gap-2 ${
                          variacionPorcentual > 0
                            ? "text-success"
                            : variacionPorcentual < 0
                              ? "text-danger"
                              : "text-text-secondary"
                        }`}
                      >
                        {variacionPorcentual > 0 ? "+" : ""}
                        {variacionPorcentual}%
                        <span className="text-sm font-normal text-text-secondary">
                          (
                          {new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "EUR",
                            maximumFractionDigits: 0,
                          }).format(resultadosSimulacion.beneficioNuevo - resultadosSimulacion.beneficioOriginal)}
                          )
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="bg-white p-4 rounded-lg">
                        <div className="text-sm text-text-secondary">Ticket Medio Nuevo</div>
                        <div className="text-xl font-bold">
                          {new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "EUR",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(resultadosSimulacion.ticketMedioNuevo)}
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg">
                        <div className="text-sm text-text-secondary">EBITDA Nuevo</div>
                        <div className="text-xl font-bold">
                          {new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "EUR",
                            maximumFractionDigits: 0,
                          }).format(resultadosSimulacion.ebitdaNuevo)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prevision" className="space-y-4">
          {/* Sección de resumen de previsiones */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-t-4 border-t-[#7BDFF2]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Seguimiento de Previsiones
                </CardTitle>
                <CardDescription>Comparativa entre datos reales y previsiones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Periodo actual: Octubre 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Cumplimiento general:</span>
                      <span className="text-sm font-medium text-[#17c3b2]">92%</span>
                    </div>
                  </div>

                  <Alert className="bg-muted/30 border-l-4 border-l-[#ffce85]">
                    <AlertTriangle className="h-4 w-4 text-[#ffce85]" />
                    <AlertTitle>Desviaciones detectadas</AlertTitle>
                    <AlertDescription>
                      Se han detectado desviaciones significativas en costes de personal (+6.7%) y ticket medio (-3.4%).
                      Revisa el análisis detallado para más información.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/20 border-t p-4">
                <Button variant="outline" size="sm" className="ml-auto flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Ver informe completo</span>
                </Button>
              </CardFooter>
            </Card>

            <KpiTracker
              title="Seguimiento de KPIs"
              description="Progreso hacia los objetivos establecidos"
              kpis={kpisActuales}
            />
          </div>

          {/* Gráficos de comparación */}
          <div className="grid gap-4 md:grid-cols-2">
            <ForecastComparisonChart
              title="Ventas: Real vs. Previsión"
              description="Comparativa mensual de ingresos"
              data={datosComparativaVentas}
              dataKey="real"
              forecastKey="prevision"
              xAxisKey="mes"
              targetValue={55000}
              targetLabel="Objetivo mensual"
            />

            <ForecastComparisonChart
              title="Ocupación: Real vs. Previsión"
              description="Comparativa mensual de ocupación"
              data={datosComparativaOcupacion}
              dataKey="real"
              forecastKey="prevision"
              xAxisKey="mes"
              valueFormatter={(value) => `${value}%`}
              targetValue={75}
              targetLabel="Objetivo mensual"
            />
          </div>

          {/* Análisis de desviaciones */}
          <DeviationAnalysis
            title="Análisis de Desviaciones"
            description="Diferencias entre previsiones y resultados reales"
            data={datosDesviaciones}
          />

          {/* Previsiones futuras */}
          <FutureForecast
            title="Previsiones Futuras"
            description="Proyecciones financieras para los próximos periodos"
            monthlyData={previsionesMensuales}
            quarterlyData={previsionesTrimestral}
            yearlyData={previsionesAnual}
          />

          {/* Recomendaciones */}
          <Card className="border-t-4 border-t-[#B2F7EF]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-[#17c3b2]" />
                Recomendaciones Basadas en Datos
              </CardTitle>
              <CardDescription>Sugerencias para mejorar el rendimiento y ajustar previsiones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-white to-[#EFF7F6]/50 p-4 rounded-lg border border-[#EFF7F6]">
                  <h3 className="font-medium mb-2">Ajustes recomendados para próximas previsiones</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="p-1 bg-[#17c3b2]/20 rounded-full mt-0.5">
                        <TrendingUp className="h-4 w-4 text-[#17c3b2]" />
                      </div>
                      <div>
                        <p className="font-medium">Revisar previsión de costes de personal</p>
                        <p className="text-sm text-muted-foreground">
                          Ajustar al alza un 5-7% para reflejar la tendencia actual de horas extra en fines de semana.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="p-1 bg-[#17c3b2]/20 rounded-full mt-0.5">
                        <TrendingUp className="h-4 w-4 text-[#17c3b2]" />
                      </div>
                      <div>
                        <p className="font-medium">Recalibrar previsión de ticket medio</p>
                        <p className="text-sm text-muted-foreground">
                          Reducir en un 3% para alinear con los patrones de consumo observados en los últimos 3 meses.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="p-1 bg-[#17c3b2]/20 rounded-full mt-0.5">
                        <TrendingUp className="h-4 w-4 text-[#17c3b2]" />
                      </div>
                      <div>
                        <p className="font-medium">Aumentar previsión de ocupación para Q1 2026</p>
                        <p className="text-sm text-muted-foreground">
                          Incrementar en 2-3 puntos porcentuales basado en la tendencia positiva actual y las reservas
                          anticipadas.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-white to-pink-50/50 p-4 rounded-lg border border-pink-100/50">
                  <h3 className="font-medium mb-2">Acciones operativas sugeridas</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="p-1 bg-[#fe6d73]/20 rounded-full mt-0.5">
                        <TrendingUp className="h-4 w-4 text-[#fe6d73]" />
                      </div>
                      <div>
                        <p className="font-medium">Optimizar planificación de personal</p>
                        <p className="text-sm text-muted-foreground">
                          Revisar horarios para reducir horas extra no planificadas, especialmente en fines de semana.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="p-1 bg-[#fe6d73]/20 rounded-full mt-0.5">
                        <TrendingUp className="h-4 w-4 text-[#fe6d73]" />
                      </div>
                      <div>
                        <p className="font-medium">Implementar estrategias de upselling</p>
                        <p className="text-sm text-muted-foreground">
                          Capacitar al personal para promover bebidas y postres para aumentar el ticket medio.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end bg-muted/20 border-t p-4">
              <Button className="flex items-center gap-2">
                <span>Implementar recomendaciones</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
