import React, { useRef, useState } from 'react'
// import { auth } from '../firebase'
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


function Signup() {

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const { signup } = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            return setError('password no matchy')
        }

        try {
            setError('')
            setLoading(true)
            await signup(email, password)
            navigate('/')
        } catch (error) {
            setError('failed to create acc')
        }
        setLoading(false)
    }


    return (
        <>
            <div className='signup-container'>
                <h2>Create Account</h2>
                <p>Already have an account? <Link className='link' to='/login'>Log In</Link></p>
                {error && window.alert(error)}
                <form onSubmit={handleSubmit}>
                    <div>
                        <input className='fname-input' placeholder='first name' />
                        <input className='lname-input' placeholder='last name' />
                    </div>
                    <input id='email' placeholder='email' type='email' value={email} onChange={(event) => setEmail(event.target.value)} required />
                    <input id='password' placeholder='password' type='password' value={password} onChange={(event) => setPassword(event.target.value)} required />
                    <input id='password-confirm' placeholder='confirm password' type='password' value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
                    <button disabled={loading} type='submit'>Sign Up</button>
                </form>
                <div>
                    <div>
                        <input type='checkbox' />
                        <p>I agree to the <Link className='link'>Terms of Service</Link></p>
                    </div>
                    <div>
                        <input type='checkbox' />
                        <p>Keep me updated via email</p>
                    </div>
                </div>



            </div>

        </>
    )
}

export default Signup



    // const emailRef = useRef()
    // const passwordRef = useRef()
    // const passwordConfirmRef = useRef()
    // const { signup } = useAuth()
    // const [error, setError] = useState('')
    // const [loading, setLoading] = useState(false)

    // const handleSubmit = async (event) => {
    //     event.preventDefault()

    //     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //         return setError('passwords do not match')
    //     }

    //     try {
    //         setError('')
    //         setLoading(true)
    //         await signup(emailRef.current.value, passwordRef.current.value)
    //     } catch {
    //         setError('failed to create an account')
    //     }
    //     setLoading(false)
    // }
