'use server'

import { FormResponse } from '@/app/common/interface/form-error.interface'
import { post } from '@/app/common/utils/fetch'
import { redirect } from 'next/navigation'

export default async function createUser(
  _preState: FormResponse,
  formData: FormData,
) {
  const { error } = await post('users', formData)

  if (error) return { error }

  redirect('/')
}
