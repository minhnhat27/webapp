import { useAuth } from '../../../App'
import AuthService from '../../../services/auth-service'
import actions from '../../../services/authAction'
import notificationService from '../../../services/notificationService'
import Header from '../Header'
import SideBar from '../SideBar'
import {
  navigationDefault,
  navigationUser,
  navigationAdmin,
  navigation_Schedule_Management,
} from '../../../services/routes'

import { NavLink, useNavigate } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'

export default function ScheduleManagementLayout({ children }) {
  const { state, dispatch } = useAuth()
  const roles = state.roles
  const navigate = useNavigate()
  const [navigation, setNavigation] = useState(navigationDefault)

  const handleLogout = () => {
    AuthService.logout()
    dispatch(actions.LOGOUT)
    notificationService.Info('Đã đăng xuất')
    navigate('/login')
  }

  useLayoutEffect(() => {
    let nav = navigationDefault
    if (roles.includes('User')) {
      nav = [...nav, ...navigationUser]
    }
    if (roles.includes('Admin')) {
      nav = [...nav, ...navigationAdmin]
    }
    setNavigation(nav)
  }, [roles])

  return (
    <div className="flex">
      <div className="sticky border-r dark:border-none max-h-screen overflow-auto top-0 w-24 shrink-0 lg:block hidden bg-slate-50 dark:bg-zinc-800">
        <SideBar navigation={navigation} handleLogout={handleLogout} />
      </div>
      <div className="w-full flex flex-col min-h-screen">
        <div className="sticky top-0 z-10">
          <Header navigation={navigation} handleLogout={handleLogout} />
        </div>
        <div className="flex-1 bg-slate-100 dark:bg-zinc-600">
          <div className="nav-schedule h-16 space-x-1 flex items-center">
            {navigation_Schedule_Management.map((item, i) => {
              return (
                <NavLink
                  to={item.to}
                  key={i}
                  className="border rounded-sm p-1 hover:text-blue-500 hover:border-b-blue-500 hover:border-b-2 transition duration-300"
                >
                  {item.name}
                </NavLink>
              )
            })}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
