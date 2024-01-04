import AuthServive from './auth-service'

export default function authHeader() {
  const user = AuthServive.getCurrentUser()

  if (user && user.accessToken) {
    return {
      Authorization: 'Bearer ' + user.accessToken,
    }
  } else {
    return {}
  }
}
