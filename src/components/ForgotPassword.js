import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

function ForgotPassword() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const { resetPassword } = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(email)
            setMessage('check your inbox for further instructions')
        } catch (error) {
            setError('failed to reset password')
        }
        setLoading(false)
    }


    return (
        <>
            <div>
                <h2>Password Reset</h2>
                {error && window.alert(error)}
                {message && window.alert(message)}
                <form onSubmit={handleSubmit}>
                    <p>email</p>
                    <input id='email' type='email' value={email} onChange={(event) => setEmail(event.target.value)} required />
                    <button disabled={loading} type='submit'>Reset Password</button>
                </form>
            </div>
            <div>
                <Link to='/login'>Log In</Link>
            </div>
            <h3>Need an account? <Link to='/signup'>Sign Up</Link></h3>
        </>
    )
}

export default ForgotPassword