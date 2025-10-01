"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Fish, CreateFishInput } from "@/types/fish"

interface FishFormProps {
  fish?: Fish
  onSubmit: (data: CreateFishInput) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export function FishForm({ fish, onSubmit, onCancel, isSubmitting }: FishFormProps) {
  const [formData, setFormData] = useState<CreateFishInput>({
    name: fish?.name || "",
    species: fish?.species || "",
    lengthInCm: fish?.lengthInCm || 0,
    weightInKg: fish?.weightInKg || 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter fish name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="species">Species</Label>
        <Input
          id="species"
          value={formData.species}
          onChange={(e) => setFormData({ ...formData, species: e.target.value })}
          placeholder="Enter species"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="length">Length (cm)</Label>
          <Input
            id="length"
            type="number"
            step="0.1"
            min="0"
            value={formData.lengthInCm}
            onChange={(e) => setFormData({ ...formData, lengthInCm: Number.parseFloat(e.target.value) })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            step="0.001"
            min="0"
            value={formData.weightInKg}
            onChange={(e) => setFormData({ ...formData, weightInKg: Number.parseFloat(e.target.value) })}
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : fish ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  )
}
