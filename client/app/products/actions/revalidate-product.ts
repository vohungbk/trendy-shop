import { revalidateTag } from 'next/cache'

export default function revalidateProduct() {
  revalidateTag('products')
}
