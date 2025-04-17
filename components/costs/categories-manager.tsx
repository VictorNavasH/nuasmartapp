"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import type { CostCategory } from "@/types/costs"
import { PencilIcon, Trash2, Plus, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ChromePicker } from "react-color"

interface CategoriesManagerProps {
  categories: CostCategory[]
  onAddCategory: (category: Omit<CostCategory, "id">) => void
  onUpdateCategory: (category: CostCategory) => void
  onDeleteCategory: (id: string) => void
}

export function CategoriesManager({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}: CategoriesManagerProps) {
  const [selectedCategory, setSelectedCategory] = useState<CostCategory | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)

  // Estado para la nueva categoría
  const [newCategory, setNewCategory] = useState<Omit<CostCategory, "id">>({
    name: "",
    subcategories: [],
    color: "#02b1c4",
    isEditable: true,
  })

  // Estado para la nueva subcategoría
  const [newSubcategory, setNewSubcategory] = useState("")
  const [editNewSubcategory, setEditNewSubcategory] = useState("")

  // Manejar la adición de una nueva categoría
  const handleAddCategory = () => {
    onAddCategory(newCategory)
    setNewCategory({
      name: "",
      subcategories: [],
      color: "#02b1c4",
      isEditable: true,
    })
    setIsAddDialogOpen(false)
  }

  // Manejar la actualización de una categoría
  const handleUpdateCategory = () => {
    if (selectedCategory) {
      onUpdateCategory(selectedCategory)
      setSelectedCategory(null)
      setIsEditDialogOpen(false)
    }
  }

  // Manejar la adición de una subcategoría
  const handleAddSubcategory = () => {
    if (newSubcategory.trim()) {
      setNewCategory({
        ...newCategory,
        subcategories: [...newCategory.subcategories, newSubcategory.trim()],
      })
      setNewSubcategory("")
    }
  }

  // Manejar la eliminación de una subcategoría
  const handleRemoveSubcategory = (index: number) => {
    setNewCategory({
      ...newCategory,
      subcategories: newCategory.subcategories.filter((_, i) => i !== index),
    })
  }

  // Manejar la adición de una subcategoría en edición
  const handleAddEditSubcategory = () => {
    if (editNewSubcategory.trim() && selectedCategory) {
      setSelectedCategory({
        ...selectedCategory,
        subcategories: [...selectedCategory.subcategories, editNewSubcategory.trim()],
      })
      setEditNewSubcategory("")
    }
  }

  // Manejar la eliminación de una subcategoría en edición
  const handleRemoveEditSubcategory = (index: number) => {
    if (selectedCategory) {
      setSelectedCategory({
        ...selectedCategory,
        subcategories: selectedCategory.subcategories.filter((_, i) => i !== index),
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Gestión de Categorías</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Añadir categoría
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Añadir nueva categoría</DialogTitle>
              <DialogDescription>Introduce los detalles de la nueva categoría</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">
                  Color
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-md cursor-pointer border"
                    style={{ backgroundColor: newCategory.color }}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  />
                  <Input
                    id="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  />
                  {showColorPicker && (
                    <div className="absolute z-10 mt-2">
                      <div className="fixed inset-0" onClick={() => setShowColorPicker(false)} />
                      <ChromePicker
                        color={newCategory.color}
                        onChange={(color) => setNewCategory({ ...newCategory, color: color.hex })}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="subcategories" className="text-right pt-2">
                  Subcategorías
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="subcategories"
                      value={newSubcategory}
                      onChange={(e) => setNewSubcategory(e.target.value)}
                      placeholder="Añadir subcategoría"
                    />
                    <Button type="button" onClick={handleAddSubcategory} size="sm">
                      Añadir
                    </Button>
                  </div>
                  {newCategory.subcategories.length > 0 ? (
                    <div className="space-y-1">
                      {newCategory.subcategories.map((subcat, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                          <span>{subcat}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveSubcategory(index)}
                            className="h-6 w-6"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">No hay subcategorías añadidas</div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddCategory}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Color</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Subcategorías</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No hay categorías. Añade una nueva categoría para empezar.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: category.color }} />
                  </TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {category.subcategories.map((subcat, index) => (
                        <div key={index} className="px-2 py-1 bg-muted text-xs rounded-md">
                          {subcat}
                        </div>
                      ))}
                      {category.subcategories.length === 0 && (
                        <span className="text-sm text-muted-foreground">Sin subcategorías</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedCategory(category)
                          setIsEditDialogOpen(true)
                        }}
                        disabled={!category.isEditable}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteCategory(category.id)}
                        disabled={!category.isEditable}
                      >
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
            <DialogTitle>Editar categoría</DialogTitle>
            <DialogDescription>Modifica los detalles de la categoría</DialogDescription>
          </DialogHeader>
          {selectedCategory && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="edit-name"
                  value={selectedCategory.name}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                  className="col-span-3"
                  disabled={!selectedCategory.isEditable}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-color" className="text-right">
                  Color
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-md cursor-pointer border"
                    style={{ backgroundColor: selectedCategory.color }}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  />
                  <Input
                    id="edit-color"
                    value={selectedCategory.color}
                    onChange={(e) => setSelectedCategory({ ...selectedCategory, color: e.target.value })}
                    disabled={!selectedCategory.isEditable}
                  />
                  {showColorPicker && (
                    <div className="absolute z-10 mt-2">
                      <div className="fixed inset-0" onClick={() => setShowColorPicker(false)} />
                      <ChromePicker
                        color={selectedCategory.color}
                        onChange={(color) => setSelectedCategory({ ...selectedCategory, color: color.hex })}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-subcategories" className="text-right pt-2">
                  Subcategorías
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="edit-subcategories"
                      value={editNewSubcategory}
                      onChange={(e) => setEditNewSubcategory(e.target.value)}
                      placeholder="Añadir subcategoría"
                      disabled={!selectedCategory.isEditable}
                    />
                    <Button
                      type="button"
                      onClick={handleAddEditSubcategory}
                      size="sm"
                      disabled={!selectedCategory.isEditable}
                    >
                      Añadir
                    </Button>
                  </div>
                  {selectedCategory.subcategories.length > 0 ? (
                    <div className="space-y-1">
                      {selectedCategory.subcategories.map((subcat, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                          <span>{subcat}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveEditSubcategory(index)}
                            className="h-6 w-6"
                            disabled={!selectedCategory.isEditable}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">No hay subcategorías añadidas</div>
                  )}
                </div>
              </div>
              {!selectedCategory.isEditable && (
                <Alert variant="warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Categoría predefinida</AlertTitle>
                  <AlertDescription>
                    Esta es una categoría predefinida del sistema y no puede ser modificada.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateCategory} disabled={selectedCategory && !selectedCategory.isEditable}>
              Guardar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
