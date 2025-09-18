import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../../store/slices/user'
import { useDispatch, useSelector } from 'react-redux'

function SignUp() {
  const navigate = useNavigate()
  const isSignUp = useSelector((state) => state.user.isSignUp)
  const fullNameRef = useRef()
  const genderRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch()

  function handleUserSignUp(e) {
    e.preventDefault()

    const fullName = fullNameRef.current.value
    const gender = genderRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value

    const userSignUpData = {
      fullName,
      email,
      password,
      gender,
    }
    dispatch(signUp(userSignUpData))
  }

  useEffect(() => {
    if (isSignUp) {
      navigate('/login')
    }
  }, [isSignUp])

  return (
    <div className="card m-auto w-25">
      <div className="card-body">
        <h6 className="text-center">Sign Up</h6>
        <form className="mt-3" onSubmit={handleUserSignUp}>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Enter fullName"
              className="w-100 form-control"
              ref={fullNameRef}
            />
          </div>
          <div className="mb-2">
            <select className="w-100 form-control" ref={genderRef}>
              <option value="" disabled selected>
                Select gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
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
            <button className="btn btn-warning w-100">signUp</button>
          </div>
          <div className="mb-2">
            <Link to="/login" style={{ fontSize: '0.8em', marginLeft: '40%' }}>
              Already have an account login?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
