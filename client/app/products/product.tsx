import { Card, Typography } from '@mui/material'
import { Product as IProduct } from './interface/product.interface'

interface ProductProps {
  product: IProduct
}

export default function Product({ product }: ProductProps) {
  return (
    <Card sx={{ p: 4 }}>
      <Typography variant='h4'>{product.name}</Typography>
      <Typography variant='h4'>{product.description}</Typography>
      <Typography variant='h4'>${product.price}</Typography>
    </Card>
  )
}
