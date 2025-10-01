"use client"

import { useState } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { FishForm } from "./fish-form"
import type { Fish, CreateFishInput } from "@/types/fish"

interface FishTableProps {
  fish: Fish[]
  onAdd: (data: CreateFishInput) => Promise<void>
  onUpdate: (id: string, data: CreateFishInput) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function FishTable({ fish, onAdd, onUpdate, onDelete }: FishTableProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingFish, setEditingFish] = useState<Fish | null>(null)
  const [deletingFish, setDeletingFish] = useState<Fish | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAdd = async (data: CreateFishInput) => {
    setIsSubmitting(true)
    try {
      await onAdd(data)
      setIsAddDialogOpen(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdate = async (data: CreateFishInput) => {
    if (!editingFish) return
    setIsSubmitting(true)
    try {
      await onUpdate(editingFish.id, data)
      setEditingFish(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingFish) return
    setIsSubmitting(true)
    try {
      await onDelete(deletingFish.id)
      setDeletingFish(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Fish Registry</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your fish collection</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Fish
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Species</TableHead>
              <TableHead className="text-right">Length (cm)</TableHead>
              <TableHead className="text-right">Weight (kg)</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fish.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No fish in registry. Add your first fish to get started.
                </TableCell>
              </TableRow>
            ) : (
              fish.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">{f.name}</TableCell>
                  <TableCell>{f.species}</TableCell>
                  <TableCell className="text-right font-mono">{f.lengthInCm}</TableCell>
                  <TableCell className="text-right font-mono">{f.weightInKg}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setEditingFish(f)} aria-label="Edit fish">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeletingFish(f)} aria-label="Delete fish">
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

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Fish</DialogTitle>
            <DialogDescription>Enter the details of the fish you want to add to the registry.</DialogDescription>
          </DialogHeader>
          <FishForm onSubmit={handleAdd} onCancel={() => setIsAddDialogOpen(false)} isSubmitting={isSubmitting} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingFish} onOpenChange={(open) => !open && setEditingFish(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Fish</DialogTitle>
            <DialogDescription>Update the details of {editingFish?.name}.</DialogDescription>
          </DialogHeader>
          {editingFish && (
            <FishForm
              fish={editingFish}
              onSubmit={handleUpdate}
              onCancel={() => setEditingFish(null)}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingFish} onOpenChange={(open) => !open && setDeletingFish(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {deletingFish?.name} from the registry. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isSubmitting}>
              {isSubmitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
