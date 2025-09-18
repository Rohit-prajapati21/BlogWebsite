import ShowComment from './ShowComment'
import img from '../../assets/user.png'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentOnPost } from '../../store/slices/post'

function Comment({ post }) {
  const [moreComments, setMoreComments] = useState(false)

  const comments = post.comments
  const comment = comments[comments.length - 1]

  const commentRef = useRef()
  const dispatch = useDispatch()
  const postId = post._id

  function addComment() {
    const comment = commentRef.current.value
    const commentData = {
      postId,
      comment,
    }
    dispatch(commentOnPost(commentData))
  }

  return (
    <div className="card mt-2">
      <div className="card-body">
        <div className="d-flex gap-2">
          <img src={img} alt="" style={{ height: '35px', width: '35px' }} />
          <input type="text" className="form-control" ref={commentRef} />
          <button className="btn btn-primary" onClick={addComment}>
            add
          </button>
        </div>
        <div className="d-flex flex-column mt-3 gap-3">
          {moreComments === false && <ShowComment comment={comment} />}
          {moreComments === true &&
            comments.map((comment) => <ShowComment comment={comment} />)}
          <span
            className="bg-light mt-2"
            onClick={() => {
              setMoreComments(true)
            }}
          >
            ...more comments
          </span>
        </div>
      </div>
    </div>
  )
}

export default Comment
