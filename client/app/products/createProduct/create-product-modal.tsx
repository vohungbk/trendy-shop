'use client'

import { Box, Button, Modal, TextField } from '@mui/material'
import React, { FC, useState } from 'react'
import { FormResponse } from '../../common/interface/form-error.interface'
import createProduct from '../actions/createProduct'

interface CreateProductModalProps {
  open: boolean
  handleClose: () => void
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  padding: '16px',
  boxShadow: 24,
  backgroundColor: 'background.paper',
  border: '1px solid #000',
  display: 'flex',
  justifyContent: 'center',
}

export const CreateProductModalProps: FC<CreateProductModalProps> = ({
  open,
  handleClose,
}) => {
  const [response, setResponse] = useState<FormResponse>()

  const onClose = () => {
    setResponse(undefined)
    handleClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <form
          className='w-full max-w-xs flex flex-col gap-4'
          action={async (formData) => {
            const response = await createProduct(formData)
            setResponse(response)
            if (!response.error) {
              onClose()
            }
          }}
        >
          <TextField
            error={!!response?.error}
            helperText={response?.error}
            label='Name'
            name='name'
            variant='outlined'
          />
          <TextField
            error={!!response?.error}
            helperText={response?.error}
            label='Description'
            name='description'
            variant='outlined'
            multiline
            rows={4}
          />
          <TextField
            error={!!response?.error}
            helperText={response?.error}
            label='Price'
            name='price'
            variant='outlined'
          />
          <Button type='submit' variant='contained'>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  )
}
