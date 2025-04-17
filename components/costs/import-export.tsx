"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CostItem, CostCategory } from "@/types/costs"
import { Download, Upload, FileText, AlertTriangle, CheckCircle, FileUp } from "lucide-react"

interface ImportExportProps {
  onImport: (data: { costs: Omit<CostItem, "id" | "lastUpdated">[]; categories?: Omit<CostCategory, "id">[] }) => void
  onExport: () => { costs: CostItem[]; categories: CostCategory[] }
  categories: CostCategory[]
}

export function ImportExport({ onImport, onExport, categories }: ImportExportProps) {
  const [importType, setImportType] = useState<"csv" | "excel" | "json">("csv")
  const [exportType, setExportType] = useState<"csv" | "excel" | "json">("csv")
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle")
  const [importMessage, setImportMessage] = useState("")
  const [importFile, setImportFile] = useState<File | null>(null)
  const [mappings, setMappings] = useState<Record<string, string>>({
    name: "nombre",
    amount: "importe",
    category: "categoria",
    subcategory: "subcategoria",
    isFixed: "fijo",
    periodicity: "periodicidad",
    notes: "notas",
  })

  // Manejar la importación de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImportFile(file)
      setImportStatus("idle")
      setImportMessage("")
    }
  }

  // Manejar la importación
  const handleImport = async () => {
    if (!importFile) {
      setImportStatus("error")
      setImportMessage("No se ha seleccionado ningún archivo")
      return
    }

    try {
      // Aquí iría la lógica real de importación según el tipo de archivo
      // Este es un ejemplo simplificado
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          // Simulamos una importación exitosa
          const dummyData = {
            costs: [
              {
                name: "Alquiler local",
                amount: 3500,
                category: "Instalaciones",
                isFixed: true,
                periodicity: "monthly",
              },
              {
                name: "Electricidad",
                amount: 850,
                category: "Suministros",
                isFixed: false,
                periodicity: "monthly",
              },
            ],
          }

          onImport(dummyData)
          setImportStatus("success")
          setImportMessage("Importación completada con éxito. Se importaron 2 registros.")
        } catch (error) {
          setImportStatus("error")
          setImportMessage(`Error al procesar el archivo: ${error.message}`)
        }
      }

      reader.readAsText(importFile)
    } catch (error) {
      setImportStatus("error")
      setImportMessage(`Error al importar: ${error.message}`)
    }
  }

  // Manejar la exportación
  const handleExport = () => {
    try {
      const data = onExport()

      // Aquí iría la lógica real de exportación según el tipo de archivo
      // Este es un ejemplo simplificado
      let content = ""
      let filename = ""

      if (exportType === "json") {
        content = JSON.stringify(data, null, 2)
        filename = "costes_export.json"
      } else if (exportType === "csv") {
        // Convertir a CSV
        const headers = ["name", "amount", "category", "subcategory", "isFixed", "periodicity", "notes", "lastUpdated"]
        const csvRows = [headers.join(",")]

        data.costs.forEach((cost) => {
          const row = headers.map((header) => {
            const value = cost[header]
            if (value === undefined || value === null) return ""
            if (typeof value === "string") return `"${value.replace(/"/g, '""')}"`
            if (typeof value === "boolean") return value ? "true" : "false"
            if (value instanceof Date) return value.toISOString()
            return value
          })
          csvRows.push(row.join(","))
        })

        content = csvRows.join("\n")
        filename = "costes_export.csv"
      } else if (exportType === "excel") {
        // En una implementación real, aquí se generaría un archivo Excel
        // Para este ejemplo, usamos CSV como fallback
        const headers = ["name", "amount", "category", "subcategory", "isFixed", "periodicity", "notes", "lastUpdated"]
        const csvRows = [headers.join(",")]

        data.costs.forEach((cost) => {
          const row = headers.map((header) => {
            const value = cost[header]
            if (value === undefined || value === null) return ""
            if (typeof value === "string") return `"${value.replace(/"/g, '""')}"`
            if (typeof value === "boolean") return value ? "true" : "false"
            if (value instanceof Date) return value.toISOString()
            return value
          })
          csvRows.push(row.join(","))
        })

        content = csvRows.join("\n")
        filename = "costes_export.xlsx"
      }

      // Crear y descargar el archivo
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error al exportar:", error)
      // Aquí se podría mostrar un mensaje de error al usuario
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Importación y Exportación</CardTitle>
        <CardDescription>Gestiona la importación y exportación de datos de costes</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="import" className="space-y-4">
          <TabsList>
            <TabsTrigger value="import">Importar</TabsTrigger>
            <TabsTrigger value="export">Exportar</TabsTrigger>
          </TabsList>

          <TabsContent value="import" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="import-type" className="text-right">
                  Formato
                </Label>
                <Select value={importType} onValueChange={(value: "csv" | "excel" | "json") => setImportType(value)}>
                  <SelectTrigger id="import-type" className="col-span-3">
                    <SelectValue placeholder="Selecciona un formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="import-file" className="text-right">
                  Archivo
                </Label>
                <div className="col-span-3">
                  <Input
                    id="import-file"
                    type="file"
                    accept={importType === "csv" ? ".csv" : importType === "excel" ? ".xlsx,.xls" : ".json"}
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {importFile && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right">
                    <Label>Archivo seleccionado</Label>
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{importFile.name}</span>
                    <span className="text-xs text-muted-foreground">({Math.round(importFile.size / 1024)} KB)</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Mapeo de campos</Label>
                <div className="col-span-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">Campo en el sistema</div>
                    <div className="text-sm font-medium">Campo en el archivo</div>

                    {Object.entries(mappings).map(([systemField, fileField]) => (
                      <React.Fragment key={systemField}>
                        <div className="text-sm">{systemField}</div>
                        <Input
                          value={fileField}
                          onChange={(e) => setMappings({ ...mappings, [systemField]: e.target.value })}
                          className="h-8"
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {importStatus === "success" && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle>Importación exitosa</AlertTitle>
                  <AlertDescription>{importMessage}</AlertDescription>
                </Alert>
              )}

              {importStatus === "error" && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error en la importación</AlertTitle>
                  <AlertDescription>{importMessage}</AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="export-type" className="text-right">
                  Formato
                </Label>
                <Select value={exportType} onValueChange={(value: "csv" | "excel" | "json") => setExportType(value)}>
                  <SelectTrigger id="export-type" className="col-span-3">
                    <SelectValue placeholder="Selecciona un formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Opciones</Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="export-categories" className="rounded border-gray-300" checked />
                    <Label htmlFor="export-categories">Incluir categorías</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="export-all" className="rounded border-gray-300" checked />
                    <Label htmlFor="export-all">Exportar todos los registros</Label>
                  </div>
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <FileUp className="h-4 w-4 text-blue-600" />
                <AlertTitle>Información</AlertTitle>
                <AlertDescription>
                  Se exportarán todos los datos de costes y categorías en el formato seleccionado.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <TabsContent value="import" className="mt-0 flex justify-end space-x-2">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={handleImport} disabled={!importFile}>
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
        </TabsContent>
        <TabsContent value="export" className="mt-0 flex justify-end space-x-2">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </TabsContent>
      </CardFooter>
    </Card>
  )
}
