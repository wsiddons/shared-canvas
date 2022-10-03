import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

function UpdateProfile() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

    const { currentUser, updateUserEmail, updateUserPassword } = useAuth()

    const handleSubmit = (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            return setError('password no matchy')
        }

        const promises = []
        setLoading(true)
        setError('')
        if (email !== currentUser.email) {
            promises.push(updateUserEmail(email))
        }
        if (password !== currentUser.password) {
            promises.push(updateUserPassword(password))
        }

        Promise.all(promises).then(() => {
            navigate('/')
        }).catch(() => {
            setError('failed to update account')
        }).finally(() => {
            setLoading(false)
        })

    }


    return (
        <>
            <div className='signup-container'>
                <h2>Update Profile</h2>
                {error && window.alert(error)}
                <form onSubmit={handleSubmit}>
                    <p>email</p>
                    <input id='email' type='email' defaultValue={currentUser.email} onChange={(event) => setEmail(event.target.value)} required />
                    <p>password</p>
                    <input id='password' type='password' placeholder='leave blank to keep the same password' value={password} onChange={(event) => setPassword(event.target.value)} />
                    <p>confirm password</p>
                    <input id='password-confirm' type='password' placeholder='leave blank to keep the same password' value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                    <button disabled={loading} type='submit'>Update</button>
                </form>

                {/* <button onClick={() => console.log(currentUser)}>click me</button> */}
                <div>
                    <Link to='/' className='link'>Cancel</Link>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile