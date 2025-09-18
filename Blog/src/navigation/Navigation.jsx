import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import Navbar from '../components/navbar/NavBar'
import Footer from '../components/footer/Footer'
import SignUp from '../pages/signup/SignUp'
import CreatePost from '../pages/createPost/CreatePost'
import Login from '../pages/login/Login'
import Posts from '../pages/posts/Posts'
import Profile from '../pages/profile/Profile'
import EditPost from '../components/editpost/EditPost'

import HomeLayOut from '../components/homelayout/HomeLayOut'
function Navigation() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element="update post" />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-post" element={<EditPost />} />

        <Route path="/" element={<HomeLayOut />}>
          <Route path="/footer" element={<Footer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation
