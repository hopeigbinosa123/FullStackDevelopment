from rest_framework import viewsets
from .models import Product, Order, Review
from .serializers import ProductSerializer, OrderSerializer, ReviewSerializer, UserSerializer
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import paypalrestsdk
from .paypal_config import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

# Product, Order, Review ViewSets
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['price', 'created_at']

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

# Admin and User ViewSets for Products
class AdminProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]

class UserProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

# PayPal Payment Views
class CreatePayPalPayment(APIView):
    def post(self, request, *args, **kwargs):
        amount = request.data.get('amount')  # Get the dynamic amount from the request data
        if not amount:
            return Response({'error': 'Amount is required.'}, status=status.HTTP_400_BAD_REQUEST)

        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:8000/payment/execute/",
                "cancel_url": "http://localhost:8000/payment/cancel/"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Total Purchase",
                        "price": f"{amount:.2f}",
                        "currency": "ZAR",  # Ensure the currency is set to USD
                        "quantity": 1
                    }]
                },
                "amount": {
                    "total": f"{amount:.2f}",
                    "currency": "ZAR"  # Ensure the currency is set to USD
                },
                "description": "Payment transaction description."
            }]
        })

        if payment.create():
            approval_url = payment['links'][1]['href']
            return Response({'approval_url': approval_url}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': payment.error}, status=status.HTTP_400_BAD_REQUEST)

class ExecutePayPalPayment(APIView):
    def post(self, request, *args, **kwargs):
        payment_id = request.data.get('payment_id')
        payer_id = request.data.get('payer_id')

        payment = paypalrestsdk.Payment.find(payment_id)

        if payment.execute({"payer_id": payer_id}):
            return Response({'status': 'Payment executed successfully!'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': payment.error}, status=status.HTTP_400_BAD_REQUEST)

# Registration View
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "user": UserSerializer(user).data,
                "message": "User registered successfully!",
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login View
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
