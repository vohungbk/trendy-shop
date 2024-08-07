import React, { FC } from 'react'
import getProduct from '../actions/getProductDetail'
import { Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { getProductImage } from '../product-image'
import Checkout from '@/app/checkout/checkout'

interface ProductDetailProps {
  params: { productId: string }
}

const ProductDetail: FC<ProductDetailProps> = async ({ params }) => {
  const product = await getProduct(params.productId)

  return (
    <Grid container marginBottom={'2rem'} rowGap={3}>
      {product.imageExist && (
        <Grid md={6} xs={12}>
          <Image
            src={getProductImage(product.id)}
            width={0}
            height={0}
            className='w-full sm:w-3/4 h-auto'
            sizes='100vw'
            alt='Picture of the product'
          />
        </Grid>
      )}

      <Grid md={6} xs={12}>
        <Stack gap={3}>
          <Typography variant='h2'>{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography variant='h4'>${product.price}</Typography>
          <Checkout productId={+params.productId} />
        </Stack>
      </Grid>
    </Grid>
  )
}

export default ProductDetail
