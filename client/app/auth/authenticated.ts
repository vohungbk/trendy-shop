import { cookies } from 'next/headers'

export const authenticate = async () => {
  return !!cookies().get('Authentication')
}
