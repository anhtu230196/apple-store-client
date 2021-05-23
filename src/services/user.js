import axios from "axios"

export const userCart = (cart, authtoken) => {
    return axios.post(`${process.env.REACT_APP_API}/user/cart`,
        { cart },
        {
            headers: {
                authtoken
            }
        }
    )
}

export const getUserCart = (authtoken) => {
    return axios.get(`${process.env.REACT_APP_API}/user/cart`,
        {
            headers: {
                authtoken
            }
        }
    )
}

export const emptyUserCart = (authtoken) => {
    return axios.delete(`${process.env.REACT_APP_API}/user/cart`,
        {
            headers: {
                authtoken
            }
        }
    )
}

export const saveUserAddress = (authtoken, address) => {
    return axios.post(`${process.env.REACT_APP_API}/user/address`,
        { address },
        {
            headers: {
                authtoken
            }
        }
    )
}

export const applyCoupon = (authtoken, coupon) => {
    return axios.post(`${process.env.REACT_APP_API}/user/cart/coupon`,
        { coupon },
        {
            headers: {
                authtoken
            }
        }
    )
}

export const createOrder = (stripeResponse, authtoken) => {
    return axios.post(`${process.env.REACT_APP_API}/user/order`,
        { stripeResponse },
        {
            headers: {
                authtoken
            }
        }
    )
}

export const createCashOrderForUser = (authtoken, COD, coupon) => {
    return axios.post(`${process.env.REACT_APP_API}/user/cash-order`,
        { COD, couponApplied: coupon },
        {
            headers: {
                authtoken
            }
        }
    )
}

export const getUserOrders = (authtoken) => {
    return axios.get(`${process.env.REACT_APP_API}/user/orders`,
        {
            headers: {
                authtoken
            }
        }
    )
}

export const getWishlist = (authtoken) => {
    return axios.get(`${process.env.REACT_APP_API}/user/wishlist`,
        {
            headers: {
                authtoken
            }
        }
    )
}

export const addWishlist = (productId, authtoken) => {
    return axios.post(`${process.env.REACT_APP_API}/user/wishlist/`,
        { productId },
        {
            headers: {
                authtoken
            }
        }
    )
}

export const removeWishlist = (productId, authtoken) => {
    return axios.put(`${process.env.REACT_APP_API}/user/wishlist/${productId}`,
        {},
        {
            headers: {
                authtoken
            }
        }
    )
}