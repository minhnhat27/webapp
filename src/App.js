import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createContext, useContext, useReducer } from 'react'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { GeneratePublicRoutes, GeneratePrivateRoutes } from './services/routes'
import { reducer, initialState } from './services/authReducer'
import NotFound from './components/NotFound/'
import AuthService from './services/auth-service'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <GoogleOAuthProvider clientId={AuthService.clientId}>
        <Router>
          <ReactNotifications />
          <Routes>
            {GeneratePublicRoutes()}
            {GeneratePrivateRoutes(state.isAuthenticated)}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </AuthContext.Provider>
  )
}

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)
export default App
