import ky from 'ky'

const api = ky.create({
  prefixUrl: 'http://localhost:5600/api',
})

export default api
