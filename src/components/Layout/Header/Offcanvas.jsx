import { BsArrowLeftSquareFill, BsX } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

import { BsArrowRightSquareFill } from 'react-icons/bs'

export default function Offcanvas({ navigation, toggleNavbar, isExpanded, isAuthenticated }) {
  return (
    <div
      className={`${
        isExpanded ? '-translate-x-0' : '-translate-x-full'
      } lg:hidden duration-500 fixed top-0 left-0 w-screen z-20`}
    >
      <div className="md:w-1/3 sm:w-1/2 w-3/4 bg-white dark:bg-zinc-900 shadow-lg h-screen">
        <div className="flex justify-end">
          <span
            onClick={toggleNavbar}
            className="rounded-full cursor-pointer text-gray-500 hover:bg-slate-400 dark:hover:text-gray-100"
          >
            <BsX className="text-2xl " />
          </span>
        </div>
        <div className="nav space-y-1 px-5 pt-2">
          {isAuthenticated || (
            <NavLink
              to="/login"
              onClick={toggleNavbar}
              className="hover:bg-blue-100 dark:hover:text-gray-900 dark:text-gray-300 rounded-md block transition ease-in-out px-3 py-2 text-base"
            >
              <div className="flex items-center">
                <BsArrowRightSquareFill />
                <span className="mx-4">Đăng nhập</span>
              </div>
            </NavLink>
          )}
          {navigation.map((item, i) => (
            <NavLink
              to={item.to}
              key={i}
              onClick={toggleNavbar}
              className="hover:bg-blue-100 dark:hover:text-gray-900 dark:text-gray-300 rounded-md block transition ease-in-out px-3 py-2 text-base"
            >
              <div className="flex items-center">
                {item.icon}
                <span className="mx-4">{item.name}</span>
              </div>
            </NavLink>
          ))}
          {isAuthenticated && (
            <NavLink
              to="/logout"
              onClick={toggleNavbar}
              className="hover:bg-blue-100 dark:hover:text-gray-900 dark:text-gray-300 rounded-md block transition ease-in-out px-3 py-2 text-base"
            >
              <div className="flex items-center">
                <BsArrowLeftSquareFill />
                <span className="mx-4">Đăng xuất</span>
              </div>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  )
}
