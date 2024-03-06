import { useAuth } from '../../App'

export default function Home() {
  const { state } = useAuth()

  return (
    <>
      <div>Home</div>
      <div>Role: {state.roles.map((item) => item)}</div>
    </>
  )
}
