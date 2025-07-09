export interface Product {
  id: string
  name: string
  price: number
  quantity: number
  category: string
  imageUrl: string
}

export interface ProductFormData {
  name: string
  price: string
  quantity: string
  category: string
  imageUrl: string
}
