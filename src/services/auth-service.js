import axios from 'axios'

const API_URL = 'https://localhost:44304/api/user'

const login = (username, password) => {
  return axios
    .post(API_URL + '/login', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response
    })
}

const register = async (data) => {
  return await axios.post(API_URL + 'signup', data)
}

const logout = () => localStorage.removeItem('user')
const getCurrentUser = () => JSON.parse(localStorage.getItem('user'))

const loginGoogle = (data) => {
  return axios.post(API_URL + '/externalLogin', { credential: data }).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response
  })
}

const clientId = '860017007064-a9kip8evkknfi84pil5euu13n47f5q3e.apps.googleusercontent.com'
// const clientSecret = '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'

const AuthService = {
  login,
  register,
  logout,
  getCurrentUser,
  clientId,
  loginGoogle,
}
export default AuthService
