import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertCity = payload => api.post(`/city`, payload)
export const getAllCities = () => api.get(`/cities`)
export const updateCityById = (id, payload) => api.put(`/city/${id}`, payload)
export const deleteCityById = id => api.delete(`/city/${id}`)
export const getCityById = id => api.get(`/city/${id}`)

const apis = {
    insertCity,
    getAllCities,
    updateCityById,
    deleteCityById,
    getCityById,
}

export default apis
