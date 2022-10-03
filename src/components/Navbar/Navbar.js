import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function Navbar() {
    const [error, setError] = useState('')
    const { logout } = useAuth()
    const navigate = useNavigate()


    const handleLogout = async () => {
        setError('')
        try {
            await logout()
            navigate('/login')
        } catch (error) {
            setError('failed to log out')
        }
    }
    return (
        <nav>
            <Link className='link' to='/pixel-canvas'><p>Pixel Canvas</p></Link>
            <Link className='link' to='/'><p>Profile</p></Link>
            <Link className='link'><p onClick={handleLogout}>Logout</p></Link>
        </nav>
    )
}

export default Navbar