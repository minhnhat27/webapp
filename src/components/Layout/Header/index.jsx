import Image from '../../UI/Image'
import logo from '../../../logo.svg'
import Wrapper from '../../Wrapper'
import { useAuth } from '../../../App'
import Offcanvas from './Offcanvas'

import { Link, NavLink } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import { useState } from 'react'
import { BsList } from 'react-icons/bs'
import Button from '../../UI/Button'
import AuthService from '../../../services/auth-service'

export default function Header({ navigation, handleLogout }) {
  const { state } = useAuth()
  const currentUser = AuthService.getCurrentUser()
  const isAuthenticated = state.isAuthenticated

  const [isExpanded, setIsExpanded] = useState(false)
  const [isExpandedProfile, setIsExpandedProfile] = useState(false)

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

  return (
    <>
      <div onClick={toggleNavbar} className="absolute cursor-pointer ml-5 left-0 translate-y-3/4 lg:hidden">
        <BsList className="text-2xl" />
      </div>
      <div className="px-2 w-full h-16 border-b bg-slate-50 flex items-center justify-end">
        {!isAuthenticated ? (
          <div className="mx-1">
            Bạn chưa đăng nhập. (
            <Link className="text-blue-500" to="/login">
              Đăng nhập
            </Link>
            )
          </div>
        ) : (
          <div className="mx-1 text-slate-600">
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
              <Wrapper className="rounded-md nav flex flex-col p-2 space-y-1">
                <NavLink onClick={toggleProfile} to="/profile" className="p-2 rounded-md hover:bg-blue-100">
                  Trang cá nhân
                </NavLink>
                {!isAuthenticated ? (
                  <NavLink onClick={toggleProfile} to="/login" className="p-2 rounded-md hover:bg-blue-100">
                    Đăng nhập
                  </NavLink>
                ) : (
                  <Button onClick={handleClickLogout} className="w-full text-start p-2 rounded-md hover:bg-blue-100">
                    Đăng xuất
                  </Button>
                )}
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
