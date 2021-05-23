import axios from 'axios'

export const getCategories = () => {
    return axios.get(`${process.env.REACT_APP_API}/categories`)
}

export const getCategory = (slug) => {
    return axios.get(`${process.env.REACT_APP_API}/category/${slug}`)
}

export const removeCategory = (slug, authtoken) => {
    return axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
        headers: {
            authtoken
        }
    })
}

export const updateCategory = (slug, category, authtoken) => {
    return axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
        headers: {
            authtoken
        }
    })
}

export const createCategory = (category, authtoken) => {
    return axios.post(`${process.env.REACT_APP_API}/category`, category, {
        headers: {
            authtoken
        }
    })
}

export const getCategorySubs = (_id) => {
    return axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`)
}