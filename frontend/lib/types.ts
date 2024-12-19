export type User = {
    id: string
    user_id: string
    username: string
    created_at: string
    role: string
  }

export type Location = {
  id: string
  name: string
}

export type InventoryItem =  {
  id: string
  type: string
  thickness: number
  width: number
  height: number
  quantity: number
  location: { name: string }
}