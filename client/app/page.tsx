import { CreateProductFab } from './products/createProduct/create-product-fab'
import Products from './products/products'

export default async function Home() {
  return (
    <>
      <Products />
      <CreateProductFab />
    </>
  )
}
