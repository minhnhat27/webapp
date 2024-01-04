import Image from '../../UI/Image'
import logo from '../../../logo.svg'
import Wrapper from '../../Wrapper'
import { useAuth } from '../../../App'
import Offcanvas from './Offcanvas'

import { Link, NavLink } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import { useEffect, useState } from 'react'
import { BsList } from 'react-icons/bs'
import Button from '../../UI/Button'
import AuthService from '../../../services/auth-service'
import Input from '../../UI/Input'

export default function Header({ navigation, handleLogout }) {
  const { state } = useAuth()
  const currentUser = AuthService.getCurrentUser()
  const isAuthenticated = state.isAuthenticated

  const [darkMode, setDarkMode] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isExpandedProfile, setIsExpandedProfile] = useState(false)

  useEffect(() => {
    // const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    // setDarkMode(darkModeMediaQuery.matches)
    const savedDarkMode = localStorage.getItem('isDarkMode')
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode))
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }, [darkMode])

  const toggleNavbar = () => {
    setIsExpanded((pre) => {
      if (!pre) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
        document.body.style.overflowY = 'auto'
      }
      return !isExpanded
    })
  }

  const handleClickLogout = () => {
    handleLogout()
    toggleProfile()
  }

  const toggleProfile = () => setIsExpandedProfile(!isExpandedProfile)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('isDarkMode', !darkMode)
  }

  return (
    <>
      <div
        onClick={toggleNavbar}
        className="absolute cursor-pointer ml-5 left-0 translate-y-3/4 lg:hidden dark:text-gray-300"
      >
        <BsList className="text-2xl" />
      </div>
      <div className="px-2 w-full h-16 border-b dark:border-none bg-slate-50 dark:bg-zinc-700 flex items-center justify-end">
        {!isAuthenticated ? (
          <div className="mx-1 dark:text-slate-200">
            Bạn chưa đăng nhập. (
            <Link className="text-blue-500" to="/login">
              Đăng nhập
            </Link>
            )
          </div>
        ) : (
          <div className="mx-1 text-slate-600 dark:text-slate-200">
            {currentUser.name} ({currentUser.userId})
          </div>
        )}
        <Tippy
          interactive
          placement="bottom-end"
          visible={isExpandedProfile}
          onClickOutside={toggleProfile}
          render={(attrs) => (
            <div tabIndex="-1" {...attrs} className="w-40 z-10">
              <Wrapper className="rounded-md nav dark:bg-zinc-800 dark:text-gray-300 flex flex-col p-2 space-y-1">
                <NavLink
                  onClick={toggleProfile}
                  to="/profile"
                  className="p-2 rounded-md hover:bg-blue-100 dark:hover:text-gray-900"
                >
                  Trang cá nhân
                </NavLink>
                {!isAuthenticated ? (
                  <NavLink
                    onClick={toggleProfile}
                    to="/login"
                    className="p-2 rounded-md hover:bg-blue-100 dark:hover:text-gray-900"
                  >
                    Đăng nhập
                  </NavLink>
                ) : (
                  <Button
                    onClick={handleClickLogout}
                    className="w-full text-start p-2 rounded-md hover:bg-blue-100 dark:hover:text-gray-900"
                  >
                    Đăng xuất
                  </Button>
                )}

                <label className="relative inline-flex items-center cursor-pointer">
                  <Input
                    onChange={toggleDarkMode}
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={darkMode}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Chế độ tối</span>
                </label>
              </Wrapper>
            </div>
          )}
        >
          <div onClick={toggleProfile}>
            <Image src={logo} alt="" width={50} height={50} className="rounded-full cursor-pointer" />
          </div>
        </Tippy>
      </div>
      <Offcanvas
        navigation={navigation}
        toggleNavbar={toggleNavbar}
        isExpanded={isExpanded}
        isAuthenticated={isAuthenticated}
      />
    </>
  )
}
