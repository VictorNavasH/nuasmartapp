"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard } from "@/components/stats/stat-card"
import { CalendarDays, Clock, Download, Plus, Upload, Users, DollarSign, CreditCard } from "lucide-react"
import { datosOperativosDiarios, costesOperativosMensuales, ingresosPorTurno } from "@/lib/mock-data"
import { ScatterChartDynamic } from "@/components/charts/scatter-chart-dynamic"

export default function DatosOperativosPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-secondary-blue">Datos Operativos</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="nua-button-secondary">
            <Upload className="mr-2 h-4 w-4" />
            Importar datos
          </Button>
          <Button variant="outline" size="sm" className="nua-button-secondary">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm" className="nua-button-primary">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo registro
          </Button>
        </div>
      </div>

      <Tabs defaultValue="turnos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="turnos">Turnos Abiertos</TabsTrigger>
          <TabsTrigger value="ocupacion">Ocupación</TabsTrigger>
          <TabsTrigger value="ingresos">Ingresos</TabsTrigger>
          <TabsTrigger value="costes">Costes Operativos</TabsTrigger>
        </TabsList>

        <TabsContent value="turnos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard title="Registros este mes" value={42} icon={<CalendarDays className="h-6 w-6 text-primary" />} />
            <StatCard
              title="Comensales totales"
              value={3850}
              icon={<Users className="h-6 w-6 text-primary" />}
              trend={5.2}
            />
            <StatCard title="Turnos gestionados" value={78} icon={<Clock className="h-6 w-6 text-primary" />} />
          </div>

          <Card className="border-t-4 border-t-primary-light/70">
            <CardHeader>
              <CardTitle>Registros de turnos recientes</CardTitle>
              <CardDescription>Visualización de datos operativos diarios por turno</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Turno</TableHead>
                    <TableHead className="text-right">Ingresos</TableHead>
                    <TableHead className="text-right">Comensales</TableHead>
                    <TableHead className="text-right">Ocupación</TableHead>
                    <TableHead className="text-right">Ticket Medio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {datosOperativosDiarios.flatMap((dia) =>
                    dia.turnos.map((turno, idx) => (
                      <TableRow key={`${dia.fecha}-${idx}`}>
                        <TableCell>{dia.fecha}</TableCell>
                        <TableCell>{turno.nombre}</TableCell>
                        <TableCell className="text-right">
                          {new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "EUR",
                            maximumFractionDigits: 0,
                          }).format(turno.ingresos)}
                        </TableCell>
                        <TableCell className="text-right">{turno.comensales}</TableCell>
                        <TableCell className="text-right">{turno.ocupacion}%</TableCell>
                        <TableCell className="text-right">
                          {new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "EUR",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(turno.ticket)}
                        </TableCell>
                      </TableRow>
                    )),
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costes" className="space-y-4">
          <Card className="border-t-4 border-t-primary-light/70">
            <CardHeader>
              <CardTitle>Costes Operativos Mensuales</CardTitle>
              <CardDescription>Desglose de costes por categoría</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">Importe</TableHead>
                    <TableHead className="text-right">% del Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costesOperativosMensuales.map((coste) => {
                    const totalCostes = costesOperativosMensuales.reduce((sum, c) => sum + c.importe, 0)
                    const porcentaje = (coste.importe / totalCostes) * 100

                    return (
                      <TableRow key={coste.id}>
                        <TableCell>{coste.categoria}</TableCell>
                        <TableCell className="text-right">
                          {new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "EUR",
                            maximumFractionDigits: 0,
                          }).format(coste.importe)}
                        </TableCell>
                        <TableCell className="text-right">{porcentaje.toFixed(2)}%</TableCell>
                      </TableRow>
                    )
                  })}
                  <TableRow className="font-medium">
                    <TableCell>TOTAL</TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat("es-ES", {
                        style: "currency",
                        currency: "EUR",
                        maximumFractionDigits: 0,
                      }).format(costesOperativosMensuales.reduce((sum, c) => sum + c.importe, 0))}
                    </TableCell>
                    <TableCell className="text-right">100%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ocupacion">
          <Card>
            <CardHeader>
              <CardTitle>Ocupación y Aprovechamiento</CardTitle>
              <CardDescription>Esta sección estará disponible próximamente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-40">
                <p className="text-text-secondary">Funcionalidad en desarrollo</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ingresos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <StatCard
              title="Ingresos este mes"
              value={186500}
              icon={<DollarSign className="h-6 w-6 text-primary" />}
              currency={true}
              trend={3.8}
            />
            <StatCard
              title="Ticket medio"
              value={28.5}
              icon={<CreditCard className="h-6 w-6 text-primary" />}
              currency={true}
              trend={1.2}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ingresos por Día y Turno</CardTitle>
              <CardDescription>El tamaño representa la ocupación</CardDescription>
            </CardHeader>
            <CardContent>
              <ScatterChartDynamic data={ingresosPorTurno} height={400} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Desglose de Ingresos por Categoría</CardTitle>
              <CardDescription>Distribución de ventas por tipo de producto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-40">
                <p className="text-text-secondary">Funcionalidad en desarrollo</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
