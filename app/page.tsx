import {
  CalendarDays,
  DollarSign,
  LineChart,
  Percent,
  TrendingUp,
  Users,
  Utensils,
  AlertTriangle,
  Cloud,
  Download,
  FileText,
  Sun,
  CloudRain,
  Clock,
  CreditCard,
  BarChart3,
} from "lucide-react"

import { StatCard } from "@/components/stats/stat-card"
import { CustomLineChart } from "@/components/charts/line-chart"
import { CustomPieChart } from "@/components/charts/pie-chart"
import { CustomBarChart } from "@/components/charts/bar-chart"
import {
  alertas,
  beneficioNetoHistorico,
  distribucionCostos,
  distribucionCostosEstandar,
  financialMetrics,
} from "@/lib/mock-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendIndicator } from "@/components/stats/trend-indicator"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Datos de ejemplo para la semana actual y anterior
const datosSemanales = {
  fechaInicio: "8 abril",
  fechaFin: "14 abril",
  fechaActual: "12 abril", // Hoy
  diaActual: "Viernes", // Día de hoy
  dias: [
    {
      nombre: "Lunes",
      fecha: "8 abril",
      ventasActual: 2450,
      ventasAnterior: 2300,
      ocupacionActual: 72,
      ocupacionAnterior: 68,
      ticketActual: 29.5,
      ticketAnterior: 28.2,
      comensalesActual: 83,
      comensalesAnterior: 78,
      clima: "soleado",
    },
    {
      nombre: "Martes",
      fecha: "9 abril",
      ventasActual: 2180,
      ventasAnterior: 2250,
      ocupacionActual: 65,
      ocupacionAnterior: 70,
      ticketActual: 27.8,
      ticketAnterior: 28.5,
      comensalesActual: 76,
      comensalesAnterior: 80,
      clima: "nublado",
    },
    {
      nombre: "Miércoles",
      fecha: "10 abril",
      ventasActual: 2580,
      ventasAnterior: 2420,
      ocupacionActual: 75,
      ocupacionAnterior: 72,
      ticketActual: 30.2,
      ticketAnterior: 29.1,
      comensalesActual: 85,
      comensalesAnterior: 82,
      clima: "lluvioso",
    },
    {
      nombre: "Jueves",
      fecha: "11 abril",
      ventasActual: 2820,
      ventasAnterior: 2650,
      ocupacionActual: 78,
      ocupacionAnterior: 74,
      ticketActual: 31.5,
      ticketAnterior: 30.8,
      comensalesActual: 90,
      comensalesAnterior: 86,
      clima: "soleado",
    },
    {
      nombre: "Viernes",
      fecha: "12 abril",
      ventasActual: 3750,
      ventasAnterior: 3520,
      ocupacionActual: 92,
      ocupacionAnterior: 88,
      ticketActual: 33.2,
      ticketAnterior: 32.5,
      comensalesActual: 112,
      comensalesAnterior: 108,
      clima: "soleado",
    },
    {
      nombre: "Sábado",
      fecha: "13 abril",
      ventasActual: null, // Aún no ha ocurrido
      ventasAnterior: 3980,
      ocupacionActual: null,
      ocupacionAnterior: 93,
      ticketActual: null,
      ticketAnterior: 33.9,
      comensalesActual: null,
      comensalesAnterior: 118,
      clima: "previsto-soleado",
    },
    {
      nombre: "Domingo",
      fecha: "14 abril",
      ventasActual: null, // Aún no ha ocurrido
      ventasAnterior: 3180,
      ocupacionActual: null,
      ocupacionAnterior: 82,
      ticketActual: null,
      ticketAnterior: 31.5,
      comensalesActual: null,
      comensalesAnterior: 102,
      clima: "previsto-nublado",
    },
  ],
  turnos: [
    { dia: "Lunes", comida: 65, cena: 78 },
    { dia: "Martes", comida: 58, cena: 72 },
    { dia: "Miércoles", comida: 70, cena: 80 },
    { dia: "Jueves", comida: 72, cena: 84 },
    { dia: "Viernes", comida: 88, cena: 96 },
    { dia: "Sábado", comida: 90, cena: 98 },
    { dia: "Domingo", comida: 85, cena: 0 }, // No hay cena los domingos
  ],
}

// Datos para el gráfico de barras de comparación semanal
const datosComparativaBarras = datosSemanales.dias
  .filter((dia) => dia.ventasActual !== null) // Solo días que ya han ocurrido
  .map((dia) => ({
    dia: dia.nombre.substring(0, 3),
    actual: dia.ventasActual,
    anterior: dia.ventasAnterior,
  }))

// Calcular totales y promedios semanales (solo de los días que ya han ocurrido)
const diasTranscurridos = datosSemanales.dias.filter((dia) => dia.ventasActual !== null)
const totalVentasActual = diasTranscurridos.reduce((sum, dia) => sum + dia.ventasActual, 0)
const totalVentasAnteriorParcial = diasTranscurridos.reduce((sum, dia) => sum + dia.ventasAnterior, 0)
const totalVentasAnteriorCompleto = datosSemanales.dias.reduce((sum, dia) => sum + (dia.ventasAnterior || 0), 0)
const promedioOcupacionActual =
  diasTranscurridos.reduce((sum, dia) => sum + dia.ocupacionActual, 0) / diasTranscurridos.length
const promedioOcupacionAnterior =
  diasTranscurridos.reduce((sum, dia) => sum + dia.ocupacionAnterior, 0) / diasTranscurridos.length
const promedioTicketActual =
  diasTranscurridos.reduce((sum, dia) => sum + dia.ticketActual, 0) / diasTranscurridos.length
const promedioTicketAnterior =
  diasTranscurridos.reduce((sum, dia) => sum + dia.ticketAnterior, 0) / diasTranscurridos.length

// Proyección de cierre semanal
const promedioVentasDiarias = totalVentasActual / diasTranscurridos.length
const diasRestantes = datosSemanales.dias.length - diasTranscurridos.length
const proyeccionVentasRestantes = promedioVentasDiarias * diasRestantes
const proyeccionVentasTotales = totalVentasActual + proyeccionVentasRestantes
const objetivoSemanal = 32800 // Objetivo semanal en euros
const porcentajeObjetivo = (proyeccionVentasTotales / objetivoSemanal) * 100 - 100

// Encontrar el día actual para mostrar comparativa
const diaActualIndex = datosSemanales.dias.findIndex((dia) => dia.nombre === datosSemanales.diaActual)
const diaActualData = diaActualIndex >= 0 ? datosSemanales.dias[diaActualIndex] : null

// Datos para el heatmap de turnos
const datosHeatmap = datosSemanales.turnos.map((turno) => ({
  dia: turno.dia.substring(0, 3),
  comida: turno.comida,
  cena: turno.cena,
}))

// Función para obtener el color de fondo según el clima
const getWeatherBackgroundClass = (clima) => {
  switch (clima) {
    case "soleado":
    case "previsto-soleado":
      return "bg-gradient-to-r from-white to-yellow-50"
    case "nublado":
    case "previsto-nublado":
      return "bg-gradient-to-r from-white to-gray-50"
    case "lluvioso":
    case "previsto-lluvioso":
      return "bg-gradient-to-r from-white to-blue-50"
    default:
      return "bg-gradient-to-r from-white to-[#f8f9fa]"
  }
}

// Función para obtener la sombra según el clima
const getWeatherShadowClass = (clima) => {
  switch (clima) {
    case "soleado":
    case "previsto-soleado":
      return "shadow-[0_2px_10px_rgba(234,179,8,0.1)]"
    case "nublado":
    case "previsto-nublado":
      return "shadow-[0_2px_10px_rgba(107,114,128,0.1)]"
    case "lluvioso":
    case "previsto-lluvioso":
      return "shadow-[0_2px_10px_rgba(59,130,246,0.1)]"
    default:
      return "shadow-sm"
  }
}

export default function DashboardPage() {
  // Calcular el número de alertas por tipo
  const alertasWarning = alertas.filter((a) => a.tipo === "warning").length
  const alertasDanger = alertas.filter((a) => a.tipo === "danger").length
  const alertasTotal = alertas.length

  // Función para renderizar el icono del clima
  const renderClimaIcon = (clima) => {
    switch (clima) {
      case "soleado":
      case "previsto-soleado":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "lluvioso":
      case "previsto-lluvioso":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      case "nublado":
      case "previsto-nublado":
        return <Cloud className="h-5 w-5 text-gray-500" />
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />
    }
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-[#00d2b7] to-[#006e90] text-transparent bg-clip-text">
          NÜA Dashboard
        </h2>
        {/* Elemento eliminado ya que esta información está en el slider superior */}
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="semana-actual">Semana Actual</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          {/* KPI Tarjetas */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Ticket Medio"
              value={financialMetrics.ticketMedio.value}
              icon={<DollarSign className="h-6 w-6 text-primary" />}
              trend={financialMetrics.ticketMedio.trend}
              currency={true}
            />
            <StatCard
              title="Ocupación Media"
              value={`${financialMetrics.ocupacion.value}%`}
              icon={<Users className="h-6 w-6 text-primary" />}
              trend={financialMetrics.ocupacion.trend}
            />
            <StatCard
              title="Punto de Equilibrio"
              value={`${financialMetrics.puntoEquilibrio.value}%`}
              icon={<Percent className="h-6 w-6 text-primary" />}
              trend={financialMetrics.puntoEquilibrio.trend}
              description="Ocupación mínima necesaria"
            />
            <StatCard
              title="Beneficio Neto"
              value={financialMetrics.beneficioNeto.value}
              icon={<TrendingUp className="h-6 w-6 text-primary" />}
              trend={financialMetrics.beneficioNeto.trend}
              currency={true}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="EBITDA"
              value={financialMetrics.ebitda.value}
              icon={<LineChart className="h-6 w-6 text-primary" />}
              trend={financialMetrics.ebitda.trend}
              currency={true}
            />
            {/* Aquí cambiamos la tarjeta de "Días Abiertos" por "Gastos Totales" */}
            <Card className="overflow-hidden bg-gradient-to-b from-white to-[#f8f9fa] border-t-4 border-t-[#fe6d73]">
              <CardContent className="px-4 py-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-secondary-blue">Gastos Totales</p>
                    <h3 className="text-2xl font-bold mt-1 text-[#fe6d73]">
                      {new Intl.NumberFormat("es-ES", {
                        style: "currency",
                        currency: "EUR",
                        maximumFractionDigits: 0,
                      }).format(45230)}
                    </h3>
                    <div className="mt-1">
                      <TrendIndicator value={3.8} label="vs. mes anterior" />
                    </div>
                    <p className="text-xs text-text-secondary mt-1">68.5% sobre ventas</p>
                  </div>
                  <div className="p-2 bg-primary-light/30 rounded-full">
                    <div className="w-6 h-6 flex items-center justify-center text-[#ff4797]">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <StatCard
              title="Ratio Aprovechamiento"
              value={`${financialMetrics.ratioAprovechamiento.value}%`}
              icon={<Utensils className="h-6 w-6 text-primary" />}
              trend={financialMetrics.ratioAprovechamiento.trend}
            />
            <StatCard
              title="Alertas Activas"
              value={alertasTotal}
              icon={<AlertTriangle className="h-6 w-6 text-warning" />}
              description={`${alertasWarning} advertencias, ${alertasDanger} críticas`}
              colorClass={
                alertasDanger > 0
                  ? "border-l-4 border-l-danger"
                  : alertasWarning > 0
                    ? "border-l-4 border-l-warning"
                    : ""
              }
            />
          </div>

          {/* Visualizaciones */}
          <div className="grid gap-4">
            <CustomLineChart
              title="Evolución del Beneficio Neto"
              description="Comparativa con punto de equilibrio"
              data={beneficioNetoHistorico}
              dataKey="Beneficio Neto"
              xAxisKey="mes"
              yAxisKey="beneficio"
              secondaryYAxisKey="puntoEquilibrio"
              secondaryDataKey="Punto de Equilibrio"
              showLegend={true}
            />
          </div>

          <div className="grid gap-4">
            <CustomPieChart
              title="Distribución de Costes"
              description="Comparativa con estándares del sector"
              data={distribucionCostos}
              standardData={distribucionCostosEstandar}
            />
          </div>

          <div className="grid gap-4">
            <Card>
              <CardHeader className="px-6 py-4">
                <CardTitle>Alertas y Notificaciones</CardTitle>
                <CardDescription>Desviaciones significativas y tendencias</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-4">
                {alertas.map((alerta) => (
                  <Alert
                    key={alerta.id}
                    variant={
                      alerta.tipo === "success" ? "default" : alerta.tipo === "warning" ? "warning" : "destructive"
                    }
                    className={cn(
                      "bg-gradient-to-r from-white to-[#EBF6F7]/50 border-l-4",
                      alerta.tipo === "success" && "border-l-success",
                      alerta.tipo === "warning" && "border-l-warning",
                      alerta.tipo === "danger" && "border-l-danger",
                    )}
                  >
                    <AlertTitle>{alerta.titulo}</AlertTitle>
                    <AlertDescription className="flex justify-between">
                      <span>{alerta.descripcion}</span>
                      <span className="text-xs text-muted-foreground">{alerta.fecha}</span>
                    </AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="semana-actual" className="space-y-4">
          {/* Cabecera con información de la semana y botones de exportación */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-bold text-secondary-blue">
                Semana: {datosSemanales.fechaInicio} - {datosSemanales.fechaFin}
              </h3>
              <p className="text-sm text-muted-foreground">Datos actualizados hasta el {datosSemanales.fechaActual}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>PDF</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Excel</span>
              </Button>
            </div>
          </div>

          {/* Comparativa del día actual vs mismo día semana anterior */}
          {diaActualData && (
            <Card
              className={cn(getWeatherBackgroundClass(diaActualData.clima), "border-t-4 border-t-primary-light/70")}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {diaActualData.nombre} ({diaActualData.fecha}){renderClimaIcon(diaActualData.clima)}
                    </CardTitle>
                    <CardDescription>Comparativa con mismo día de la semana anterior</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div
                    className={`bg-white p-3 rounded-lg ${getWeatherShadowClass(diaActualData.clima)} hover:shadow-md transition-shadow duration-200`}
                  >
                    <div className="text-sm text-muted-foreground">Ventas</div>
                    <div className="text-xl font-bold">
                      {new Intl.NumberFormat("es-ES", {
                        style: "currency",
                        currency: "EUR",
                        maximumFractionDigits: 0,
                      }).format(diaActualData.ventasActual)}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <TrendIndicator
                        value={
                          ((diaActualData.ventasActual - diaActualData.ventasAnterior) / diaActualData.ventasAnterior) *
                          100
                        }
                      />
                      <span className="text-xs text-muted-foreground">
                        vs{" "}
                        {new Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "EUR",
                          maximumFractionDigits: 0,
                        }).format(diaActualData.ventasAnterior)}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`bg-white p-3 rounded-lg ${getWeatherShadowClass(diaActualData.clima)} hover:shadow-md transition-shadow duration-200`}
                  >
                    <div className="text-sm text-muted-foreground">Ocupación</div>
                    <div className="text-xl font-bold">{diaActualData.ocupacionActual}%</div>
                    <div className="flex items-center justify-between mt-1">
                      <TrendIndicator
                        value={
                          ((diaActualData.ocupacionActual - diaActualData.ocupacionAnterior) /
                            diaActualData.ocupacionAnterior) *
                          100
                        }
                      />
                      <span className="text-xs text-muted-foreground">vs {diaActualData.ocupacionAnterior}%</span>
                    </div>
                  </div>
                  <div
                    className={`bg-white p-3 rounded-lg ${getWeatherShadowClass(diaActualData.clima)} hover:shadow-md transition-shadow duration-200`}
                  >
                    <div className="text-sm text-muted-foreground">Ticket Medio</div>
                    <div className="text-xl font-bold">
                      {new Intl.NumberFormat("es-ES", {
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(diaActualData.ticketActual)}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <TrendIndicator
                        value={
                          ((diaActualData.ticketActual - diaActualData.ticketAnterior) / diaActualData.ticketAnterior) *
                          100
                        }
                      />
                      <span className="text-xs text-muted-foreground">
                        vs{" "}
                        {new Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "EUR",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(diaActualData.ticketAnterior)}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`bg-white p-3 rounded-lg ${getWeatherShadowClass(diaActualData.clima)} hover:shadow-md transition-shadow duration-200`}
                  >
                    <div className="text-sm text-muted-foreground">Comensales</div>
                    <div className="text-xl font-bold">{diaActualData.comensalesActual}</div>
                    <div className="flex items-center justify-between mt-1">
                      <TrendIndicator
                        value={
                          ((diaActualData.comensalesActual - diaActualData.comensalesAnterior) /
                            diaActualData.comensalesAnterior) *
                          100
                        }
                      />
                      <span className="text-xs text-muted-foreground">vs {diaActualData.comensalesAnterior}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resumen semanal y proyección */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Resumen de la semana hasta ahora */}
            <Card className="overflow-hidden border-t-4 border-t-[#F2B5D4]">
              <CardHeader className="bg-gradient-to-r from-white to-[#EBF6F7]/20">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Resumen Semanal
                </CardTitle>
                <CardDescription>Datos acumulados hasta {datosSemanales.fechaActual}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 divide-y">
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-[#EBF6F7] rounded-full">
                          <DollarSign className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">Ventas Acumuladas</span>
                      </div>
                      <TrendIndicator
                        value={((totalVentasActual - totalVentasAnteriorParcial) / totalVentasAnteriorParcial) * 100}
                      />
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-2xl font-bold">
                        {new Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "EUR",
                          maximumFractionDigits: 0,
                        }).format(totalVentasActual)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        vs{" "}
                        {new Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "EUR",
                          maximumFractionDigits: 0,
                        }).format(totalVentasAnteriorParcial)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{
                          width: `${Math.min(100, (totalVentasActual / totalVentasAnteriorCompleto) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-[#EBF6F7] rounded-full">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">Ocupación Media</span>
                      </div>
                      <TrendIndicator
                        value={
                          ((promedioOcupacionActual - promedioOcupacionAnterior) / promedioOcupacionAnterior) * 100
                        }
                      />
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-2xl font-bold">{Math.round(promedioOcupacionActual)}%</span>
                      <span className="text-sm text-muted-foreground">vs {Math.round(promedioOcupacionAnterior)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${promedioOcupacionActual}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-[#EBF6F7] rounded-full">
                          <CreditCard className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">Ticket Medio</span>
                      </div>
                      <TrendIndicator
                        value={((promedioTicketActual - promedioTicketAnterior) / promedioTicketAnterior) * 100}
                      />
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-2xl font-bold">
                        {new Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "EUR",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(promedioTicketActual)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        vs{" "}
                        {new Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "EUR",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(promedioTicketAnterior)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{
                          width: `${Math.min(100, (promedioTicketActual / (promedioTicketAnterior * 1.5)) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-[#EBF6F7] rounded-full">
                          <CalendarDays className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">Días Transcurridos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xl font-bold">{diasTranscurridos.length}</span>
                        <span className="text-muted-foreground">de 7</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${(diasTranscurridos.length / 7) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proyección de cierre semanal */}
            <Card className="overflow-hidden border-t-4 border-t-secondary-pink/30">
              <CardHeader className="bg-gradient-to-r from-white to-pink-50/50">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary-pink" />
                  Proyección de Cierre Semanal
                </CardTitle>
                <CardDescription>Estimación basada en el ritmo actual</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-white to-pink-50/40 p-5 rounded-lg border border-pink-100/50 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <LineChart className="h-5 w-5 text-secondary-pink" />
                      <p className="text-sm font-medium">Si mantienes el ritmo actual, cerrarás con:</p>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <p className="text-3xl font-bold text-secondary-pink">
                        {new Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "EUR",
                          maximumFractionDigits: 0,
                        }).format(proyeccionVentasTotales)}
                      </p>
                      <div
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          porcentajeObjetivo >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {porcentajeObjetivo >= 0 ? "+" : ""}
                        {porcentajeObjetivo.toFixed(1)}%
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">respecto al objetivo</span>
                      <span className="text-sm font-medium">
                        (
                        {new Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "EUR",
                          maximumFractionDigits: 0,
                        }).format(objetivoSemanal)}
                        )
                      </span>
                    </div>

                    {/* Barra de progreso hacia el objetivo */}
                    <div className="mt-4 mb-1 flex justify-between text-xs">
                      <span>0€</span>
                      <span>
                        Objetivo:{" "}
                        {new Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "EUR",
                          maximumFractionDigits: 0,
                        }).format(objetivoSemanal)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${porcentajeObjetivo >= 0 ? "bg-green-500" : "bg-primary"}`}
                        style={{ width: `${Math.min(100, (proyeccionVentasTotales / objetivoSemanal) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                      <div className="text-sm text-muted-foreground mb-1">Ventas Actuales</div>
                      <div className="text-xl font-bold">
                        {new Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "EUR",
                          maximumFractionDigits: 0,
                        }).format(totalVentasActual)}
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                        <div
                          className="h-1.5 rounded-full bg-primary"
                          style={{ width: `${(totalVentasActual / proyeccionVentasTotales) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                      <div className="text-sm text-muted-foreground mb-1">Proyección Restante</div>
                      <div className="text-xl font-bold">
                        {new Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "EUR",
                          maximumFractionDigits: 0,
                        }).format(proyeccionVentasRestantes)}
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                        <div
                          className="h-1.5 rounded-full bg-secondary-pink"
                          style={{ width: `${(proyeccionVentasRestantes / proyeccionVentasTotales) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                      <div className="text-sm text-muted-foreground mb-1">Días Restantes</div>
                      <div className="text-xl font-bold flex items-center justify-between">
                        <span>{diasRestantes}</span>
                        <CalendarDays className="h-5 w-5 text-secondary-pink opacity-70" />
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                        <div
                          className="h-1.5 rounded-full bg-secondary-pink"
                          style={{ width: `${(diasRestantes / 7) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos y análisis */}
          {/* Gráfico de barras comparativo - ocupa línea completa */}
          <div className="grid gap-4">
            <CustomBarChart
              title="Ventas Diarias"
              description={`Comparativa ${datosSemanales.fechaInicio} - ${datosSemanales.fechaFin}`}
              data={datosComparativaBarras}
              categories={["actual", "anterior"]}
              index="dia"
              showLegend={true}
            />
          </div>

          {/* Heatmap de densidad por turno */}
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Densidad por Turno</CardTitle>
                <CardDescription>Porcentaje de ocupación por día y turno</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {datosHeatmap.map((item) => (
                    <div key={item.dia} className="flex items-center gap-2">
                      <div className="w-12 font-medium">{item.dia}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Comida</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-6 flex items-center">
                          <div
                            className="h-6 rounded-full flex items-center justify-end px-2 text-xs font-medium text-white"
                            style={{
                              width: `${item.comida}%`,
                              backgroundColor: getHeatmapColor(item.comida),
                            }}
                          >
                            {item.comida}%
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Cena</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-6 flex items-center">
                          {item.cena > 0 ? (
                            <div
                              className="h-6 rounded-full flex items-center justify-end px-2 text-xs font-medium text-white"
                              style={{
                                width: `${item.cena}%`,
                                backgroundColor: getHeatmapColor(item.cena),
                              }}
                            >
                              {item.cena}%
                            </div>
                          ) : (
                            <div className="text-xs text-muted-foreground px-2">Cerrado</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparativa meteorológica y análisis */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Impacto Meteorológico</CardTitle>
              <CardDescription>Relación entre clima y resultados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {datosSemanales.dias
                  .filter((dia) =>
                    ["Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].includes(dia.nombre),
                  )
                  .map((dia) => {
                    // Determinar clases de estilo basadas en el clima con colores más suaves
                    const climaClasses = {
                      soleado: "bg-gradient-to-r from-white to-yellow-50 border-l-4 border-yellow-300/40",
                      nublado: "bg-gradient-to-r from-white to-gray-50 border-l-4 border-gray-300/40",
                      lluvioso: "bg-gradient-to-r from-white to-blue-50 border-l-4 border-blue-300/40",
                      "previsto-soleado": "bg-gradient-to-r from-white to-yellow-50/70 border-l-4 border-yellow-300/30",
                      "previsto-nublado": "bg-gradient-to-r from-white to-gray-50/70 border-l-4 border-gray-300/30",
                      "previsto-lluvioso": "bg-gradient-to-r from-white to-blue-50/70 border-l-4 border-blue-300/30",
                    }

                    const climaClass = climaClasses[dia.clima] || climaClasses.soleado

                    // Calcular variaciones porcentuales si hay datos disponibles
                    const ocupacionVariacion =
                      dia.ocupacionActual && dia.ocupacionAnterior
                        ? ((dia.ocupacionActual - dia.ocupacionAnterior) / dia.ocupacionAnterior) * 100
                        : null
                    const ventasVariacion =
                      dia.ventasActual && dia.ventasAnterior
                        ? ((dia.ventasActual - dia.ventasAnterior) / dia.ventasAnterior) * 100
                        : null

                    // Determinar si es un día previsto (futuro)
                    const esDiaPrevisto = dia.ventasActual === null

                    return (
                      <div key={dia.nombre} className={`rounded-lg p-2 ${climaClass} shadow-sm`}>
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="p-1.5 rounded-full bg-white/80 shadow-sm">
                            {dia.clima.includes("soleado") && <Sun className="h-4 w-4 text-yellow-400" />}
                            {dia.clima.includes("nublado") && <Cloud className="h-4 w-4 text-gray-400" />}
                            {dia.clima.includes("lluvioso") && <CloudRain className="h-4 w-4 text-blue-400" />}
                          </div>
                          <div>
                            <h3 className="font-medium text-sm">{dia.nombre}</h3>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-muted-foreground">{dia.fecha}</span>
                              {ventasVariacion !== null ? (
                                <TrendIndicator value={ventasVariacion} className="text-xs" />
                              ) : (
                                <span className="text-xs text-muted-foreground">(previsto)</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white/80 p-1.5 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium">Ocupación</span>
                              <span className="text-xs font-bold">
                                {esDiaPrevisto ? `${dia.ocupacionAnterior}%*` : `${dia.ocupacionActual}%`}
                              </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1 mt-1">
                              <div
                                className={`h-1 rounded-full ${esDiaPrevisto ? "bg-primary-light/40" : "bg-primary-light/70"}`}
                                style={{ width: `${esDiaPrevisto ? dia.ocupacionAnterior : dia.ocupacionActual}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="bg-white/80 p-1.5 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium">Ventas</span>
                              <span className="text-xs font-bold">
                                {esDiaPrevisto
                                  ? new Intl.NumberFormat("es-ES", {
                                      style: "currency",
                                      currency: "EUR",
                                      maximumFractionDigits: 0,
                                    }).format(dia.ventasAnterior) + "*"
                                  : new Intl.NumberFormat("es-ES", {
                                      style: "currency",
                                      currency: "EUR",
                                      maximumFractionDigits: 0,
                                    }).format(dia.ventasActual)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1 mt-1">
                              <div
                                className={`h-1 rounded-full ${esDiaPrevisto ? "bg-primary-light/40" : "bg-primary-light/70"}`}
                                style={{
                                  width: `${
                                    ((esDiaPrevisto ? dia.ventasAnterior : dia.ventasActual) /
                                      Math.max(...datosSemanales.dias.map((d) => d.ventasActual || d.ventasAnterior))) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                <div className="p-2 bg-gradient-to-r from-white to-primary-light/30 rounded-lg shadow-sm md:col-span-3">
                  <div className="flex items-start gap-2">
                    <LineChart className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold mb-0.5">Análisis de Impacto</h3>
                      <p className="text-xs">
                        <strong>Días soleados:</strong> +6.2% ocupación, +5.8% ventas vs semana anterior.
                        <strong className="ml-1">Días lluviosos:</strong> Impacto negativo en ocupación, pero +3.8% en
                        ticket medio. <span className="italic">*Datos previstos basados en semana anterior</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Análisis y alertas semanales */}
          <Card className="overflow-hidden border-t-4 border-t-secondary-blue/30">
            <CardHeader className="bg-gradient-to-r from-white to-blue-50/40">
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-secondary-blue" />
                Análisis Semanal
              </CardTitle>
              <CardDescription>Insights y recomendaciones</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex gap-3 items-stretch">
                  <div className="bg-green-50/70 rounded-full p-2 h-10 w-10 flex items-center justify-center shadow-sm">
                    <TrendingUp className="h-5 w-5 text-green-600/80" />
                  </div>
                  <div className="flex-1 bg-gradient-to-r from-white to-green-50/40 p-3 rounded-lg border border-green-100/40 shadow-sm">
                    <h3 className="font-bold text-green-800 text-sm">Mejor día de la semana</h3>
                    <p className="text-xs mt-1">
                      El viernes ha tenido el mayor incremento en ventas{" "}
                      <span className="font-bold text-green-700">(+6.5%)</span> respecto a la semana anterior.
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <div className="text-xs px-1.5 py-0.5 bg-green-100/60 text-green-800 rounded-full">Viernes</div>
                      <div className="text-xs px-1.5 py-0.5 bg-green-100/60 text-green-800 rounded-full">Ventas</div>
                      <div className="text-xs px-1.5 py-0.5 bg-green-100/60 text-green-800 rounded-full">Ocupación</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-stretch">
                  <div className="bg-amber-50/70 rounded-full p-2 h-10 w-10 flex items-center justify-center shadow-sm">
                    <AlertTriangle className="h-5 w-5 text-amber-600/80" />
                  </div>
                  <div className="flex-1 bg-gradient-to-r from-white to-amber-50/40 p-3 rounded-lg border border-amber-100/40 shadow-sm">
                    <h3 className="font-bold text-amber-800 text-sm">Oportunidad de mejora</h3>
                    <p className="text-xs mt-1">
                      El martes muestra una caída del <span className="font-bold text-amber-700">(-3.1%)</span> en
                      ventas. Considera promociones especiales para este día.
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <div className="text-xs px-1.5 py-0.5 bg-amber-100/60 text-amber-800 rounded-full">Martes</div>
                      <div className="text-xs px-1.5 py-0.5 bg-amber-100/60 text-amber-800 rounded-full">Promoción</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-stretch">
                  <div className="bg-blue-50/70 rounded-full p-2 h-10 w-10 flex items-center justify-center shadow-sm">
                    <CreditCard className="h-5 w-5 text-blue-600/80" />
                  </div>
                  <div className="flex-1 bg-gradient-to-r from-white to-blue-50/40 p-3 rounded-lg border border-blue-100/40 shadow-sm">
                    <h3 className="font-bold text-blue-800 text-sm">Tendencia positiva</h3>
                    <p className="text-xs mt-1">
                      El ticket medio ha aumentado un <span className="font-bold text-blue-700">(+3.8%)</span> respecto
                      a la semana anterior, mejorando el margen.
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <div className="text-xs px-1.5 py-0.5 bg-blue-100/60 text-blue-800 rounded-full">
                        Ticket medio
                      </div>
                      <div className="text-xs px-1.5 py-0.5 bg-blue-100/60 text-blue-800 rounded-full">Margen</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gradient-to-r from-white to-blue-50/20 px-4 py-3">
              <Button className="w-full nua-button-primary">
                <FileText className="h-4 w-4 mr-2" />
                Ver análisis completo
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Función para generar colores para el heatmap basados en el porcentaje
function getHeatmapColor(percentage) {
  if (percentage < 50) return "#227c9d" // Azul para baja ocupación
  if (percentage < 75) return "#17c3b2" // Verde turquesa para ocupación media
  if (percentage < 90) return "#ff4797" // Rosa para ocupación alta
  return "#fe6d73" // Rojo para ocupación muy alta
}
