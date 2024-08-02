import { Grid } from '@mui/material'
import getProduct from './actions/getProduct'
import Product from './product'

export default async function Products() {
  const products = await getProduct()

  return (
    <Grid container spacing={2.5}>
      {products?.map((product) => (
        <Grid key={product.id} item sm={6} xs={12}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  )
}
