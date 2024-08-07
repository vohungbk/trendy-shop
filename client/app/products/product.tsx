'use client'

import { Card, CardActionArea, Stack, Typography } from '@mui/material'
import { Product as IProduct } from './interface/product.interface'
import Image from 'next/image'
import { API_URL } from '../common/constants/api'
import { useRouter } from 'next/navigation'

interface ProductProps {
  product: IProduct
}

export default function Product({ product }: ProductProps) {
  const router = useRouter()
  return (
    <CardActionArea onClick={() => router.push(`/products/${product.id}`)}>
      <Card sx={{ p: 4 }}>
        <Stack gap={4}>
          <Typography variant='h4'>{product.name}</Typography>
          {!!product.imageExist && (
            <Image
              src={`${API_URL}/images/products/${product.id}.jpg`}
              alt='Product image'
              width='0'
              height='0'
              sizes='100vw'
              className='w-full h-auto'
            />
          )}
          <Typography variant='h4'>{product.description}</Typography>
          <Typography variant='h4'>${product.price}</Typography>
        </Stack>
      </Card>
    </CardActionArea>
  )
}
