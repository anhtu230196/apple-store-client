import axios from 'axios'

export const getCoupons = () => {
    return axios.get(`${process.env.REACT_APP_API}/coupons`)
}

export const removeCoupon = (couponId, authtoken) => {
    return axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
        headers: {
            authtoken
        }
    })
}

export const createCoupon = (coupon, authtoken) => {
    return axios.post(`${process.env.REACT_APP_API}/coupon`, { ...coupon }, {
        headers: {
            authtoken
        }
    })
}