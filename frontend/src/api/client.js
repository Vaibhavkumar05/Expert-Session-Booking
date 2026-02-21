import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const getExperts = async (params) => {
  const { data } = await api.get('/experts', { params })
  return data
}

export const getExpertById = async (id) => {
  const { data } = await api.get(`/experts/${id}`)
  return data
}

export const createBooking = async (payload) => {
  const { data } = await api.post('/bookings', payload)
  return data
}

export const getBookingsByEmail = async (email) => {
  const { data } = await api.get('/bookings', { params: { email } })
  return data
}

export default api
