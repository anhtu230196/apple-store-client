import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserRoute = ({ children, ...rest }) => {
    const user = useSelector(state => state.user)

    return user && user.token ? (<Route {...rest} />) : <Redirect to="/" />
}

export default UserRoute