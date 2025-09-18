import Post from './Post'
import RecentPostBox from '../../components/recentpost/RecentPost'
import { useEffect } from 'react'
import { getAllPosts } from '../../store/slices/post'
import { useDispatch, useSelector } from 'react-redux'

function Posts({ tab }) {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.post.posts)
  const userPosts = useSelector((state) => state.post.userPosts)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])

  if (tab !== 'myPosts') {
    return (
      <div className="container mt-5">
        <div className="row g-4">
          <div className="col-lg-8 col-md-7 col-12">
            {posts.length === 0 && (
              <div>
                <p className="text-center">there is no post</p>
              </div>
            )}
            {posts.length > 0 && (
              <div className="d-flex flex-column gap-4">
                {posts.map((post) => (
                  <Post post={post} key={post.postData._id} tab={tab} />
                ))}
              </div>
            )}
          </div>
          <RecentPostBox posts={posts} />
        </div>
      </div>
    )
  } else {
    return (
      <div className="d-flex flex-wrap gap-3 " style={{ flexBasis: '75%' }}>
        {userPosts.length === 0 && (
          <div>
            <p className="text-center">there is no post</p>
          </div>
        )}
        {userPosts.length !== 0 &&
          userPosts.map((post) => (
            <Post post={post} key={post._id} tab={tab} />
          ))}
      </div>
    )
  }
}

export default Posts
