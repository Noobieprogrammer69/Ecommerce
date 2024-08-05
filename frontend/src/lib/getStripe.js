import { loadStripe } from "@stripe/stripe-js"

let stripePromise

const getStripe = () => {
    if(!stripePromise) {
        stripePromise = loadStripe("pk_test_51Pk1gr0631DQotGCm6ifogaPgoQFHyY1qllrf9kCWbsql5fUqGKVbK61DtenGcPs4AzaoN6kzRk14Uhj40715XKF007fSCxT3f")
    }

    return stripePromise
}

export default getStripe