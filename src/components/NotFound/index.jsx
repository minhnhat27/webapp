import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center mt-10">
      <div>Oops!</div>
      <div>404 - Page Not Found</div>
      <Link type="button" className="border-2 border-cyan-500 hover:bg-cyan-200 rounded-lg py-1 px-3 m-3" to="/">
        Home
      </Link>
    </div>
  )
}
