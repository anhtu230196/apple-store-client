import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { auth } from '../../firebase'
import { createOrUpdateUser } from '../../services/auth'

function RegisterComplete({ history }) {
    const [email, setEmail] = useState(' ')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    // useEffect(() => {
    //     setEmail(localStorage.getItem('emailForRegistration'))
    // }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            toast.error("Email and password is required")
        }
        if (password.length < 6) {
            return toast.error("Password is at least 6 characters")
        }
        if (password !== confirmPassword) {
            return toast.error("Wrong confirm Password!")
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)

            const idTokenResult = await user.getIdTokenResult()

            createOrUpdateUser(idTokenResult.token)
                .then(res => {
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            name: res.data.name,
                            email: user.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id
                        }
                    })
                })
                .catch()

            history.push("/")

        } catch (error) {
            toast.error(error.message)
        }
    }

    const completeRegistrationForm = () => <form onSubmit={handleSubmit} autocomplete="off">
        <div className="form-group">
            <input
                autocomplete="off"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                autoFocus
            />
        </div>

        <div className="form-group">
            <input
                autocomplete="off"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
            />
        </div>

        <div className="form-group">
            <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
            />
        </div>
        <br />
        <button className="btn btn-raised">Register</button>
    </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete
