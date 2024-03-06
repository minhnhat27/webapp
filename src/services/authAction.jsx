const LOGIN = (roles) => {
  return {
    type: 'LOGIN',
    roles: (roles && [...roles]) || [],
  }
}

const LOGOUT = {
  type: 'LOGOUT',
}

const actions = {
  LOGIN,
  LOGOUT,
}
export default actions
