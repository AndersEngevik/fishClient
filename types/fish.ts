export interface Fish {
  id: string
  name: string
  species: string
  lengthInCm: number // in cm
  weightInKg: number // in kg
}

export type CreateFishInput = Omit<Fish, "id">
export type UpdateFishInput = Partial<CreateFishInput>
