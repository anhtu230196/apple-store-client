import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { auth } from '../../firebase'

function ForgotPassword({ history }) {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (user && user.token) history.push("/")
    }, [user, history])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true
        }
        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail('')
                setLoading(false)
                toast.success("Check your email for password reset")
            })
            .catch(error => {
                setLoading(false)
                toast.error(error.message)
            })
    }
    return (
        <div className="container col-md-6 offset-md-3 p-5">
            <h5 className="text-center">Forget Password</h5>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your Email"
                />
                <br />
                <button className="btn btn-raised" disabled={!email}>Submit</button>
            </form>
        </div>
    )
}

export default ForgotPassword
