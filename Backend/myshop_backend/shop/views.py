from rest_framework import viewsets
from .models import Product, Order, Review, Wishlist
from .serializers import ProductSerializer, OrderSerializer, ReviewSerializer, UserSerializer, WishlistSerializer
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import paypalrestsdk
from decouple import config
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

paypalrestsdk.configure({
    "mode": "sandbox",
    "client_id": config('PAYPAL_CLIENT_ID'),
    "client_secret": config('PAYPAL_CLIENT_SECRET')
})

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
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AdminProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]

class UserProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

class CreatePayPalPayment(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        amount = request.data.get('amount')
        if not amount:
            return Response({'error': 'Amount is required.'}, status=status.HTTP_400_BAD_REQUEST)

        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": request.build_absolute_uri('/payment/execute/'),
                "cancel_url": request.build_absolute_uri('/payment/cancel/')
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Total Purchase",
                        "price": f"{amount:.2f}",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "total": f"{amount:.2f}",
                    "currency": "USD"
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
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        payment_id = request.data.get('payment_id')
        payer_id = request.data.get('payer_id')

        try:
            payment = paypalrestsdk.Payment.find(payment_id)
            if payment.execute({"payer_id": payer_id}):
                return Response({'status': 'Payment executed successfully!'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': payment.error}, status=status.HTTP_400_BAD_REQUEST)
        except paypalrestsdk.ResourceNotFound as error:
            return Response({'error': str(error)}, status=status.HTTP_404_NOT_FOUND)

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

import logging

logger = logging.getLogger(__name__)

class WishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        logger.debug(f'Incoming wishlist data: {self.request.data}')
        serializer.save(user=self.request.user)
