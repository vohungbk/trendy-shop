import { cookies } from 'next/headers'
import { API_URL } from '../constants/api'
import { getErrorMessage } from './errors'

const getCookieHeader = () => ({
  Cookie: cookies().toString(),
})

export const post = async (pathName: string, formData: FormData) => {
  const res = await fetch(`${API_URL}/${pathName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getCookieHeader(),
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })

  const parseRes = await res.json()

  if (!res.ok) {
    return { error: getErrorMessage(parseRes) }
  }

  return { error: '' }
}

export const get = async <T>(pathName: string, tags?: string[]) => {
  const res = await fetch(`${API_URL}/${pathName}`, {
    headers: {
      ...getCookieHeader(),
    },
    next: { tags },
  })

  const parseRes = await res.json()

  return parseRes as T
}
