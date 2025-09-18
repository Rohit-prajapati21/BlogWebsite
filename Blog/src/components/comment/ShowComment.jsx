import React from 'react'
import img from '../../assets/user.png'
function ShowComment({ comment }) {
  return (
    <div className="bg-light pt-2 ps-2">
      <div className="d-flex gap-3">
        <img src={img} alt="" style={{ height: '35px', width: '35px' }} />
        <h6 className="mb-1 fw-bold mt-2">{comment?.commentBy}</h6>
      </div>
      <div className="ms-5">
        <p className="mb-1">{comment?.comment}</p>
        <small className="text-muted">2 mins ago</small>
      </div>
    </div>
  )
}

export default ShowComment
