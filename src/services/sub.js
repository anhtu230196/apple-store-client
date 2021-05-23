import axios from 'axios'

export const getSubs = () => {
    return axios.get(`${process.env.REACT_APP_API}/subs`)
}

export const getSub = (slug) => {
    return axios.get(`${process.env.REACT_APP_API}/sub/${slug}`)
}

export const removeSub = (slug, authtoken) => {
    return axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
        headers: {
            authtoken
        }
    })
}

export const updateSub = (slug, sub, authtoken) => {
    return axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
        headers: {
            authtoken
        }
    })
}

export const createSub = (sub, authtoken) => {
    return axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
        headers: {
            authtoken
        }
    })
}