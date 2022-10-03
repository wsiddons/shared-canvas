import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const updateUserEmail = (email) => {
        return updateEmail(currentUser, email)
    }

    const updateUserPassword = (password) => {
        return updatePassword(currentUser, password)
    }

    const data = async () => {
        return await getDocs(collection(db, 'words'))
    }

    useEffect(() => {
        // auth, user => ???
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        logout,
        signup,
        resetPassword,
        updateUserEmail,
        updateUserPassword,
        data
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

