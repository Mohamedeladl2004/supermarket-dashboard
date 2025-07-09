"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { Product } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { productApi } from "@/lib/api"
import { useToast } from "@/lib/toast-context"
import { Edit, Trash2, Loader2 } from "lucide-react"

interface ProductTableProps {
  products: Product[]
  onProductDeleted: (id: string) => void
}

export function ProductTable({ products, onProductDeleted }: ProductTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { showToast } = useToast()

  const getCategoryColor = (category: string) => {
    const colors = {
      Fruits: "bg-pink-100 text-pink-800 border-pink-200",
      Dairy: "bg-blue-100 text-blue-800 border-blue-200",
      Bakery: "bg-amber-100 text-amber-800 border-amber-200",
      Meat: "bg-red-100 text-red-800 border-red-200",
      Beverages: "bg-purple-100 text-purple-800 border-purple-200",
      Vegetables: "bg-green-100 text-green-800 border-green-200",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getQuantityStatus = (quantity: number) => {
    if (quantity < 30) return "bg-red-100 text-red-800 border-red-200"
    if (quantity < 60) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-green-100 text-green-800 border-green-200"
  }

  const handleDelete = async (product: Product) => {
    try {
      setDeletingId(product.id)
      await productApi.deleteProduct(product.id)
      onProductDeleted(product.id)
      showToast("success", `${product.name} has been deleted successfully`)
    } catch (error) {
      console.error("Error deleting product:", error)
      showToast("error", "Failed to delete product. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Product</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Quantity</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pink-50">
            {products.map((product, index) => (
              <tr
                key={product.id}
                className="hover:bg-pink-25 transition-all duration-300 ease-in-out transform hover:scale-[1.01] group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-pink-50 group-hover:shadow-md transition-shadow duration-300">
                      <Image
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-pink-700 transition-colors duration-300">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-lg font-semibold text-green-600">${product.price.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant="outline"
                    className={`${getQuantityStatus(product.quantity)} font-medium border transition-all duration-300 hover:shadow-sm`}
                  >
                    {product.quantity} units
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant="outline"
                    className={`${getCategoryColor(product.category)} font-medium border transition-all duration-300 hover:shadow-sm`}
                  >
                    {product.category}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Link href={`/edit-product/${product.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 bg-transparent"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </Link>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={deletingId === product.id}
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300 hover:scale-105 disabled:opacity-50 bg-transparent"
                        >
                          {deletingId === product.id ? (
                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 mr-1" />
                          )}
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-2xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Product</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{product.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(product)}
                            className="bg-red-500 hover:bg-red-600 rounded-xl"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
