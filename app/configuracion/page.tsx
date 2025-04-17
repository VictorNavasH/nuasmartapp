"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Clock, CreditCard, Goal, Info, PieChart, Save, SettingsIcon, SquareStack } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { configuracionRestaurante, objetivosFinancieros } from "@/lib/mock-data"
import { CostsTable } from "@/components/costs/costs-table"
import { CategoriesManager } from "@/components/costs/categories-manager"
import { ImportExport } from "@/components/costs/import-export"
import { costsService } from "@/services/costs-service"
import type { CostItem, CostCategory } from "@/types/costs"

// Modificar la primera línea del componente ConfiguracionPage
export default function ConfiguracionPage() {
  const [diasOperativos, setDiasOperativos] = useState(configuracionRestaurante.diasOperativos)
  const [costs, setCosts] = useState<CostItem[]>([])
  const [categories, setCategories] = useState<CostCategory[]>([])
  const [analysis, setAnalysis] = useState(costsService.analyzeData())
  const [previousAnalysis, setPreviousAnalysis] = useState(costsService.getPreviousAnalysis())

  // Cargar datos al montar el componente
  useEffect(() => {
    setCosts(costsService.getCosts())
    setCategories(costsService.getCategories())
    setAnalysis(costsService.analyzeData())
    setPreviousAnalysis(costsService.getPreviousAnalysis())
  }, [])

  const toggleDiaOperativo = (index: number) => {
    const nuevoDias = [...diasOperativos]
    nuevoDias[index].abierto = !nuevoDias[index].abierto
    setDiasOperativos(nuevoDias)
  }

  const toggleTurno = (diaIndex: number, turno: string) => {
    const nuevoDias = [...diasOperativos]
    const dia = nuevoDias[diaIndex]

    if (dia.turnos.includes(turno)) {
      dia.turnos = dia.turnos.filter((t) => t !== turno)
    } else {
      dia.turnos.push(turno)
    }

    setDiasOperativos(nuevoDias)
  }

  // Manejar la adición de un coste
  const handleAddCost = (cost: Omit<CostItem, "id" | "lastUpdated">) => {
    const newCost = costsService.addCost(cost)
    setCosts(costsService.getCosts())
    setAnalysis(costsService.analyzeData())
  }

  // Manejar la actualización de un coste
  const handleUpdateCost = (cost: CostItem) => {
    costsService.updateCost(cost)
    setCosts(costsService.getCosts())
    setAnalysis(costsService.analyzeData())
  }

  // Manejar la eliminación de un coste
  const handleDeleteCost = (id: string) => {
    costsService.deleteCost(id)
    setCosts(costsService.getCosts())
    setAnalysis(costsService.analyzeData())
  }

  // Manejar la adición de una categoría
  const handleAddCategory = (category: Omit<CostCategory, "id">) => {
    const newCategory = costsService.addCategory(category)
    setCategories(costsService.getCategories())
  }

  // Manejar la actualización de una categoría
  const handleUpdateCategory = (category: CostCategory) => {
    try {
      costsService.updateCategory(category)
      setCategories(costsService.getCategories())
    } catch (error) {
      console.error("Error al actualizar categoría:", error)
      // Aquí se podría mostrar un mensaje de error al usuario
    }
  }

  // Manejar la eliminación de una categoría
  const handleDeleteCategory = (id: string) => {
    try {
      costsService.deleteCategory(id)
      setCategories(costsService.getCategories())
    } catch (error) {
      console.error("Error al eliminar categoría:", error)
      // Aquí se podría mostrar un mensaje de error al usuario
    }
  }

  // Manejar la importación de datos
  const handleImportCosts = (file: File) => {
    // En una implementación real, aquí se procesaría el archivo
    // Para este ejemplo, simulamos una importación
    const dummyData = {
      costs: [
        {
          name: "Coste importado 1",
          amount: 500,
          category: "Otros",
          isFixed: false,
          periodicity: "monthly",
        },
        {
          name: "Coste importado 2",
          amount: 1200,
          category: "Otros",
          isFixed: true,
          periodicity: "monthly",
        },
      ],
    }

    costsService.importData(dummyData)
    setCosts(costsService.getCosts())
    setAnalysis(costsService.analyzeData())
    setPreviousAnalysis(costsService.getPreviousAnalysis())
  }

  // Manejar la exportación de datos
  const handleExportCosts = () => {
    return costsService.exportData()
  }

  // Manejar la importación de datos completos
  const handleImportData = (data: {
    costs: Omit<CostItem, "id" | "lastUpdated">[]
    categories?: Omit<CostCategory, "id">[]
  }) => {
    costsService.importData(data)
    setCosts(costsService.getCosts())
    setCategories(costsService.getCategories())
    setAnalysis(costsService.analyzeData())
    setPreviousAnalysis(costsService.getPreviousAnalysis())
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-secondary-blue">Configuración</h2>
      </div>

      <Tabs defaultValue="restaurante" className="space-y-4">
        <TabsList>
          <TabsTrigger value="restaurante">
            <Info className="mr-2 h-4 w-4" />
            Datos del Restaurante
          </TabsTrigger>
          <TabsTrigger value="operativos">
            <SquareStack className="mr-2 h-4 w-4" />
            Parámetros Operativos
          </TabsTrigger>
          <TabsTrigger value="financieros">
            <CreditCard className="mr-2 h-4 w-4" />
            Objetivos Financieros
          </TabsTrigger>
          <TabsTrigger value="costes">
            <PieChart className="mr-2 h-4 w-4" />
            Estructura de Costes
          </TabsTrigger>
          <TabsTrigger value="avanzado">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Avanzado
          </TabsTrigger>
        </TabsList>

        <TabsContent value="restaurante" className="space-y-4">
          <Card className="border-t-4 border-t-primary-light/70">
            <CardHeader>
              <CardTitle>Información General</CardTitle>
              <CardDescription>Datos básicos del restaurante</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre del restaurante</Label>
                  <Input id="nombre" defaultValue={configuracionRestaurante.nombre} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cif">CIF</Label>
                  <Input id="cif" defaultValue={configuracionRestaurante.cif} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input id="direccion" defaultValue={configuracionRestaurante.direccion} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" defaultValue={configuracionRestaurante.telefono} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={configuracionRestaurante.email} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo del restaurante</Label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center">
                    <Info className="h-8 w-8 text-text-secondary" />
                  </div>
                  <Button variant="outline">Cambiar logo</Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operativos" className="space-y-4">
          <Card className="border-t-4 border-t-primary-light/70">
            <CardHeader>
              <CardTitle>Capacidad y Estructura</CardTitle>
              <CardDescription>Configuración de mesas, plazas y horarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="mesas">Número de mesas</Label>
                  <Input id="mesas" type="number" defaultValue={configuracionRestaurante.mesas} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plazas">Plazas totales</Label>
                  <Input id="plazas" type="number" defaultValue={configuracionRestaurante.plazas} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plazas-por-mesa">Plazas promedio por mesa</Label>
                  <Input
                    id="plazas-por-mesa"
                    type="number"
                    value={(configuracionRestaurante.plazas / configuracionRestaurante.mesas).toFixed(1)}
                    disabled
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Turnos diarios</h3>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Hora inicio</TableHead>
                      <TableHead>Hora fin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {configuracionRestaurante.turnosDiarios.map((turno, index) => (
                      <TableRow key={index}>
                        <TableCell>{turno.nombre}</TableCell>
                        <TableCell>{turno.horaInicio}</TableCell>
                        <TableCell>{turno.horaFin}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Button variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Añadir turno
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Días operativos</h3>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Día</TableHead>
                      <TableHead>Abierto</TableHead>
                      <TableHead>Comida</TableHead>
                      <TableHead>Cena</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {diasOperativos.map((dia, index) => (
                      <TableRow key={index}>
                        <TableCell>{dia.dia}</TableCell>
                        <TableCell>
                          <Switch checked={dia.abierto} onCheckedChange={() => toggleDiaOperativo(index)} />
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={dia.turnos.includes("Comida")}
                            onCheckedChange={() => toggleTurno(index, "Comida")}
                            disabled={!dia.abierto}
                          />
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={dia.turnos.includes("Cena")}
                            onCheckedChange={() => toggleTurno(index, "Cena")}
                            disabled={!dia.abierto}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financieros" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Objetivos Financieros</CardTitle>
              <CardDescription>Establecer metas para las métricas clave</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ocupacion-minima">Ocupación mínima (Punto de equilibrio) %</Label>
                  <Input id="ocupacion-minima" type="number" defaultValue={objetivosFinancieros.ocupacionMinima} />
                  <p className="text-xs text-text-secondary">Ocupación necesaria para cubrir costes</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ocupacion-objetivo">Ocupación objetivo %</Label>
                  <Input id="ocupacion-objetivo" type="number" defaultValue={objetivosFinancieros.ocupacionObjetivo} />
                  <p className="text-xs text-text-secondary">Ocupación que deseas alcanzar</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ticket-medio-objetivo">Ticket medio objetivo</Label>
                  <Input
                    id="ticket-medio-objetivo"
                    type="number"
                    defaultValue={objetivosFinancieros.ticketMedioObjetivo}
                  />
                  <p className="text-xs text-text-secondary">Ticket medio que deseas alcanzar en €</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="margen-bruto-objetivo">Margen bruto objetivo %</Label>
                  <Input
                    id="margen-bruto-objetivo"
                    type="number"
                    defaultValue={objetivosFinancieros.margenBrutoObjetivo}
                  />
                  <p className="text-xs text-text-secondary">Porcentaje de margen bruto objetivo</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ebitda-objetivo">EBITDA objetivo %</Label>
                  <Input id="ebitda-objetivo" type="number" defaultValue={objetivosFinancieros.ebitdaObjetivo} />
                  <p className="text-xs text-text-secondary">Porcentaje de EBITDA sobre ventas</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incremento-ventas">Incremento de ventas anual objetivo %</Label>
                  <Input
                    id="incremento-ventas"
                    type="number"
                    defaultValue={objetivosFinancieros.incrementoVentasAnual}
                  />
                  <p className="text-xs text-text-secondary">Porcentaje de crecimiento anual</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Goal className="mr-2 h-4 w-4" />
                  Guardar objetivos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costes" className="space-y-4">
          <Tabs defaultValue="lista" className="space-y-4">
            <TabsList>
              <TabsTrigger value="lista">Lista de Costes</TabsTrigger>
              <TabsTrigger value="categorias">Categorías</TabsTrigger>
              <TabsTrigger value="importar">Importar/Exportar</TabsTrigger>
            </TabsList>

            <TabsContent value="lista" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Costes</CardTitle>
                  <CardDescription>Añade, edita y elimina los costes de tu restaurante</CardDescription>
                </CardHeader>
                <CardContent>
                  <CostsTable
                    costs={costs}
                    categories={categories}
                    onAddCost={handleAddCost}
                    onUpdateCost={handleUpdateCost}
                    onDeleteCost={handleDeleteCost}
                    onImportCosts={handleImportCosts}
                    onExportCosts={handleExportCosts}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categorias" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Categorías</CardTitle>
                  <CardDescription>Configura las categorías para clasificar tus costes</CardDescription>
                </CardHeader>
                <CardContent>
                  <CategoriesManager
                    categories={categories}
                    onAddCategory={handleAddCategory}
                    onUpdateCategory={handleUpdateCategory}
                    onDeleteCategory={handleDeleteCategory}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="importar" className="space-y-4">
              <ImportExport onImport={handleImportData} onExport={handleExportCosts} categories={categories} />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="avanzado" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuraciones Avanzadas</CardTitle>
              <CardDescription>Integraciones y opciones adicionales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Supabase (Base de datos)</h3>
                    <p className="text-sm text-text-secondary">Integración con Supabase para almacenar datos</p>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">TPV</h3>
                    <p className="text-sm text-text-secondary">Integración con sistema de punto de venta</p>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Zoho</h3>
                    <p className="text-sm text-text-secondary">Integración con Zoho para facturación</p>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Banktrack</h3>
                    <p className="text-sm text-text-secondary">Integración con servicios bancarios</p>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
