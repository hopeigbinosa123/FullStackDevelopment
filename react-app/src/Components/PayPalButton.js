import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CircularProgress, Box } from '@mui/material';

const PayPalButtonComponent = ({ amount, currency = "USD", onSuccess }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <PayPalScriptProvider options={{ "client-id": "AalmtkD0B6LLii4CU1sKPu4f_po0WXDC9edKBboXXE6xtMNMIryVkTp6Vaz_4xC_8M82inG_rRzAmo_R", "currency": "USD" }}>
            {isLoading && (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Box>
            )}
            <PayPalButtons
                style={{ layout: 'vertical' }}
                createOrder={(data, actions) => {
                    setIsLoading(false);
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: amount,
                                currency_code: "USD" // Explicitly set to USD
                            }
                        }]
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(details => {
                        alert("Transaction completed by " + details.payer.name.given_name);
                        onSuccess(details);
                        // Call your server to save the transaction details
                        return fetch("/execute-paypal-payment", {
                            method: "post",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                payment_id: data.orderID,
                                payer_id: data.payerID
                            })
                        });
                    });
                }}
                onError={(err) => {
                    console.error(err);
                    alert("An error occurred with your payment");
                }}
                onInit={() => setIsLoading(false)}
            />
        </PayPalScriptProvider>
    );
}

export default PayPalButtonComponent;
