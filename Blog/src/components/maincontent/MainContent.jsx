import React from 'react'
import img from '../../assets/5396346.jpg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function MainContent() {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Text Section */}
        <div className="col-md-6">
          <h1 className="fw-bold mb-3">Welcome to My Blog</h1>
          <p className="lead">
            Where ideas meet inspiration. Discover articles, stories, and
            insights crafted to inform and inspire.
          </p>

          <button
            className="btn btn-dark"
            onClick={() => {
              if (isLoggedIn) {
                navigate('/posts')
              } else {
                navigate('/login')
              }
            }}
          >
            Start
          </button>
        </div>

        {/* Image Section */}
        <div className="col-md-6 text-center">
          <img
            src={img}
            alt="Blog illustration"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
  )
}

export default MainContent
