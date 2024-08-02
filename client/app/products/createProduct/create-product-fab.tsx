'use client'

import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { CreateProductModalProps } from './create-product-modal'
import { useState } from 'react'

export const CreateProductFab = () => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <CreateProductModalProps
        open={modalVisible}
        handleClose={() => setModalVisible(!modalVisible)}
      />
      <div className='absolute bottom-10 left-10'>
        <Fab
          color='primary'
          aria-label='edit'
          onClick={() => setModalVisible(true)}
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  )
}
