import { useRef } from 'react'
import { useTag } from '../../customhook/hashTagHook'
import { createPost } from '../../store/slices/post'
import { useDispatch } from 'react-redux'

function CreatePost() {
  const [value, tags, handleTags, setValue, setTags] = useTag()
  const titleRef = useRef()
  const bodyRef = useRef()
  const typeRef = useRef()
  const imageRef = useRef()
  const dispatch = useDispatch()

  function handleCreatePost(e) {
    e.preventDefault()

    const title = titleRef.current.value
    const body = bodyRef.current.value
    const type = typeRef.current.value
    const image = imageRef.current.files[0]
    const createPostData = {
      title,
      body,
      type,
      image,
      tags,
    }
    dispatch(createPost(createPostData))
    // done
  }

  return (
    <div className="card w-50 m-auto" style={{ width: '18rem' }}>
      <div className="card-body">
        <h6 className="text-center">Create Post</h6>
        <form className="mt-3" onSubmit={handleCreatePost}>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Enter title"
              className="w-100 form-control"
              ref={titleRef}
            />
          </div>
          <div className="mb-2">
            <textarea
              className="form-control"
              placeholder="Enter post body"
              style={{ height: '100px' }}
              ref={bodyRef}
            ></textarea>
          </div>
          <div className="mb-2">
            <select className="w-100 form-control" ref={typeRef}>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
          <div className="mb-2">
            <input
              type="file"
              placeholder="Img"
              className="w-100 form-control"
              ref={imageRef}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Enter tags.."
              className="w-100 form-control"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleTags}
            />
          </div>
          {tags.length > 0 && (
            <div className="mb-3">
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
            <button className="btn btn-primary w-100">Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
