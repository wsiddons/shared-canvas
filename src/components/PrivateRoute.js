import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// function PrivateRoute({ component: Component, ...rest }) {
function PrivateRoute() {

    const { currentUser } = useAuth()
    return currentUser ? <Outlet /> : <Navigate to='/login' />
    // return (
    //     // <>
    //     //     <Route
    //     //         {...rest}
    //     //         render={props => {
    //     //             return currentUser ? <Component {...props} /> : <Navigate to='/login' />
    //     //         }}
    //     //     />
    //     // </>

    // )
}

export default PrivateRoute