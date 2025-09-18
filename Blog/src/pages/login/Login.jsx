import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../../store/slices/user'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  function handleUserLogin(e) {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    const userLoginData = {
      email,
      password,
    }
    dispatch(login(userLoginData))
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])

  return (
    <div className="card m-auto w-25">
      <div className="card-body">
        <h6 className="text-center">Login</h6>
        <form className="mt-3" onSubmit={handleUserLogin}>
          <div className="mb-2">
            <input
              type="email"
              placeholder="Enter email"
              className="w-100 form-control"
              ref={emailRef}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Enter password"
              className="w-100 form-control"
              ref={passwordRef}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-warning w-100">
              Login
            </button>
          </div>
          <div className="mb-2">
            <Link
              to="/sign-up"
              style={{ fontSize: '0.8em', marginLeft: '40%' }}
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
