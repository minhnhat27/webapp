import { Navigate, Route } from 'react-router-dom'
import { Fragment } from 'react'

import Home from '../pages/Home'
import DefaultLayout from '../components/Layout/DefaultLayout'
import Schedule from '../pages/Schedule/Schedule'
import Login from '../pages/Login/Login'
import ScheduleView from '../pages/ScheduleView'
import Profile from '../pages/Profile'

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/view', component: ScheduleView },
]

const privateRoutes = [
  { path: '/schedule', component: Schedule },
  { path: '/profile', component: Profile },
]

export const GeneratePublicRoutes = () => {
  return publicRoutes.map((route, index) => {
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

export const GeneratePrivateRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return privateRoutes.map((route, index) => {
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
  } else {
    return privateRoutes.map((route, index) => (
      <Route key={index} path={route.path} element={<Navigate to="/login" />} />
    ))
  }
}
