import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import { doc, setDoc, collection, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { ChromePicker } from 'react-color';

function Dashboard() {
    const [color, setColor] = useState('#000')
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const [stroke, setStroke] = useState('')

    // const handleLogout = async () => {
    //     setError('')
    //     try {
    //         await logout()
    //         navigate('/login')
    //     } catch (error) {
    //         setError('failed to log out')
    //     }
    // }

    const clearCanvas = async () => {
        await setDoc(doc(db, 'canvas', 'drawing'), {
            img: ''
        })
    }

    useEffect(() => {
        console.log(stroke / 10)
    }, [stroke])



    return (
        <>
            <Navbar />
            <div className='profile-container'>
                <h2>Profile</h2>
                {error && window.alert(error)}
                <h3>Email: {currentUser.email}</h3>
                <button><Link className='link' to='/update-profile'>Update Profile</Link></button>
                {/* <button><Link to='/gameboard'>Gameboard</Link></button> */}
                {/* <button><Link to='/pixel-canvas'>PixelCanvas</Link></button> */}
                {/* <div>
                    <button onClick={handleLogout}>Log Out</button>
                </div> */}
                {currentUser.email === 'matt@gmail.com' ? <button onClick={clearCanvas}>clear canvas</button> : <></>}

            </div>
            {/* <button onClick={() => console.log(currentUser)}>log profile</button>
            <div className='color-picker'>
                <p>Stroke</p>
                <input onChange={(event) => setStroke(event.target.value)} type="range" min="1" max="100" />

                <button onClick={() => setShowColorPicker(!showColorPicker)}>color picker</button>
                {showColorPicker ? <ChromePicker
                    color={color}
                    onChange={updatedColor => setColor(updatedColor.hex)}
                />
                    :
                    <></>
                }
            </div> */}
        </>
    )
}

export default Dashboard