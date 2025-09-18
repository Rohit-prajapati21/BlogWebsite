import Sidebar from '../../components/sideprofilebar/Sidebar'
import Account from '../../components/account/Account'
import Posts from '../posts/Posts'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userPost } from '../../store/slices/post'
import EditPost from '../../components/editpost/EditPost'
function Profile() {
  const userData = useSelector((state) => state.user.userData)
  // const userPosts = useSelector((state) => state.post.userPosts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userPost())
  }, [])
  const [tab, setTab] = useState('myAccount')

  function handleTabsButtons(switchToTab) {
    setTab(switchToTab)
  }
  return (
    <div className="w-100 d-flex ps-3 gap-4" style={{}}>
      <Sidebar handleTabsButtons={handleTabsButtons} isTabSelected={tab} />
      <div
        style={{
          border: '1px solid black',
          height: '70vh',
          position: 'sticky',
          top: '90px',
        }}
      ></div>
      {tab === 'myAccount' && <Account userData={userData} />}
      {tab === 'myPosts' && <Posts tab={tab} />}
    </div>
  )
}

export default Profile
