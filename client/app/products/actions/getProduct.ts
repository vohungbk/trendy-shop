'use server'

import { get } from '@/app/common/utils/fetch'
import { Product } from '../interface/product.interface'

export default async function getProduct() {
  return get<Product[]>('products', ['products'])
}
