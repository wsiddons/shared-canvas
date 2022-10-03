import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
function Login() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const { login } = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault()

        // if (password !== confirmPassword) {
        //     return setError('password no matchy')
        // }

        try {
            setError('')
            setLoading(true)
            await login(email, password)
            navigate('/pixel-canvas')
        } catch (error) {
            setError('failed to log in')
        }
        setLoading(false)
    }


    return (
        <>
            <div className='signup-container'>
                <h2>Log In</h2>
                {error && window.alert(error)}
                <form onSubmit={handleSubmit}>
                    <input id='email' placeholder='email' type='email' value={email} onChange={(event) => setEmail(event.target.value)} required />
                    <input id='password' placeholder='password' type='password' value={password} onChange={(event) => setPassword(event.target.value)} required />
                    <button disabled={loading} type='submit'>Login</button>
                </form>

                <div>
                    <div>
                        <p>Need an account? <Link className='link' to='/signup'>Sign Up</Link></p>
                    </div>
                    <div>
                        <p><Link className='link' to='/forgot-password'>Forgot Password?</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login