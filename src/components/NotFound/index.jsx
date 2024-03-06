import { NavLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex justify-center">
      <div className="mt-24 text-center space-y-2">
        <div className="text-4xl font-semibold">Oops!</div>
        <div className="text-lg">404 - Không tìm thấy trang</div>
        <NavLink type="button" className="border-2 border-cyan-500 hover:bg-cyan-200 rounded-lg py-1 px-3" to="/">
          Trang chủ
        </NavLink>
      </div>
    </div>
  )
}
