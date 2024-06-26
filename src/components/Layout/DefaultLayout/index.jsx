import { useAuth } from '../../../App'
import AuthService from '../../../services/auth-service'
import actions from '../../../services/authAction'
import notificationService from '../../../services/notificationService'
import Header from '../Header'
import SideBar from '../SideBar'
import { navigationDefault, navigationUser, navigationAdmin } from '../../../services/routes'

import { useNavigate } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'

export default function DefaultLayout({ children }) {
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
        <div className="flex-1 bg-slate-100 dark:bg-zinc-600">{children}</div>
      </div>
    </div>
  )
}
