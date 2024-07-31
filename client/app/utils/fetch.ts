import { API_URL } from '../constants/api'
import { getErrorMessage } from './errors'

export const post = async (pathName: string, formData: FormData) => {
  const res = await fetch(`${API_URL}/${pathName}`, {
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

  return { error: '' }
}
