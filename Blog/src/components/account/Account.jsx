import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../store/slices/user'
function Account({ userData }) {
  const fullNameRef = useRef()
  const genderRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch()

  const [editable, setEditable] = useState([])

  useEffect(() => {
    fullNameRef.current.value = userData.fullName
    genderRef.current.value = userData.gender
    emailRef.current.value = userData.email
    passwordRef.current.value = '4745485484'
  }, [userData])

  function handleUpdateUser(e) {
    e.preventDefault()
    const fullName = fullNameRef.current.value
    const gender = genderRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value

    const DataForUserUpdate = {}

    if (fullName !== userData.fullName && fullName !== '') {
      DataForUserUpdate.fullName = fullName
    }

    if (gender !== userData.gender && gender !== '') {
      DataForUserUpdate.gender = gender
    }

    if (email !== userData.email && email !== '') {
      DataForUserUpdate.email = email
    }

    if (password !== '4745485484' && password !== '') {
      DataForUserUpdate.password = password
    }
    if (Object.keys(DataForUserUpdate).length !== 0) {
      dispatch(updateUser(DataForUserUpdate))
    }
  }

  return (
    <div className="card ms-5 mt-3 w-50 h-25">
      <div className="card-body">
        <h6 className="text-center">Account</h6>
        <form className="mt-3">
          <div className="mb-2 d-flex gap-2">
            <input
              type="text"
              placeholder="Enter fullName"
              className="w-100 form-control"
              ref={fullNameRef}
              disabled={!editable.includes('fullName')}
            />
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                setEditable((pre) => [...pre, 'fullName'])
              }}
            >
              edit
            </button>
          </div>
          <div className="mb-2 d-flex gap-2">
            <select
              className="w-100 form-control"
              ref={genderRef}
              disabled={!editable.includes('gender')}
            >
              <option value="" disabled selected>
                Select gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                setEditable((pre) => [...pre, 'gender'])
              }}
            >
              edit
            </button>
          </div>
          <div className="mb-2 d-flex gap-2">
            <input
              type="email"
              placeholder="Enter email"
              className="w-100 form-control"
              ref={emailRef}
              disabled={!editable.includes('email')}
            />
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                setEditable((pre) => [...pre, 'email'])
              }}
            >
              edit
            </button>
          </div>
          <div className="mb-3 d-flex gap-2">
            <input
              type="password"
              placeholder="Enter password"
              className="w-100 form-control"
              ref={passwordRef}
              disabled={!editable.includes('password')}
            />
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                setEditable((pre) => [...pre, 'password'])
              }}
            >
              edit
            </button>
          </div>
          <div>
            <button
              className="btn btn-primary w-100"
              onClick={handleUpdateUser}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Account
