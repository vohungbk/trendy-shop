import getProduct from './actions/getProduct'
import { ProductsGrid } from './products-grid'

export default async function Products() {
  const products = await getProduct()

  return <ProductsGrid products={products} />
}
