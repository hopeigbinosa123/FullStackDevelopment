import paypalrestsdk
import logging
from decouple import config

# Configure PayPal SDK
paypalrestsdk.configure({
    "mode": "sandbox",  # sandbox or live
    "client_id": config('PAYPAL_CLIENT_ID'),
    "client_secret": config('PAYPAL_CLIENT_SECRET')
})

logging.basicConfig(level=logging.INFO)
