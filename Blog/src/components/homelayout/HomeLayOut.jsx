import Home from '../../pages/home/Home'
import { Outlet } from 'react-router-dom'
export default function HomeLayOut() {
  return (
    <>
      <Home />
      <Outlet />
    </>
  )
}
