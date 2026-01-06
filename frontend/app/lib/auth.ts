import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api"
})

type AuthStartResponde = {
  authURL: string
}

const getAuthUrl = () => {

  return axiosInstance.get<AuthStartResponde>("/auth/start")
}

export {
  getAuthUrl
}
