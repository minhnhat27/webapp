import { BrowserRouter as Router, Routes } from 'react-router-dom'
import { createContext, useContext, useReducer } from 'react'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { generatePublicRoutes, generatePrivateRoutes, generateAdminPrivateRoutes } from './services/routes'
import { reducer, initialState } from './services/authReducer'
import AuthService from './services/auth-service'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <GoogleOAuthProvider clientId={AuthService.clientId}>
        <Router>
          <ReactNotifications />
          <Routes>
            {generatePublicRoutes(state.isAuthenticated)}
            {(state.roles.includes('User') || state.roles.length === 0) && generatePrivateRoutes(state.isAuthenticated)}
            {state.roles.includes('Admin') && generateAdminPrivateRoutes(state.isAuthenticated)}
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </AuthContext.Provider>
  )
}

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)
export default App
