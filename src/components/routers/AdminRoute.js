import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'
import { toast } from 'react-toastify';

function AdminRoute({ children, ...rest }) {
    const user = useSelector(state => state.user)

    if (!user) {
        // toast.error("You have no permission! Please signin admin account")
        return <Redirect to="/" />
    }

    if (user?.role !== "admin") {
        toast.error("You have no permission! Please signin admin account")
        return <Redirect to="/" />
    }


    return <Route {...rest} />
}

export default AdminRoute
