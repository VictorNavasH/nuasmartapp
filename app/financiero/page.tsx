"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { CustomBarChart } from "@/components/charts/bar-chart"
import { StatCard } from "@/components/stats/stat-card"
import {
  LineChart,
  PercentIcon,
  TrendingUp,
  DollarSign,
  Users,
  Building,
  ShoppingBag,
  Lightbulb,
  Briefcase,
  ArrowDown,
  ArrowUp,
  Minus,
  PiggyBank,
  Receipt,
  Calculator,
} from "lucide-react"
import { comparativaIngresosGastos, financialMetrics } from "@/lib/mock-data"
// Importar el nuevo componente de gráfico de punto de equilibrio
import { BreakEvenChart } from "@/components/charts/break-even-chart"

// Modificar la primera línea del componente AnalisisFinancieroPage
export default function AnalisisFinancieroPage() {
  // Datos para el desglose financiero
  const datosFinancieros = {
    ingresos: {
      ventas: 165000,
      otrosIngresos: 5000,
      total: 170000,
      tendencia: 3.5,
    },
    costesDirectos: {
      costesProducto: 55000,
      margenBruto: 115000,
      tendencia: -1.2,
    },
    gastosOperativos: {
      personal: 35000,
      suministros: 12000,
      alquiler: 15000,
      otrosGastos: 13000,
      total: 75000,
      tendencia: 2.1,
    },
    resultados: {
      ebitda: 40000,
      depreciacion: 5000,
      intereses: 3000,
      impuestos: 8000,
      beneficioNeto: 24000,
      tendencia: 4.8,
    },
  }

  // Función para renderizar el indicador de tendencia
  const renderTendencia = (valor) => {
    if (valor > 0) {
      return <ArrowUp className="h-4 w-4 text-[#17c3b2]" />
    } else if (valor < 0) {
      return <ArrowDown className="h-4 w-4 text-[#fe6d73]" />
    } else {
      return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  // Función para formatear moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Calcular porcentajes para las barras de progreso
  const calcularPorcentaje = (valor, total) => {
    return (valor / total) * 100
  }

  // Función para generar datos para el gráfico de punto de equilibrio
  const generateBreakEvenData = () => {
    const costosFijos = 64000
    const precioVentaUnitario = 28.5 // Ticket medio
    const costoVariableUnitario = 10.2 // Costo variable por cliente
    const capacidadTotal = 160 * 26 // Plazas totales * días abiertos al mes

    // Generar datos para diferentes niveles de ocupación
    return Array.from({ length: 11 }, (_, i) => {
      const ocupacion = i * 10 // 0%, 10%, 20%, ..., 100%
      const unidades = Math.round((capacidadTotal * ocupacion) / 100)
      const ingresos = unidades * precioVentaUnitario
      const costosVariables = unidades * costoVariableUnitario
      const costosTotales = costosFijos + costosVariables

      return {
        unidades: ocupacion,
        ingresos,
        costosFijos,
        costosVariables,
        costosTotales,
      }
    })
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-secondary-blue">Análisis Financiero</h2>
      </div>

      <Tabs defaultValue="resumen" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resumen">Resumen Financiero</TabsTrigger>
          <TabsTrigger value="punto-equilibrio">Punto de Equilibrio</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="Beneficio Neto"
              value={financialMetrics.beneficioNeto.value}
              icon={<TrendingUp className="h-6 w-6 text-primary" />}
              trend={financialMetrics.beneficioNeto.trend}
              currency={true}
            />
            <StatCard
              title="EBITDA"
              value={financialMetrics.ebitda.value}
              icon={<LineChart className="h-6 w-6 text-primary" />}
              trend={financialMetrics.ebitda.trend}
              currency={true}
            />
            <StatCard
              title="Margen Bruto"
              value="67.5%"
              icon={<PercentIcon className="h-6 w-6 text-primary" />}
              trend={2.3}
            />
          </div>

          {/* Modificar esta sección para que la gráfica de comparativa ocupe toda la línea */}
          <div className="grid gap-4 grid-cols-1">
            <CustomBarChart
              title="Comparativa Ingresos vs Gastos"
              description="Últimos 12 meses"
              data={comparativaIngresosGastos}
              categories={["ingresos", "gastos"]}
              index="mes"
              showLegend={true}
            />

            {/* Desglose de finanzas rediseñado */}
            <Card className="overflow-hidden border-t-4 border-t-[#F2B5D4]">
              <CardHeader className="bg-gradient-to-r from-white to-[#F2B5D4]/10">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-[#ff4797]" />
                  Desglose de Finanzas
                </CardTitle>
                <CardDescription>Análisis detallado por categoría</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {/* Ingresos */}
                <div className="p-4 border-b bg-gradient-to-r from-white to-[#02f2d2]/5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-[#02f2d2]/20">
                        <DollarSign className="h-5 w-5 text-[#02f2d2]" />
                      </div>
                      <h3 className="font-semibold text-lg text-secondary-blue">Ingresos Totales</h3>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      {renderTendencia(datosFinancieros.ingresos.tendencia)}
                      <span className={datosFinancieros.ingresos.tendencia > 0 ? "text-[#17c3b2]" : "text-[#fe6d73]"}>
                        {datosFinancieros.ingresos.tendencia > 0 ? "+" : ""}
                        {datosFinancieros.ingresos.tendencia}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Receipt className="h-4 w-4 text-secondary-blue/70" />
                          <span>Ventas</span>
                        </div>
                        <span className="font-medium">{formatCurrency(datosFinancieros.ingresos.ventas)}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-[#02f2d2]"
                          style={{
                            width: `${calcularPorcentaje(datosFinancieros.ingresos.ventas, datosFinancieros.ingresos.total)}%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <PiggyBank className="h-4 w-4 text-secondary-blue/70" />
                          <span>Otros ingresos</span>
                        </div>
                        <span className="font-medium">{formatCurrency(datosFinancieros.ingresos.otrosIngresos)}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-[#02f2d2]/60"
                          style={{
                            width: `${calcularPorcentaje(datosFinancieros.ingresos.otrosIngresos, datosFinancieros.ingresos.total)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center items-center bg-white/80 p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-secondary-blue/70 mb-1">Total Ingresos</div>
                      <div className="text-3xl font-bold text-[#02f2d2]">
                        {formatCurrency(datosFinancieros.ingresos.total)}
                      </div>
                      <div className="text-xs text-secondary-blue/70 mt-2">
                        {Math.round(
                          calcularPorcentaje(datosFinancieros.ingresos.ventas, datosFinancieros.ingresos.total),
                        )}
                        % ventas,
                        {Math.round(
                          calcularPorcentaje(datosFinancieros.ingresos.otrosIngresos, datosFinancieros.ingresos.total),
                        )}
                        % otros
                      </div>
                    </div>
                  </div>
                </div>

                {/* Costes Directos */}
                <div className="p-4 border-b bg-gradient-to-r from-white to-[#edadff]/5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-[#edadff]/20">
                        <ShoppingBag className="h-5 w-5 text-[#edadff]" />
                      </div>
                      <h3 className="font-semibold text-lg text-secondary-blue">Costes Directos</h3>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      {renderTendencia(datosFinancieros.costesDirectos.tendencia)}
                      <span
                        className={datosFinancieros.costesDirectos.tendencia < 0 ? "text-[#17c3b2]" : "text-[#fe6d73]"}
                      >
                        {datosFinancieros.costesDirectos.tendencia > 0 ? "+" : ""}
                        {datosFinancieros.costesDirectos.tendencia}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Costes de producto</span>
                        <span className="font-medium">
                          {formatCurrency(datosFinancieros.costesDirectos.costesProducto)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-[#edadff]"
                          style={{
                            width: `${calcularPorcentaje(datosFinancieros.costesDirectos.costesProducto, datosFinancieros.ingresos.total)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center items-center bg-white/80 p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-secondary-blue/70 mb-1">Margen Bruto</div>
                      <div className="text-3xl font-bold text-[#edadff]">
                        {formatCurrency(datosFinancieros.costesDirectos.margenBruto)}
                      </div>
                      <div className="text-xs text-secondary-blue/70 mt-2">
                        {Math.round(
                          calcularPorcentaje(
                            datosFinancieros.costesDirectos.margenBruto,
                            datosFinancieros.ingresos.total,
                          ),
                        )}
                        % sobre ingresos
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gastos Operativos */}
                <div className="p-4 border-b bg-gradient-to-r from-white to-[#ffce85]/5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-[#ffce85]/20">
                        <Briefcase className="h-5 w-5 text-[#ffce85]" />
                      </div>
                      <h3 className="font-semibold text-lg text-secondary-blue">Gastos Operativos</h3>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      {renderTendencia(datosFinancieros.gastosOperativos.tendencia)}
                      <span
                        className={
                          datosFinancieros.gastosOperativos.tendencia < 0 ? "text-[#17c3b2]" : "text-[#fe6d73]"
                        }
                      >
                        {datosFinancieros.gastosOperativos.tendencia > 0 ? "+" : ""}
                        {datosFinancieros.gastosOperativos.tendencia}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-secondary-blue/70" />
                          <span>Personal</span>
                        </div>
                        <span className="font-medium">
                          {formatCurrency(datosFinancieros.gastosOperativos.personal)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-[#ffce85]"
                          style={{
                            width: `${calcularPorcentaje(datosFinancieros.gastosOperativos.personal, datosFinancieros.gastosOperativos.total)}%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-secondary-blue/70" />
                          <span>Suministros</span>
                        </div>
                        <span className="font-medium">
                          {formatCurrency(datosFinancieros.gastosOperativos.suministros)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-[#ffce85]"
                          style={{
                            width: `${calcularPorcentaje(datosFinancieros.gastosOperativos.suministros, datosFinancieros.gastosOperativos.total)}%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-secondary-blue/70" />
                          <span>Alquiler</span>
                        </div>
                        <span className="font-medium">
                          {formatCurrency(datosFinancieros.gastosOperativos.alquiler)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-[#ffce85]"
                          style={{
                            width: `${calcularPorcentaje(datosFinancieros.gastosOperativos.alquiler, datosFinancieros.gastosOperativos.total)}%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Otros gastos</span>
                        <span className="font-medium">
                          {formatCurrency(datosFinancieros.gastosOperativos.otrosGastos)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-[#ffce85]"
                          style={{
                            width: `${calcularPorcentaje(datosFinancieros.gastosOperativos.otrosGastos, datosFinancieros.gastosOperativos.total)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center items-center bg-white/80 p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-secondary-blue/70 mb-1">Total Gastos</div>
                      <div className="text-3xl font-bold text-[#ffce85]">
                        {formatCurrency(datosFinancieros.gastosOperativos.total)}
                      </div>
                      <div className="text-xs text-secondary-blue/70 mt-2">
                        {Math.round(
                          calcularPorcentaje(datosFinancieros.gastosOperativos.total, datosFinancieros.ingresos.total),
                        )}
                        % sobre ingresos
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resultados */}
                <div className="p-4 bg-gradient-to-r from-white to-[#fe6d73]/5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-[#fe6d73]/20">
                        <TrendingUp className="h-5 w-5 text-[#fe6d73]" />
                      </div>
                      <h3 className="font-semibold text-lg text-secondary-blue">Resultados</h3>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      {renderTendencia(datosFinancieros.resultados.tendencia)}
                      <span className={datosFinancieros.resultados.tendencia > 0 ? "text-[#17c3b2]" : "text-[#fe6d73]"}>
                        {datosFinancieros.resultados.tendencia > 0 ? "+" : ""}
                        {datosFinancieros.resultados.tendencia}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">EBITDA</span>
                        <span className="font-medium">{formatCurrency(datosFinancieros.resultados.ebitda)}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-[#fe6d73]"
                          style={{
                            width: `${calcularPorcentaje(datosFinancieros.resultados.ebitda, datosFinancieros.ingresos.total)}%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Depreciación</span>
                        <span className="font-medium">{formatCurrency(datosFinancieros.resultados.depreciacion)}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-[#fe6d73]/80"
                          style={{
                            width: `${calcularPorcentaje(datosFinancieros.resultados.depreciacion, datosFinancieros.ingresos.total)}%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Intereses</span>
                        <span className="font-medium">{formatCurrency(datosFinancieros.resultados.intereses)}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-[#fe6d73]/80"
                          style={{
                            width: `${calcularPorcentaje(datosFinancieros.resultados.intereses, datosFinancieros.ingresos.total)}%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Impuestos</span>
                        <span className="font-medium">{formatCurrency(datosFinancieros.resultados.impuestos)}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-[#fe6d73]/80"
                          style={{
                            width: `${calcularPorcentaje(datosFinancieros.resultados.impuestos, datosFinancieros.ingresos.total)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center items-center bg-white/80 p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-secondary-blue/70 mb-1">Beneficio Neto</div>
                      <div className="text-3xl font-bold text-[#fe6d73]">
                        {formatCurrency(datosFinancieros.resultados.beneficioNeto)}
                      </div>
                      <div className="text-xs text-secondary-blue/70 mt-2">
                        {Math.round(
                          calcularPorcentaje(
                            datosFinancieros.resultados.beneficioNeto,
                            datosFinancieros.ingresos.total,
                          ),
                        )}
                        % sobre ingresos
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="punto-equilibrio" className="space-y-4">
          <Card className="border-t-4 border-t-primary-light/70">
            <CardHeader>
              <CardTitle>Análisis de Punto de Equilibrio</CardTitle>
              <CardDescription>Intersección de ingresos y costes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Punto de Equilibrio en Ingresos</h3>
                    <div className="text-3xl font-bold">€98,500</div>
                    <p className="text-sm text-text-secondary">
                      Ingresos mensuales necesarios para cubrir todos los costes
                    </p>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-2">
                    <h3 className="font-medium">Punto de Equilibrio en Ocupación</h3>
                    <div className="text-3xl font-bold">65%</div>
                    <p className="text-sm text-text-secondary">Ocupación mínima necesaria para cubrir costes</p>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-2">
                    <h3 className="font-medium">Punto de Equilibrio en Comensales</h3>
                    <div className="text-3xl font-bold">3,120</div>
                    <p className="text-sm text-text-secondary">
                      Comensales mensuales necesarios para alcanzar punto de equilibrio
                    </p>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-medium flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      Análisis
                    </h3>
                    <p className="text-sm">
                      Con un coste fijo mensual de <strong>€64,000</strong> y un margen de contribución de{" "}
                      <strong>€18.3</strong> por cliente, necesitas atender a <strong>3,120 comensales</strong> al mes
                      para alcanzar el punto de equilibrio.
                    </p>
                    <p className="text-sm mt-2">
                      Actualmente, tu ocupación media es del <strong>78%</strong>, lo que te sitúa{" "}
                      <strong>13 puntos</strong> por encima del punto de equilibrio, generando un beneficio neto
                      positivo.
                    </p>
                  </div>
                </div>

                <div>
                  <BreakEvenChart data={generateBreakEvenData()} breakEvenPoint={98500} breakEvenUnits={65} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-[#F7D6E0]">
            <CardHeader>
              <CardTitle>Análisis de Sensibilidad</CardTitle>
              <CardDescription>Impacto de cambios en variables clave sobre el punto de equilibrio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Si el ticket medio aumenta un 10%
                    </h3>
                    <p className="text-2xl font-bold text-[#17c3b2]">58%</p>
                    <p className="text-xs text-muted-foreground mt-1">Nuevo punto de equilibrio en ocupación</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Si los costes fijos se reducen un 5%
                    </h3>
                    <p className="text-2xl font-bold text-[#17c3b2]">62%</p>
                    <p className="text-xs text-muted-foreground mt-1">Nuevo punto de equilibrio en ocupación</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Si los costes variables aumentan un 8%
                    </h3>
                    <p className="text-2xl font-bold text-[#fe6d73]">68%</p>
                    <p className="text-xs text-muted-foreground mt-1">Nuevo punto de equilibrio en ocupación</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-white to-[#EFF7F6]/50 p-4 rounded-lg border border-[#EFF7F6]">
                  <h3 className="font-medium mb-2">Recomendaciones para mejorar el margen de seguridad</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="p-1 bg-[#17c3b2]/20 rounded-full mt-0.5">
                        <TrendingUp className="h-4 w-4 text-[#17c3b2]" />
                      </div>
                      <div>
                        <p className="font-medium">Aumentar el ticket medio</p>
                        <p className="text-sm text-muted-foreground">
                          Implementar estrategias de upselling y promoción de platos con mayor margen.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="p-1 bg-[#17c3b2]/20 rounded-full mt-0.5">
                        <Users className="h-4 w-4 text-[#17c3b2]" />
                      </div>
                      <div>
                        <p className="font-medium">Optimizar costes de personal</p>
                        <p className="text-sm text-muted-foreground">
                          Ajustar la plantilla según la demanda prevista para cada turno.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="p-1 bg-[#17c3b2]/20 rounded-full mt-0.5">
                        <ShoppingBag className="h-4 w-4 text-[#17c3b2]" />
                      </div>
                      <div>
                        <p className="font-medium">Reducir costes de materias primas</p>
                        <p className="text-sm text-muted-foreground">
                          Negociar con proveedores y optimizar la gestión de inventario.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
