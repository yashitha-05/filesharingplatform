import api from './axios'

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  register: async (email, password, firstName, lastName) => {
    const response = await api.post('/auth/register', {
      email,
      password,
      firstName,
      lastName,
    })
    return response.data
  },
}
