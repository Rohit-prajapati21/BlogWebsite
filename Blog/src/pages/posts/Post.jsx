import img from '../../assets/technology-communication-icons-symbols-concept.jpg'
import Comment from '../../components/comment/Comment'
import { likeOnPost } from '../../store/slices/post'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletePost } from '../../store/slices/post'
import { useState } from 'react'

function Post({ post, tab }) {
  const currentPost = tab === 'myPosts' ? post : post.postData
  const [doComment, setDoComment] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function hitLikeOnPost() {
    dispatch(likeOnPost(currentPost._id))
  }

  return (
    <div
      className="card"
      style={tab === 'myPosts' ? { cursor: 'pointer', width: '45%' } : {}}
    >
      <img
        src={img}
        className="card-img-top"
        alt="..."
        style={{ height: '300px' }}
      />
      <div className="card-body">
        <h5 className="card-title">{currentPost.title}</h5>
        <p className="card-text">{currentPost.body}</p>
        <div className="d-flex gap-2">
          {currentPost.tags.map((tag) => (
            <span className="badge bg-primary" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="w-100 d-flex flex-row justify-content-end gap-2">
          <i className="bi bi-heart fs-5" onClick={hitLikeOnPost}></i>
          <i
            className="bi bi-chat fs-5"
            onClick={() => {
              if (doComment) {
                setDoComment(false)
              } else {
                setDoComment(true)
              }
            }}
          ></i>
          {tab === 'myPosts' && (
            <>
              <i
                className="bi bi-trash fs-5"
                onClick={() => {
                  dispatch(deletePost(currentPost._id))
                }}
              ></i>
              <i
                className="bi bi-three-dots fs-5"
                onClick={() => {
                  navigate('/edit-post', { state: currentPost })
                }}
              ></i>
            </>
          )}
        </div>
        <div className="w-100 d-flex flex-row justify-content-end gap-1">
          <span>like: {currentPost.likes.count}</span>
          <span>comments: {currentPost.comments.length}</span>
        </div>
        {doComment && <Comment post={currentPost} />}
      </div>
    </div>
  )
}

export default Post

//  <i className="bi bi-trash fs-5"></i>  later use
//           <i className="bi bi-three-dots fs-5"></i>
