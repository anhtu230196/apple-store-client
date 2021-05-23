import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

function LoadingToRedirect() {
    const history = useHistory()
    const [count, setCount] = useState(5)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(currentCount => --currentCount)
        }, 1000)

        count === 0 && history.push("/")

        return () => clearInterval(interval)
    }, [count])
    return (
        <div>

        </div>
    )
}

export default LoadingToRedirect
