'use server'

import { revalidateTag } from 'next/cache'
import { post } from '../../common/utils/fetch'

export default async function createProduct(formData: FormData) {
  const response = await post('products', formData)
  revalidateTag('products')
  return response
}
