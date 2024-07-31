'use server'

import { FormError } from '@/app/common/form-error.interface'
import { post } from '@/app/utils/fetch'
import { redirect } from 'next/navigation'

export default async function createUser(
  _preState: FormError,
  formData: FormData,
) {
  const { error } = await post('users', formData)

  if (error) return { error }

  redirect('/')
}
