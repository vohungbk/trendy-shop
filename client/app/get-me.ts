'use server'

import { get } from './common/utils/fetch'

export const getMe = () => {
  const res = get('users/me')

  return res
}
