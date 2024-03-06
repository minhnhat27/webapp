import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = 'https://localhost:44304/api/user'

const login = (data) => {
  return axios.post(API_URL + '/login', data).then((response) => {
    if (response.data.success) {
      const expires = 60 * 60 * 1000
      const inOneHour = new Date(new Date().getTime() + expires)

      Cookies.set('userLogin', JSON.stringify(response.data), { expires: inOneHour })
    }
    return response
  })
}

const register = async (data) => {
  return await axios.post(API_URL + 'signup', data)
}

const logout = () => Cookies.remove('userLogin')

const getCurrentUser = () => Cookies.get('userLogin') && JSON.parse(Cookies.get('userLogin'))

const loginGoogle = (data) => {
  return axios.post(API_URL + '/externalLogin', { credential: data }).then((response) => {
    if (response.data.success) {
      const expires = 60 * 60 * 1000
      const inOneHour = new Date(new Date().getTime() + expires)

      Cookies.set('userLogin', JSON.stringify(response.data), { expires: inOneHour })
    }
    return response
  })
}

const clientId = '860017007064-a9kip8evkknfi84pil5euu13n47f5q3e.apps.googleusercontent.com'
// const clientSecret = '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'

const sendToken = (email) => {
  return axios.post(API_URL + '/sendToken', { email: email })
}

const checkToken = (data) => {
  return axios.post(API_URL + '/checkToken', data)
}

const changePassword = (data) => {
  return axios.post(API_URL + '/changePassword', data)
}

const AuthService = {
  login,
  register,
  logout,
  getCurrentUser,
  clientId,
  loginGoogle,
  sendToken,
  checkToken,
  changePassword,
}
export default AuthService
