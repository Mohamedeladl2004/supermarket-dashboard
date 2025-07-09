import axios from "axios"
import type { Product } from "./types"

const api = axios.create({
  baseURL: "/api", // now calls our internal API route
  headers: { "Content-Type": "application/json" },
})

export const productApi = {
  // GET /api/products
  getAllProducts: async (): Promise<Product[]> => {
    const { data } = await api.get("/products")
    return data
  },

  // POST /api/products
  createProduct: async (productData: Omit<Product, "id">): Promise<Product> => {
    const { data } = await api.post("/products", productData)
    return data
  },

  // GET /api/products/:id - Get single product
  getProductById: async (id: string): Promise<Product> => {
    const { data } = await api.get(`/products/${id}`)
    return data
  },

  // PUT /api/products/:id - Update product
  updateProduct: async (id: string, productData: Omit<Product, "id">): Promise<Product> => {
    const { data } = await api.put(`/products/${id}`, productData)
    return data
  },

  // DELETE /api/products/:id - Delete product
  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`)
  },
}
