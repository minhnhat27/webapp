import { useAuth } from '../../../App'
import AuthService from '../../../services/auth-service'
import actions from '../../../services/authAction'
import notificationService from '../../../services/notificationService'
import Header from '../Header'
import SideBar from '../SideBar'

import { BsHouseFill, BsPlusCircleFill, BsCalendarWeekFill, BsPersonLinesFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const navigation = [
  { name: 'Trang chủ', to: '/', icon: <BsHouseFill /> },
  { name: 'Hồ sơ', to: '/profile', icon: <BsPersonLinesFill /> },
  { name: 'Thêm lịch', to: '/schedule', icon: <BsPlusCircleFill /> },
  { name: 'Xem lịch', to: '/view', icon: <BsCalendarWeekFill /> },
]

export default function DefaultLayout({ children }) {
  const { dispatch } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    AuthService.logout()
    dispatch(actions.LOGOUT)
    notificationService.Info('Đã đăng xuất')
    navigate('/login')
  }

  return (
    <>
      <div className="flex">
        <div className="sticky border-r dark:border-none h-screen top-0 w-24 shrink-0 lg:block hidden bg-slate-50 dark:bg-zinc-800">
          <SideBar navigation={navigation} handleLogout={handleLogout} />
        </div>
        <div className="w-full flex flex-col min-h-screen">
          <div className="sticky top-0 z-10">
            <Header navigation={navigation} handleLogout={handleLogout} />
          </div>
          <div className="flex-1 bg-slate-100 dark:bg-zinc-600">{children}</div>
        </div>
      </div>
    </>
  )
}
