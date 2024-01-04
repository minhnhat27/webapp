import { Navigate, Outlet, Route } from 'react-router-dom'
import { Fragment } from 'react'

import Home from '../pages/Home'
import DefaultLayout from '../components/Layout/DefaultLayout'
import Schedule from '../pages/Schedule/Schedule'
import Login from '../pages/Login/Login'
import ScheduleView from '../pages/ScheduleView'
import Profile from '../pages/Profile'
import { useAuth } from '../App'

export const publicRoutes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/view', component: ScheduleView },
]

export const privateRoutes = [
  { path: '/schedule', component: Schedule },
  { path: '/profile', component: Profile },
]

export const CheckPrivateRoutes = () => {
  const { state } = useAuth()
  if (!state.isAuthenticated) return <Navigate to="/login" />
  else return <Outlet />
}

export const GenerateRoutes = (route) => {
  return route.map((route, index) => {
    const Page = route.component
    let Layout = DefaultLayout

    if (route.layout) {
      Layout = route.layout
    } else if (route.layout === null) {
      Layout = Fragment
    }
    return (
      <Route
        key={index}
        path={route.path}
        element={
          <Layout>
            <Page />
          </Layout>
        }
      />
    )
  })
}
