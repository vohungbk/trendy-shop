import { cookies } from 'next/headers'
import { AUTHENTICATION_COOKIE } from '../auth.cookie'

export const authenticate = async () => {
  return !!cookies().get(AUTHENTICATION_COOKIE)
}
