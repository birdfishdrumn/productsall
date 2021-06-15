export type Order = {
  id?: string
  name: string
  price: number
  image?: string
  created_at: Date
}

export type OrderApiJson = {
  orders: Order[]
}
