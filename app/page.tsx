"use client"

import { useEffect, useState } from "react"
import { FishTable } from "@/components/fish-table"
import { fishApi } from "@/lib/api/fish-api"
import type { Fish, CreateFishInput } from "@/types/fish"

export default function Home() {
  const [fish, setFish] = useState<Fish[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadFish()
  }, [])

  const loadFish = async () => {
    setIsLoading(true)
    try {
      const data = await fishApi.getAll()
      setFish(data)
    } catch (error) {
      console.error("[v0] Failed to load fish:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdd = async (data: CreateFishInput) => {
    const newFish = await fishApi.create(data)
    setFish([...fish, newFish])
  }

  const handleUpdate = async (id: string, data: CreateFishInput) => {
    const updatedFish = await fishApi.update(id, data)
    setFish(fish.map((f) => (f.id === id ? updatedFish : f)))
  }

  const handleDelete = async (id: string) => {
    await fishApi.delete(id)
    setFish(fish.filter((f) => f.id !== id))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <FishTable fish={fish} onAdd={handleAdd} onUpdate={handleUpdate} onDelete={handleDelete} />
      </div>
    </main>
  )
}
