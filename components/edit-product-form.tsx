"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProductFormData } from "@/lib/types"
import { productApi } from "@/lib/api"
import { useToast } from "@/lib/toast-context"
import { ArrowLeft, Package, DollarSign, Hash, Tag, ImageIcon, AlertCircle, Loader2 } from "lucide-react"

interface EditProductFormProps {
  productId: string
}

export function EditProductForm({ productId }: EditProductFormProps) {
  const router = useRouter()
  const { showToast } = useToast()
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    quantity: "",
    category: "",
    imageUrl: "",
  })
  const [errors, setErrors] = useState<Partial<ProductFormData>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  const categories = ["Fruits", "Vegetables", "Dairy", "Meat", "Bakery", "Beverages", "Snacks", "Frozen"]

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true)
        setLoadError(null)
        const product = await productApi.getProductById(productId)

        setFormData({
          name: product.name,
          price: product.price.toString(),
          quantity: product.quantity.toString(),
          category: product.category,
          imageUrl: product.imageUrl,
        })
      } catch (error) {
        console.error("Error loading product:", error)
        setLoadError("Failed to load product. Please try again.")
        showToast("error", "Failed to load product data")
      } finally {
        setIsLoading(false)
      }
    }

    if (productId) {
      loadProduct()
    }
  }, [productId, showToast])

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {}

    if (!formData.name.trim()) newErrors.name = "Product name is required"
    if (!formData.price || Number.parseFloat(formData.price) <= 0) newErrors.price = "Valid price is required"
    if (!formData.quantity || Number.parseInt(formData.quantity) <= 0) newErrors.quantity = "Valid quantity is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.imageUrl.trim()) newErrors.imageUrl = "Image URL is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const productData = {
        name: formData.name.trim(),
        price: Number.parseFloat(formData.price),
        quantity: Number.parseInt(formData.quantity),
        category: formData.category,
        imageUrl: formData.imageUrl.trim(),
      }

      await productApi.updateProduct(productId, productData)

      showToast("success", "Product updated successfully!")

      setTimeout(() => {
        router.push("/")
        router.refresh()
      }, 1500)
    } catch (error) {
      console.error("Error updating product:", error)
      showToast("error", "Failed to update product. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading product...</h2>
          <p className="text-gray-500 mt-2">Please wait while we fetch the product data</p>
        </div>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Error Loading Product</h2>
          <p className="text-gray-500 mt-2 mb-6">{loadError}</p>
          <Button onClick={() => router.push("/")} className="rounded-xl">
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-pink-600 hover:text-pink-700 hover:bg-pink-50 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
              Edit Product
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">Update the product details below</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center">
                  <Package className="w-4 h-4 mr-2 text-blue-500" />
                  Product Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter product name"
                  disabled={isSubmitting}
                  className={`h-12 rounded-xl border-2 transition-all duration-300 focus:scale-[1.02] ${
                    errors.name
                      ? "border-red-300 focus:border-red-500 bg-red-50"
                      : "border-blue-200 focus:border-blue-400 hover:border-blue-300"
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm animate-pulse">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-semibold text-gray-700 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-blue-500" />
                    Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0.00"
                    disabled={isSubmitting}
                    className={`h-12 rounded-xl border-2 transition-all duration-300 focus:scale-[1.02] ${
                      errors.price
                        ? "border-red-300 focus:border-red-500 bg-red-50"
                        : "border-blue-200 focus:border-blue-400 hover:border-blue-300"
                    }`}
                  />
                  {errors.price && <p className="text-red-500 text-sm animate-pulse">{errors.price}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-sm font-semibold text-gray-700 flex items-center">
                    <Hash className="w-4 h-4 mr-2 text-blue-500" />
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                    placeholder="0"
                    disabled={isSubmitting}
                    className={`h-12 rounded-xl border-2 transition-all duration-300 focus:scale-[1.02] ${
                      errors.quantity
                        ? "border-red-300 focus:border-red-500 bg-red-50"
                        : "border-blue-200 focus:border-blue-400 hover:border-blue-300"
                    }`}
                  />
                  {errors.quantity && <p className="text-red-500 text-sm animate-pulse">{errors.quantity}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-semibold text-gray-700 flex items-center">
                  <Tag className="w-4 h-4 mr-2 text-blue-500" />
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange("category", value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    className={`h-12 rounded-xl border-2 transition-all duration-300 hover:scale-[1.01] ${
                      errors.category
                        ? "border-red-300 focus:border-red-500 bg-red-50"
                        : "border-blue-200 focus:border-blue-400 hover:border-blue-300"
                    }`}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="rounded-lg">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm animate-pulse">{errors.category}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-sm font-semibold text-gray-700 flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2 text-blue-500" />
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  disabled={isSubmitting}
                  className={`h-12 rounded-xl border-2 transition-all duration-300 focus:scale-[1.02] ${
                    errors.imageUrl
                      ? "border-red-300 focus:border-red-500 bg-red-50"
                      : "border-blue-200 focus:border-blue-400 hover:border-blue-300"
                  }`}
                />
                {errors.imageUrl && <p className="text-red-500 text-sm animate-pulse">{errors.imageUrl}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Updating Product...
                  </div>
                ) : (
                  "Update Product"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
