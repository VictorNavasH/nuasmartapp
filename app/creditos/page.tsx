"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { StatCard } from "@/components/stats/stat-card"
import { CustomLineChart } from "@/components/charts/line-chart"
import {
  CreditCard,
  BanknoteIcon as BankIcon,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Plus,
  Download,
  FileText,
  Percent,
  Clock,
  ArrowRight,
  Info,
} from "lucide-react"
import { creditosActivos, resumenCreditos } from "@/lib/mock-data"

export default function CreditosPage() {
  const [selectedCreditoId, setSelectedCreditoId] = useState<number | null>(null)

  // Encontrar el crédito seleccionado
  const selectedCredito = creditosActivos.find((credito) => credito.id === selectedCreditoId)

  // Calcular el porcentaje pagado de cada crédito
  const calcularPorcentajePagado = (credito) => {
    return ((credito.importeInicial - credito.saldoPendiente) / credito.importeInicial) * 100
  }

  // Formatear moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  // Calcular días hasta el próximo pago
  const calcularDiasHastaProximoPago = (fechaPago) => {
    const hoy = new Date()
    const proximoPago = new Date(fechaPago)
    const diferencia = proximoPago.getTime() - hoy.getTime()
    return Math.ceil(diferencia / (1000 * 3600 * 24))
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-secondary-blue">Gestión de Créditos</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Crédito
          </Button>
        </div>
      </div>

      <Tabs defaultValue="resumen" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="activos">Créditos Activos</TabsTrigger>
          <TabsTrigger value="cashflow">Impacto en Cash Flow</TabsTrigger>
          <TabsTrigger value="simulador">Simulador</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Deuda Total"
              value={formatCurrency(resumenCreditos.totalSaldoPendiente)}
              icon={<CreditCard className="h-6 w-6 text-primary" />}
              description="Saldo pendiente total"
            />
            <StatCard
              title="Cuota Mensual"
              value={formatCurrency(resumenCreditos.totalCuotasMensuales)}
              icon={<Calendar className="h-6 w-6 text-primary" />}
              description="Pagos mensuales totales"
            />
            <StatCard
              title="Ratio de Deuda"
              value={`${resumenCreditos.ratioDeuda}%`}
              icon={<Percent className="h-6 w-6 text-primary" />}
              description="Sobre facturación anual"
            />
            <StatCard
              title="Coste Medio"
              value={`${resumenCreditos.costeMedioPonderado}%`}
              icon={<TrendingUp className="h-6 w-6 text-primary" />}
              description="Tipo de interés medio"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-t-4 border-t-[#7BDFF2]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Próximos Vencimientos
                </CardTitle>
                <CardDescription>Pagos programados en los próximos 30 días</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resumenCreditos.proximosVencimientos.map((vencimiento, index) => {
                    const diasRestantes = calcularDiasHastaProximoPago(vencimiento.fecha)
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium">{formatDate(vencimiento.fecha)}</p>
                          <p className="text-sm text-muted-foreground">{vencimiento.entidad}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(vencimiento.importe)}</p>
                          <p className={`text-xs ${diasRestantes <= 7 ? "text-[#fe6d73]" : "text-muted-foreground"}`}>
                            {diasRestantes <= 0
                              ? "¡Vence hoy!"
                              : `${diasRestantes} ${diasRestantes === 1 ? "día" : "días"} restantes`}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-0">
                <Button variant="ghost" size="sm" className="text-primary">
                  Ver todos los vencimientos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-t-4 border-t-[#F7D6E0]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-[#fe6d73]" />
                  Alertas y Oportunidades
                </CardTitle>
                <CardDescription>Notificaciones importantes sobre tus créditos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resumenCreditos.alertas.map((alerta) => (
                    <Alert
                      key={alerta.id}
                      variant={alerta.tipo === "warning" ? "warning" : "default"}
                      className={`border-l-4 ${alerta.tipo === "warning" ? "border-l-warning" : "border-l-success"}`}
                    >
                      <AlertTitle>{alerta.titulo}</AlertTitle>
                      <AlertDescription className="flex justify-between">
                        <span>{alerta.descripcion}</span>
                        <span className="text-xs text-muted-foreground">{alerta.fecha}</span>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-0">
                <Button variant="ghost" size="sm" className="text-primary">
                  Ver todas las alertas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="border-t-4 border-t-[#EFF7F6]">
            <CardHeader>
              <CardTitle>Distribución de Deuda por Tipo</CardTitle>
              <CardDescription>Análisis de la composición de la deuda financiera</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  {creditosActivos.map((credito) => (
                    <div key={credito.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor:
                                credito.tipo === "Préstamo"
                                  ? "#02b1c4"
                                  : credito.tipo === "Línea de Crédito"
                                    ? "#edadff"
                                    : credito.tipo === "Préstamo ICO"
                                      ? "#ffce85"
                                      : "#fe6d73",
                            }}
                          />
                          <span>
                            {credito.tipo} - {credito.entidad}
                          </span>
                        </div>
                        <span className="font-medium">{formatCurrency(credito.saldoPendiente)}</span>
                      </div>
                      <Progress
                        value={calcularPorcentajePagado(credito)}
                        className="h-2"
                        indicatorClassName={
                          credito.tipo === "Préstamo"
                            ? "bg-[#02b1c4]"
                            : credito.tipo === "Línea de Crédito"
                              ? "bg-[#edadff]"
                              : credito.tipo === "Préstamo ICO"
                                ? "bg-[#ffce85]"
                                : "bg-[#fe6d73]"
                        }
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Pagado: {Math.round(calcularPorcentajePagado(credito))}%</span>
                        <span>Pendiente: {formatCurrency(credito.saldoPendiente)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col justify-center items-center">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-secondary-blue">Resumen de Deuda</h3>
                    <p className="text-sm text-muted-foreground">
                      Total: {formatCurrency(resumenCreditos.totalSaldoPendiente)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-white p-4 rounded-lg border shadow-sm text-center">
                      <p className="text-sm text-muted-foreground">Deuda a Corto Plazo</p>
                      <p className="text-xl font-bold text-[#fe6d73]">{formatCurrency(45000)}</p>
                      <p className="text-xs text-muted-foreground">26% del total</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border shadow-sm text-center">
                      <p className="text-sm text-muted-foreground">Deuda a Largo Plazo</p>
                      <p className="text-xl font-bold text-[#02b1c4]">{formatCurrency(125500)}</p>
                      <p className="text-xs text-muted-foreground">74% del total</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Créditos Activos</CardTitle>
              <CardDescription>Detalle de todos los créditos y financiación vigente</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Entidad</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right">Importe Inicial</TableHead>
                    <TableHead className="text-right">Saldo Pendiente</TableHead>
                    <TableHead className="text-right">Cuota Mensual</TableHead>
                    <TableHead className="text-right">Tipo Interés</TableHead>
                    <TableHead className="text-center">Estado</TableHead>
                    <TableHead className="text-right">Próximo Pago</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {creditosActivos.map((credito) => (
                    <TableRow
                      key={credito.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedCreditoId(credito.id === selectedCreditoId ? null : credito.id)}
                    >
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            credito.tipo === "Préstamo"
                              ? "bg-[#02b1c4]/10 text-[#02b1c4] border-[#02b1c4]/30"
                              : credito.tipo === "Línea de Crédito"
                                ? "bg-[#edadff]/10 text-[#edadff] border-[#edadff]/30"
                                : credito.tipo === "Préstamo ICO"
                                  ? "bg-[#ffce85]/10 text-[#ffce85] border-[#ffce85]/30"
                                  : "bg-[#fe6d73]/10 text-[#fe6d73] border-[#fe6d73]/30"
                          }
                        >
                          {credito.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <BankIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{credito.entidad}</span>
                        </div>
                      </TableCell>
                      <TableCell>{credito.descripcion}</TableCell>
                      <TableCell className="text-right">{formatCurrency(credito.importeInicial)}</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(credito.saldoPendiente)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(credito.cuotaMensual)}</TableCell>
                      <TableCell className="text-right">{credito.tipoInteres}%</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={credito.estado === "Al día" ? "default" : "destructive"}
                          className={
                            credito.estado === "Al día" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                          }
                        >
                          {credito.estado}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{formatDate(credito.proximoPago)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {selectedCredito && (
            <Card className="border-t-4 border-t-[#B2F7EF]">
              <CardHeader>
                <CardTitle>
                  Detalle del Crédito: {selectedCredito.tipo} - {selectedCredito.entidad}
                </CardTitle>
                <CardDescription>{selectedCredito.descripcion}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Importe Inicial</p>
                        <p className="text-lg font-semibold">{formatCurrency(selectedCredito.importeInicial)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Saldo Pendiente</p>
                        <p className="text-lg font-semibold">{formatCurrency(selectedCredito.saldoPendiente)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Tipo de Interés</p>
                        <p className="text-lg font-semibold">{selectedCredito.tipoInteres}%</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Cuota Mensual</p>
                        <p className="text-lg font-semibold">{formatCurrency(selectedCredito.cuotaMensual)}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Fecha Inicio</p>
                        <p className="text-base">{formatDate(selectedCredito.fechaInicio)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Fecha Fin</p>
                        <p className="text-base">{formatDate(selectedCredito.fechaFin)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Plazo</p>
                        <p className="text-base">{selectedCredito.plazoMeses} meses</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Garantías</p>
                        <p className="text-base">{selectedCredito.garantias}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Progreso de Amortización</p>
                      <Progress
                        value={calcularPorcentajePagado(selectedCredito)}
                        className="h-4"
                        indicatorClassName={
                          selectedCredito.tipo === "Préstamo"
                            ? "bg-[#02b1c4]"
                            : selectedCredito.tipo === "Línea de Crédito"
                              ? "bg-[#edadff]"
                              : selectedCredito.tipo === "Préstamo ICO"
                                ? "bg-[#ffce85]"
                                : "bg-[#fe6d73]"
                        }
                      />
                      <div className="flex justify-between text-xs">
                        <span>
                          Pagado: {formatCurrency(selectedCredito.importeInicial - selectedCredito.saldoPendiente)}
                        </span>
                        <span>Pendiente: {formatCurrency(selectedCredito.saldoPendiente)}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Intereses Pagados</p>
                      <p className="text-lg font-semibold">{formatCurrency(selectedCredito.interesesPagados)}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        Próximo Pago
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Fecha</p>
                          <p className="text-base font-medium">{formatDate(selectedCredito.proximoPago)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Importe</p>
                          <p className="text-base font-medium">{formatCurrency(selectedCredito.cuotaMensual)}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">Días Restantes</p>
                        <p className="text-base font-medium">
                          {calcularDiasHastaProximoPago(selectedCredito.proximoPago)} días
                        </p>
                      </div>
                    </div>

                    <div className="h-[200px]">
                      <h3 className="font-semibold mb-2">Impacto en Cash Flow Mensual</h3>
                      <CustomLineChart
                        title=""
                        data={selectedCredito.impactoCashflow}
                        dataKey="Impacto"
                        xAxisKey="mes"
                        yAxisKey="valor"
                        height={180}
                        colors={["#02b1c4"]}
                      />
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="flex-1">
                        <FileText className="mr-2 h-4 w-4" />
                        Ver Contrato
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Info className="mr-2 h-4 w-4" />
                        Simular Refinanciación
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Impacto en Cash Flow</CardTitle>
              <CardDescription>Análisis del impacto de los créditos en el flujo de caja</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-[300px]">
                  <CustomLineChart
                    title=""
                    data={creditosActivos.reduce((acc, credito) => {
                      credito.impactoCashflow.forEach((item) => {
                        const existingItem = acc.find((i) => i.mes === item.mes)
                        if (existingItem) {
                          existingItem.valor += item.valor
                        } else {
                          acc.push({ ...item })
                        }
                      })
                      return acc
                    }, [])}
                    dataKey="Impacto en Cash Flow"
                    xAxisKey="mes"
                    yAxisKey="valor"
                    height={300}
                    colors={["#02b1c4"]}
                    showLegend={true}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Impacto Mensual Promedio</h3>
                    <p className="text-2xl font-bold text-[#fe6d73]">-{formatCurrency(4810)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Salida de caja mensual</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Impacto Anual</h3>
                    <p className="text-2xl font-bold text-[#fe6d73]">-{formatCurrency(57720)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Total anual</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">% sobre Ingresos</h3>
                    <p className="text-2xl font-bold text-secondary-blue">8.4%</p>
                    <p className="text-xs text-muted-foreground mt-1">De los ingresos mensuales</p>
                  </div>
                </div>

                <Alert className="bg-[#EFF7F6]/50 border-l-4 border-l-[#02b1c4]">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-[#02b1c4] mt-0.5" />
                    <div>
                      <AlertTitle>Análisis de Impacto</AlertTitle>
                      <AlertDescription>
                        El impacto de los créditos en el cash flow es moderado (8.4% de los ingresos). La línea de
                        crédito con BBVA vence en enero 2024 y se recomienda planificar su renovación con antelación
                        para evitar tensiones de tesorería.
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simulador" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Simulador de Créditos</CardTitle>
              <CardDescription>Esta funcionalidad estará disponible próximamente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-60">
                <p className="text-text-secondary">Funcionalidad en desarrollo</p>
                <Button className="mt-4" variant="outline">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Solicitar acceso anticipado
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
