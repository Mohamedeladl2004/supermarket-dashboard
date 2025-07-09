import { EditProductForm } from "@/components/edit-product-form"

interface EditProductPageProps {
  params: {
    id: string
  }
}

export default function EditProductPage({ params }: EditProductPageProps) {
  return <EditProductForm productId={params.id} />
}
