import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Paypal = () => {
    return (
        <PayPalScriptProvider options={{ clientId: "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>
    )
}

export default Paypal
