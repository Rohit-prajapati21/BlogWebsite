import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTag } from '../../customhook/hashTagHook'
import { useDispatch } from 'react-redux'
import { updatePost } from '../../store/slices/post'
function EditPost() {
  const location = useLocation()
  const dispatch = useDispatch()
  const post = location?.state
  const [editable, setEditable] = useState([])
  const [value, tags, handleTags, setValue, setTags] = useTag()

  const titleRef = useRef()
  const bodyRef = useRef()
  const typeRef = useRef()

  useEffect(() => {
    titleRef.current.value = post?.title
    bodyRef.current.value = post?.body
    typeRef.current.value = post?.type
    setTags(post.tags)
  }, [post])

  function handleUpdatePost(e) {
    e.preventDefault()
    const title = titleRef.current.value
    const body = bodyRef.current.value
    const type = typeRef.current.value
    const DataForUpdatePost = {}
    if (title !== post.title && title !== '') {
      DataForUpdatePost.title = title
    }
    if (body !== post.body && body !== '') {
      DataForUpdatePost.body = body
    }
    if (type !== post.type && type !== '') {
      DataForUpdatePost.type = type
    }

    if (tags.length !== 0) {
      const isBothArraySame = tags.every(
        (tag, index) => tag === post.tags[index]
      )
      if (!isBothArraySame) {
        DataForUpdatePost.tags = tags
      }
    }
    if (Object.keys(DataForUpdatePost).length !== 0) {
      DataForUpdatePost.postId = post._id
      dispatch(updatePost(DataForUpdatePost))
    }
  }

  return (
    <div className="card w-50 m-auto" style={{ width: '18rem' }}>
      <div className="card-body">
        <h6 className="text-center">Update Post</h6>
        <form className="mt-3">
          <div className="mb-2 d-flex gap-2">
            <input
              type="text"
              placeholder="Enter title"
              className="w-100 form-control"
              disabled={!editable.includes('title')}
              ref={titleRef}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                setEditable((pre) => [...pre, 'title'])
              }}
            >
              edit
            </button>
          </div>

          <div className="mb-2 d-flex gap-2">
            <textarea
              className="form-control"
              placeholder="Enter post body"
              style={{ height: '100px' }}
              disabled={!editable.includes('body')}
              ref={bodyRef}
            ></textarea>
            <button
              type="button"
              className="btn btn-primary h-25"
              onClick={(e) => {
                e.preventDefault()
                setEditable((pre) => [...pre, 'body'])
              }}
            >
              edit
            </button>
          </div>

          <div className="mb-2 d-flex gap-2">
            <select
              className="w-100 form-control"
              disabled={!editable.includes('type')}
              ref={typeRef}
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                setEditable((pre) => [...pre, 'type'])
              }}
            >
              edit
            </button>
          </div>

          <div className="mb-2 d-flex gap-2">
            <input
              type="text"
              placeholder="Enter tags.."
              className="w-100 form-control"
              disabled={!editable.includes('tags')}
              onKeyDown={handleTags}
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                setEditable((pre) => [...pre, 'tags'])
              }}
            >
              edit
            </button>
          </div>

          {editable.includes('tags') && (
            <div className="mb-3 d-flex gap-2">
              <label>Tags: </label>

              {tags.map((tag) => (
                <span className="badge text-bg-primary m-lg-1">
                  {tag}
                  <i
                    class="bi bi-x"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      const remainTagsAfterRemoveTag = tags.filter(
                        (currentTag) => currentTag !== tag
                      )
                      setTags(remainTagsAfterRemoveTag)
                    }}
                  ></i>
                </span>
              ))}
            </div>
          )}

          <div className="mb-1">
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={handleUpdatePost}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPost
