import { Navigate, Route } from 'react-router-dom'
import { Fragment } from 'react'
import { BsHouseFill, BsCalendarWeekFill, BsCalendar2PlusFill, BsCalendar3, BsPersonFill } from 'react-icons/bs'

import Home from '../pages/Home'
import DefaultLayout from '../components/Layout/DefaultLayout'
import Schedule from '../pages/Schedule/Schedule'
import Login from '../pages/Login/Login'
import ScheduleView from '../pages/ScheduleView'
import Profile from '../pages/Profile'
import NotFound from '../components/NotFound'
import UserManagement from '../pages/Admin/UserManagement'
import ScheduleManagement from '../pages/Admin/ScheduleManagement'
import ScheduleManagementLayout from '../components/Layout/ScheduleMangamentLayout'
import Semester from '../pages/Admin/Semester'

export const navigationDefault = [
  { name: 'Trang chủ', to: '/', icon: <BsHouseFill /> },
  { name: 'Xem lịch', to: '/schedule-view', icon: <BsCalendarWeekFill /> },
]

export const navigationUser = [{ name: 'Thêm lịch', to: '/schedule', icon: <BsCalendar2PlusFill /> }]

export const navigationAdmin = [
  { name: 'Quản lý', to: '/schedule-management', icon: <BsCalendar3 /> },
  { name: 'Cán bộ', to: '/user-management', icon: <BsPersonFill /> },
]

export const navigation_Schedule_Management = [
  { name: 'Quản lý lịch thực hành', to: '/schedule-management/practice' },
  { name: 'Quản lý học phần', to: '/schedule-management/course' },
  { name: 'Quản lý lịch giảng dạy', to: '/schedule-management/teaching' },
  { name: 'Quản lý phòng học', to: '/schedule-management/room' },
  { name: 'Học kỳ - Năm học', to: '/schedule-management/semester' },
]

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/schedule-view', component: ScheduleView },
  { path: '*', component: NotFound },
]

const privateRoutes = [
  { path: '/schedule', component: Schedule },
  { path: '/profile', component: Profile },
]

const adminPrivateRoutes = [
  { path: '/schedule-management', component: ScheduleManagement, layout: ScheduleManagementLayout },
  { path: '/user-management', component: UserManagement },

  { path: '/schedule-management/practice', component: ScheduleManagement, layout: ScheduleManagementLayout },
  { path: '/schedule-management/teaching', component: ScheduleManagement, layout: ScheduleManagementLayout },
  { path: '/schedule-management/room', component: ScheduleManagement, layout: ScheduleManagementLayout },
  { path: '/schedule-management/course', component: ScheduleManagement, layout: ScheduleManagementLayout },
  { path: '/schedule-management/semester', component: Semester, layout: ScheduleManagementLayout },
]

export const generatePublicRoutes = (isAuthenticated) => {
  return publicRoutes.map((route, index) => {
    const Page = route.component
    let Layout = DefaultLayout

    if (route.layout) {
      Layout = route.layout
    } else if (route.layout === null) {
      Layout = Fragment
    }
    if (isAuthenticated && route.path === '/login') {
      return <Route key={index} path={route.path} element={<Navigate to="/" />} />
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

export const generatePrivateRoutes = (isAuthenticated) => {
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

export const generateAdminPrivateRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return adminPrivateRoutes.map((route, index) => {
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
    return adminPrivateRoutes.map((route, index) => (
      <Route key={index} path={route.path} element={<Navigate to="/login" />} />
    ))
  }
}
