'use client'

import { Grid } from '@mui/material'
import { FC, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { API_URL } from '../common/constants/api'
import revalidateProduct from './actions/revalidate-product'
import { Product as IProduct } from './interface/product.interface'
import Product from './product'
import getAuthentication from '../auth/actions/get-authentication'

interface ProductsGridProps {
  products: IProduct[]
}

export const ProductsGrid: FC<ProductsGridProps> = ({ products }) => {
  useEffect(() => {
    let socket: Socket

    const createSocket = async () => {
      socket = io(API_URL!, {
        auth: {
          Authentication: await getAuthentication(),
        },
      })

      socket.on('productUpdated', () => {
        revalidateProduct()
      })
    }

    createSocket()
    return () => {
      socket?.disconnect()
    }
  }, [])

  return (
    <Grid container spacing={2.5} sx={{ height: '85vh', overflowY: 'scroll' }}>
      {products?.map((product) => (
        <Grid key={product.id} item sm={6} xs={12}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  )
}
