import type { Fish, CreateFishInput, UpdateFishInput } from "@/types/fish"

/**
 * Fish API Client Interface
 *
 * This is a simple abstraction layer for fish CRUD operations.
 * The default implementation uses mock data stored in memory.
 *
 * To use your own API:
 * 1. Implement this interface with your API calls
 * 2. Replace the `fishApi` export at the bottom of this file
 *
 * Example:
 * ```typescript
 * class MyFishApi implements FishApiClient {
 *   async getAll() {
 *     const response = await fetch('/api/fish')
 *     return response.json()
 *   }
 *   // ... implement other methods
 * }
 *
 * export const fishApi = new MyFishApi()
 * ```
 */
export interface FishApiClient {
  getAll(): Promise<Fish[]>
  getById(id: string): Promise<Fish | null>
  create(fish: CreateFishInput): Promise<Fish>
  update(id: string, fish: UpdateFishInput): Promise<Fish>
  delete(id: string): Promise<void>
}

/**
 * Mock implementation using in-memory storage
 * Replace this with your own API implementation
 */
class FishApi implements FishApiClient {
  private fish: Fish[] = [
    {
      id: "1",
      name: "Nemo",
      species: "Clownfish",
      lengthInCm: 11,
      weightInKg: 0.025,
    },
    {
      id: "2",
      name: "Dory",
      species: "Blue Tang",
      lengthInCm: 30,
      weightInKg: 0.6,
    },
    {
      id: "3",
      name: "Bruce",
      species: "Great White Shark",
      lengthInCm: 450,
      weightInKg: 1100,
    },
  ]

  private nextId = 4

  async getAll(): Promise<Fish[]> {
    const response = await fetch("http://localhost:8080/fish")
    const data = await response.json()
    return data
  }

  async getById(id: string): Promise<Fish | null> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return this.fish.find((f) => f.id === id) || null
  }

  async create(input: CreateFishInput): Promise<Fish> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const fish: Fish = {
      id: String(this.nextId++),
      ...input,
    }
    this.fish.push(fish)
    return fish
  }

  async update(id: string, input: UpdateFishInput): Promise<Fish> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const index = this.fish.findIndex((f) => f.id === id)
    if (index === -1) {
      throw new Error("Fish not found")
    }
    this.fish[index] = { ...this.fish[index], ...input }
    return this.fish[index]
  }

  async delete(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    this.fish = this.fish.filter((f) => f.id !== id)
  }
}

/**
 * Export your API client here
 * Replace MockFishApi with your own implementation
 */
export const fishApi = new FishApi()
