import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/user'
import { persistor } from '../../store/store'
import { useNavigate } from 'react-router-dom'
function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  return (
    <div className="container position-sticky top-0 z-3 bg-white">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <a className="navbar-brand fw-bold d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              className="me-2"
              viewBox="0 0 16 16"
            >
              <path d="M4 0h8a2 2 0 0 1 2 2v13l-4-2-4 2V2a2 2 0 0 1 2-2z" />
            </svg>
            My Blog
          </a>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="/" className="nav-link px-2 link-secondary">
              Home
            </Link>
          </li>
          <li>
            <Link
              to={isLoggedIn ? '/create-post' : '/login'}
              className="nav-link px-2"
            >
              Create Post
            </Link>
          </li>
          <li>
            <Link
              to={isLoggedIn ? '/footer' : '/login'}
              className="nav-link px-2"
            >
              About
            </Link>
          </li>
        </ul>

        {isLoggedIn ? (
          <div className="col-md-3 text-end">
            <Link to="/profile">
              <i
                class="bi bi-person-circle me-3 fs-4 "
                style={{ position: 'relative', top: '5px' }}
              ></i>
            </Link>
            <button
              type="button"
              className="btn btn-outline-primary me-2"
              onClick={() => {
                dispatch(logout())
                persistor.pause()
                dispatch({ type: 'RESET_STORE' })
                navigate('/')
              }}
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="col-md-3 text-end">
            <Link to="/login">
              <button type="button" className="btn btn-outline-primary me-2">
                Login
              </button>
            </Link>
            <Link to="/sign-up">
              <button type="button" className="btn btn-primary">
                Sign-up
              </button>
            </Link>
          </div>
        )}
      </header>
    </div>
  )
}

export default Navbar
