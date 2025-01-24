import paypalrestsdk
import logging

# Configure PayPal SDK
paypalrestsdk.configure({
    "mode": "sandbox",  # sandbox or live
    "client_id": "AalmtkD0B6LLii4CU1sKPu4f_po0WXDC9edKBboXXE6xtMNMIryVkTp6Vaz_4xC_8M82inG_rRzAmo_R",
    "client_secret": "EES545VrfZTTpbmDPbWyaZfE5C6hwyq7GvDeATCiaHyjtlMtlkbRNCgWH0nlDWg6cdJLkwdCNuKMwtzw"
})

logging.basicConfig(level=logging.INFO)
