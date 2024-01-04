import { NavLink } from 'react-router-dom'
import { useAuth } from '../../../App'
import Button from '../../UI/Button'

import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs'

export default function SideBar({ navigation, handleLogout }) {
  const { state } = useAuth()
  const isAuthenticated = state.isAuthenticated

  return (
    <>
      <nav className="nav px-2">
        <div className="w-full mt-20 space-y-1 flex-col items-center justify-center">
          {navigation.map((item, i) => (
            <NavLink
              to={item.to}
              key={i}
              className="hover:bg-blue-100 dark:hover:text-black dark:text-gray-300 rounded-lg h-16 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="flex justify-center">{item.icon}</div>
                <span className="text-xs">{item.name}</span>
              </div>
            </NavLink>
          ))}
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className="hover:bg-blue-100 dark:hover:text-black dark:text-gray-300 my-1 px-1 rounded-lg h-16 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="flex justify-center">
                  <BsArrowRightSquareFill />
                </div>
                <span className="text-xs">Đăng nhập</span>
              </div>
            </NavLink>
          ) : (
            <Button
              type="button"
              onClick={handleLogout}
              className="w-full hover:bg-blue-100 dark:hover:text-black dark:text-gray-300 my-1 px-1 rounded-lg h-16 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="flex justify-center">
                  <BsArrowLeftSquareFill />
                </div>
                <span className="text-xs">Đăng xuất</span>
              </div>
            </Button>
          )}
        </div>
      </nav>
    </>
  )
}
