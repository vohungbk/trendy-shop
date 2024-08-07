'use server'

import { API_URL } from '@/app/common/constants/api'
import { FormResponse } from '@/app/common/interface/form-error.interface'
import { getErrorMessage } from '@/app/common/utils/errors'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AUTHENTICATION_COOKIE } from '../auth.cookie'

export const login = async (_preState: FormResponse, formData: FormData) => {
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
      name: AUTHENTICATION_COOKIE,
      value: token,
      httpOnly: true,
      secure: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    })
  }
}
