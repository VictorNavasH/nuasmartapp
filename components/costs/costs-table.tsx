"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { CostItem, CostCategory } from "@/types/costs"
import { PencilIcon, Trash2, Plus, Filter, Download, Upload } from "lucide-react"

interface CostsTableProps {
  costs: CostItem[]
  categories: CostCategory[]
  onAddCost: (cost: Omit<CostItem, "id" | "lastUpdated">) => void
  onUpdateCost: (cost: CostItem) => void
  onDeleteCost: (id: string) => void
  onImportCosts: (file: File) => void
  onExportCosts: () => void
}

export function CostsTable({
  costs,
  categories,
  onAddCost,
  onUpdateCost,
  onDeleteCost,
  onImportCosts,
  onExportCosts,
}: CostsTableProps) {
  const [selectedCost, setSelectedCost] = useState<CostItem | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [filter, setFilter] = useState({
    category: "all",
    isFixed: "all",
  })

  // Estado para el nuevo coste
  const [newCost, setNewCost] = useState<Omit<CostItem, "id" | "lastUpdated">>({
    name: "",
    amount: 0,
    category: "",
    isFixed: false,
    periodicity: "monthly",
  })

  // Filtrar costes según los filtros seleccionados
  const filteredCosts = costs.filter((cost) => {
    if (filter.category !== "all" && cost.category !== filter.category) return false
    if (filter.isFixed !== "all") {
      if (filter.isFixed === "fixed" && !cost.isFixed) return false
      if (filter.isFixed === "variable" && cost.isFixed) return false
    }
    return true
  })

  // Manejar la adición de un nuevo coste
  const handleAddCost = () => {
    onAddCost(newCost)
    setNewCost({
      name: "",
      amount: 0,
      category: "",
      isFixed: false,
      periodicity: "monthly",
    })
    setIsAddDialogOpen(false)
  }

  // Manejar la actualización de un coste
  const handleUpdateCost = () => {
    if (selectedCost) {
      onUpdateCost(selectedCost)
      setSelectedCost(null)
      setIsEditDialogOpen(false)
    }
  }

  // Manejar la importación de costes
  const handleImportClick = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv,.xlsx,.xls"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        onImportCosts(file)
      }
    }
    input.click()
  }

  // Formatear moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    }).format(amount)
  }

  // Obtener color de categoría
  const getCategoryColor = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName)
    return category?.color || "#e2e8f0"
  }

  // Formatear periodicidad
  const formatPeriodicity = (periodicity: string) => {
    switch (periodicity) {
      case "monthly":
        return "Mensual"
      case "quarterly":
        return "Trimestral"
      case "annual":
        return "Anual"
      case "oneTime":
        return "Único"
      default:
        return periodicity
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Select value={filter.category} onValueChange={(value) => setFilter({ ...filter, category: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filter.isFixed} onValueChange={(value) => setFilter({ ...filter, isFixed: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="fixed">Costes fijos</SelectItem>
              <SelectItem value="variable">Costes variables</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={() => setFilter({ category: "all", isFixed: "all" })}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleImportClick}>
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
          <Button variant="outline" size="sm" onClick={onExportCosts}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Añadir coste
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Añadir nuevo coste</DialogTitle>
                <DialogDescription>Introduce los detalles del nuevo coste</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    value={newCost.name}
                    onChange={(e) => setNewCost({ ...newCost, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Importe
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newCost.amount}
                    onChange={(e) => setNewCost({ ...newCost, amount: Number.parseFloat(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Categoría
                  </Label>
                  <Select
                    value={newCost.category}
                    onValueChange={(value) => setNewCost({ ...newCost, category: value })}
                  >
                    <SelectTrigger id="category" className="col-span-3">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subcategory" className="text-right">
                    Subcategoría
                  </Label>
                  <Select
                    value={newCost.subcategory}
                    onValueChange={(value) => setNewCost({ ...newCost, subcategory: value })}
                    disabled={!newCost.category}
                  >
                    <SelectTrigger id="subcategory" className="col-span-3">
                      <SelectValue placeholder="Selecciona una subcategoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {newCost.category &&
                        categories
                          .find((cat) => cat.name === newCost.category)
                          ?.subcategories.map((subcat) => (
                            <SelectItem key={subcat} value={subcat}>
                              {subcat}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="periodicity" className="text-right">
                    Periodicidad
                  </Label>
                  <Select
                    value={newCost.periodicity}
                    onValueChange={(value: "monthly" | "quarterly" | "annual" | "oneTime") =>
                      setNewCost({ ...newCost, periodicity: value })
                    }
                  >
                    <SelectTrigger id="periodicity" className="col-span-3">
                      <SelectValue placeholder="Selecciona la periodicidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Mensual</SelectItem>
                      <SelectItem value="quarterly">Trimestral</SelectItem>
                      <SelectItem value="annual">Anual</SelectItem>
                      <SelectItem value="oneTime">Pago único</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="isFixed" className="text-right">
                    Coste fijo
                  </Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Checkbox
                      id="isFixed"
                      checked={newCost.isFixed}
                      onCheckedChange={(checked) => setNewCost({ ...newCost, isFixed: checked === true })}
                    />
                    <label
                      htmlFor="isFixed"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Este es un coste fijo
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notas
                  </Label>
                  <Textarea
                    id="notes"
                    value={newCost.notes || ""}
                    onChange={(e) => setNewCost({ ...newCost, notes: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddCost}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Subcategoría</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Periodicidad</TableHead>
              <TableHead className="text-right">Importe</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No se encontraron costes. Añade uno nuevo o ajusta los filtros.
                </TableCell>
              </TableRow>
            ) : (
              filteredCosts.map((cost) => (
                <TableRow key={cost.id}>
                  <TableCell className="font-medium">{cost.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      style={{
                        backgroundColor: `${getCategoryColor(cost.category)}20`,
                        borderColor: getCategoryColor(cost.category),
                        color: getCategoryColor(cost.category),
                      }}
                    >
                      {cost.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{cost.subcategory || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={cost.isFixed ? "default" : "secondary"}>{cost.isFixed ? "Fijo" : "Variable"}</Badge>
                  </TableCell>
                  <TableCell>{formatPeriodicity(cost.periodicity)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(cost.amount)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedCost(cost)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => onDeleteCost(cost.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Diálogo de edición */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar coste</DialogTitle>
            <DialogDescription>Modifica los detalles del coste</DialogDescription>
          </DialogHeader>
          {selectedCost && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="edit-name"
                  value={selectedCost.name}
                  onChange={(e) => setSelectedCost({ ...selectedCost, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-amount" className="text-right">
                  Importe
                </Label>
                <Input
                  id="edit-amount"
                  type="number"
                  value={selectedCost.amount}
                  onChange={(e) => setSelectedCost({ ...selectedCost, amount: Number.parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Categoría
                </Label>
                <Select
                  value={selectedCost.category}
                  onValueChange={(value) => setSelectedCost({ ...selectedCost, category: value })}
                >
                  <SelectTrigger id="edit-category" className="col-span-3">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-subcategory" className="text-right">
                  Subcategoría
                </Label>
                <Select
                  value={selectedCost.subcategory}
                  onValueChange={(value) => setSelectedCost({ ...selectedCost, subcategory: value })}
                >
                  <SelectTrigger id="edit-subcategory" className="col-span-3">
                    <SelectValue placeholder="Selecciona una subcategoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .find((cat) => cat.name === selectedCost.category)
                      ?.subcategories.map((subcat) => (
                        <SelectItem key={subcat} value={subcat}>
                          {subcat}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-periodicity" className="text-right">
                  Periodicidad
                </Label>
                <Select
                  value={selectedCost.periodicity}
                  onValueChange={(value: "monthly" | "quarterly" | "annual" | "oneTime") =>
                    setSelectedCost({ ...selectedCost, periodicity: value })
                  }
                >
                  <SelectTrigger id="edit-periodicity" className="col-span-3">
                    <SelectValue placeholder="Selecciona la periodicidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Mensual</SelectItem>
                    <SelectItem value="quarterly">Trimestral</SelectItem>
                    <SelectItem value="annual">Anual</SelectItem>
                    <SelectItem value="oneTime">Pago único</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-isFixed" className="text-right">
                  Coste fijo
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Checkbox
                    id="edit-isFixed"
                    checked={selectedCost.isFixed}
                    onCheckedChange={(checked) => setSelectedCost({ ...selectedCost, isFixed: checked === true })}
                  />
                  <label
                    htmlFor="edit-isFixed"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Este es un coste fijo
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-notes" className="text-right">
                  Notas
                </Label>
                <Textarea
                  id="edit-notes"
                  value={selectedCost.notes || ""}
                  onChange={(e) => setSelectedCost({ ...selectedCost, notes: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateCost}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
