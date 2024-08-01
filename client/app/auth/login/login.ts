'use server'

import { API_URL } from '@/app/common/constants/api'
import { FormError } from '@/app/common/interface/form-error.interface'
import { getErrorMessage } from '@/app/common/utils/errors'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const login = async (_preState: FormError, formData: FormData) => {
  console.log(JSON.stringify(Object.fromEntries(formData)))

  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })

  const parseRes = await res.json()

  if (!res.ok) {
    return { error: getErrorMessage(parseRes) }
  }

  setAuthCookie(res)
  redirect('/')
}

const setAuthCookie = (response: Response) => {
  const setCookieHeader = response.headers.get('Set-Cookie')
  if (setCookieHeader) {
    const token = setCookieHeader.split(';')[0].split('=')[1]

    cookies().set({
      name: 'Authentication',
      value: token,
      httpOnly: true,
      secure: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    })
  }
}
