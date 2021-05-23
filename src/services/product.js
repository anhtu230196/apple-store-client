import axios from 'axios'

export const getProductsByCount = async (count) => {
    return axios.get(`${process.env.REACT_APP_API}/products/${count}`)
}

export const getProduct = (slug) => {
    return axios.get(`${process.env.REACT_APP_API}/product/${slug}`)
}

export const removeProduct = (slug, authtoken) => {
    return axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
        headers: {
            authtoken
        }
    })
}

export const updateProduct = (slug, product, authtoken) => {
    return axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
        headers: {
            authtoken
        }
    })
}

export const createProduct = (product, authtoken) => {
    return axios.post(`${process.env.REACT_APP_API}/product`, product, {
        headers: {
            authtoken
        }
    })
}

export const getProducts = (sort, order, page) => {
    return axios.post(`${process.env.REACT_APP_API}/products`, { sort, order, page })
}

export const getProductsCount = () => {
    return axios.get(`${process.env.REACT_APP_API}/products/total`);
}

export const productStar = (productId, star, authtoken) => {
    return axios.put(`${process.env.REACT_APP_API}/product/star/${productId}`, { star }, {
        headers: {
            authtoken
        }
    })
}

export const getRelated = async (productId) => {
    return axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`)
}

export const fetchProductsByFilter = arg => {
    return axios.post(`${process.env.REACT_APP_API}/search/filters`, arg)
}