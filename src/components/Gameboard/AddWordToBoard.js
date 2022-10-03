import React, { useState } from 'react'
import { database } from '../../firebase'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'


function AddWordToBoard() {
    const { currentUser } = useAuth()


    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    const handleInput = (event) => {
        console.log(event.target.value)
        setInput(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(currentUser)
        try {
            const docRef = await addDoc(collection(db, 'words'), {
                words: input,
                user: currentUser.email
            })
            console.log("Document written with ID: ", docRef.id);

        } catch (error) {
            console.error("Error adding document: ", error);
        }

        setInput('')
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type='text' onChange={handleInput} required />
                    <button type='submit' >Add word</button>
                </form>
            </div>
        </>
    )
}

export default AddWordToBoard