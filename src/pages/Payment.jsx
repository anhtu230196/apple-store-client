import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import "../stripe.css"
import StripeCheckout from '../components/StripeCheckout'

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

function Payment() {
    return (
        <div className="container p-5 text-center">
            <h4>Complete your purchase</h4>
            <Elements stripe={promise}>
                <div className="col-md-8 mx-auto">
                    <StripeCheckout />
                </div>
            </Elements>
        </div>
    )
}

export default Payment
