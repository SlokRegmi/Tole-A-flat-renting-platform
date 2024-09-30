from django.db import IntegrityError
from django.shortcuts import render
from grpc import Status
from rest_framework.views import APIView
from rest_framework.response import Response
from Tole import settings
from .serializers import PlaceSerializer, UserSerializer
from .models import Place, User
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.http import HttpResponse
from django.views.decorators.http import require_GET
from django.urls import reverse
import requests
import json
from django.http import JsonResponse
from django.shortcuts import redirect
from rest_framework.views import APIView
from django.urls import reverse
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect
import requests
from django.conf import settings
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from django.http import JsonResponse
from django.conf import settings
import requests

class DataFillPlaces(APIView):
    def get(self, request):
        places = [
            {
                'name': 'Patan Durbar Square',
                'latitude': 27.6789,
                'longitude': 85.3240,
                'city': 'lalitpur',
                'image1': '//image//a.png',
                'price': 1000
            },
            {
                'name': 'Bhaktapur Durbar Square',
                'latitude': 27.6710,
                'longitude': 85.4296,
                'city': 'bhaktapur',
                'image1': '//image//b.jpg',
                'price': 1500
            },
            {
                'name': 'Swayambhunath Stupa',
                'latitude': 27.7149,
                'longitude': 85.2903,
                'city': 'kathmandu',
                'image1': '//image//c.png',
                'price': 2000
            },
            {
                'name': 'Boudhanath Stupa',
                'latitude': 27.7211,
                'longitude': 85.3616,
                'city': 'kathmandu',
                'image1': '//image//d.png',
                'price': 2500
            },
            {
                'name': 'Chandragiri Hills',
                'latitude': 27.6526,
                'longitude': 85.2866,
                'city': 'kathmandu',
                'image1': '//image//a.png',
                'price': 3000
            },
            {
                'name': 'Nagarkot',
                'latitude': 27.7172,
                'longitude': 85.5162,
                'city': 'bhaktapur',
                'image1': '//image//b.jpg',
                'price': 3500
            },
            {
                'name': 'Pokhara',
                'latitude': 28.2096,
                'longitude': 83.9856,
                'city': 'pokhara',
                'image1': '//image//c.png',
                'price': 4000
            },
            {
                'name': 'Lumbini',
                'latitude': 27.4840,
                'longitude': 83.2767,
                'city': 'lumbini',
                'image1': '//image//d.png',
                'price': 4500
            }
        ]

        for place in places:
            place_obj = Place(
                name=place.get('name'),
                latitude=place.get('latitude'),
                longitude=place.get('longitude'),
                city=place.get('city'),
                image1=place.get('image1'),
                price=place.get('price')
            )
            place_obj.save()


        return Response({'message': 'Places added successfully'}, status=status.HTTP_201_CREATED)

# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        # Print the incoming data to the console for debugging
        print("Received registration data:", request.data)

        # Proceed with the normal registration process
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            # Print confirmation that registration is successful
            print("Registration successful for user:", serializer.data.get('email'))

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        print("Registration failed:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

import jwt  # Import PyJWT
import datetime
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import User  # Adjust this import based on your models

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        # Get the user by email
        user = User.objects.filter(email=email).first()
        if user is None:
            return Response(
                {'message': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Check if the password is correct
        if not user.check_password(password):
            return Response(
                {'message': 'Incorrect password'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Create the payload for the JWT token
        payload = {
            'id': user.id,  # Use user.id or any unique identifier
            'firstname': user.firstname,  # Additional data you may want to include
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),  # Expiration time
            'iat': datetime.datetime.utcnow(),  # Issued at time
        }
        
        # Encode the payload using PyJWT and your secret key
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')  # Use the 'HS256' algorithm
        
        # Send the decoded payload along with the token
        response = Response(
            {
                'jwt': token,  # Send the token as normal
                'payload': payload  # Send the decoded information (e.g., user ID, firstname)
            },
            status=status.HTTP_200_OK
        )
        
        # Optionally, set the token as an HttpOnly cookie
        response.set_cookie(key='jwt', value=token, httponly=True)
        
        return response


        
class UserView(APIView):
    def get(self,request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        
        try:
            payload = jwt.decode(token,'secret',algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)
class LogoutView(APIView):
    def post(self,request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message':'success'
        }
        return response

class PlaceCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # To handle file uploads

    def post(self, request, *args, **kwargs):
        place_serializer = PlaceSerializer(data=request.data)
        if place_serializer.is_valid():
            place_serializer.save()
            return Response(place_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(place_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PlaceDetailView(APIView):
    def get(self, request, *args, **kwargs):
            places = Place.objects.all()
            data = [{'name':place.name,'lat' : place.latitude, 'lng' : place.longitude, 'id' : place.place_id} for place in places]
            return Response(data, status=status.HTTP_200_OK)
        


class PlaceDescriptionView(APIView):
    def get(self, request,place_id, *args, **kwargs):

        place = Place.objects.filter(place_id=place_id).first()
        if place:
            serializer = PlaceSerializer(place)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Place not found'}, status=status.HTTP_404_NOT_FOUND)

import uuid

import uuid
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User, Place

import requests
from rest_framework.response import Response
from rest_framework.views import APIView
from django.urls import reverse

import uuid
import requests
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, Place

import uuid
import requests
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, Place

import requests
import uuid
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, Place

class PaymentInitiateView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Generate unique purchase order ID
            purchase_order_id = str(uuid.uuid4())

            # Fetch user and place details
            user = User.objects.get(firstname=request.data['firstname'])
            place = Place.objects.get(place_id=request.data['place_id'])

            # Prepare the data to send to Khalti
            payment_data = {
                "return_url": request.build_absolute_uri(reverse('payment_success')),
                "website_url": request.build_absolute_uri(reverse('places', args=[place.place_id])),
                "amount": 100000,  # in paisa (100 paisa = 1 NPR)
                "purchase_order_id": purchase_order_id,
                "purchase_order_name": "Room renting",
                "customer_info": {
                    "name": user.first_name,
                    "email": user.email,
                    "phone": user.phoneno,
                }
            }

            # Send the request to Khalti API
            response = requests.post(
                "https://test-pay.khalti.com/api/v2/initiate_payment/",
                json=payment_data,
                headers={"Authorization": "Key " + settings.KHALTI_SECRET_KEY}
            )

            # Check if the request to Khalti was successful
            if response.status_code == 200:
                payment_url = response.json().get('payment_url')
                return Response({"payment_url": payment_url}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Failed to initiate payment with Khalti", "details": response.content.decode()}, status=response.status_code)

        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Place.DoesNotExist:
            return Response({"error": "Place not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": f"Internal server error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class PaymentSuccessView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            # You can handle the payment success here
            # E.g., updating the order status in your database
            return Response({"message": "Payment successful"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": f"Internal server error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Google AUTH 

from django.contrib.auth import get_user_model

import logging
from django.conf import settings

logger = logging.getLogger(__name__)
def google_login(request):
    google_auth_url = (
        f"https://accounts.google.com/o/oauth2/v2/auth?"
        f"client_id={settings.GOOGLE_CLIENT_ID}&"
        f"redirect_uri={settings.GOOGLE_REDIRECT_URI}&"
        f"response_type=code&"
        f"scope=openid email profile"  # Ensure these scopes are URL encoded if necessary
    )
    return JsonResponse({"url": google_auth_url})

User = get_user_model()
def google_callback(request):
    code = request.GET.get('code')
    token_url = 'https://oauth2.googleapis.com/token'
    token_data = {
        'code': code,
        'client_id': settings.GOOGLE_CLIENT_ID,
        'client_secret': settings.GOOGLE_CLIENT_SECRET,
        'redirect_uri': settings.GOOGLE_REDIRECT_URI,
        'grant_type': 'authorization_code',
    }

    try:
        r = requests.post(token_url, data=token_data)
        r.raise_for_status()  # Raise an error for bad responses
        token_json = r.json()

        idinfo = id_token.verify_oauth2_token(token_json['id_token'], google_requests.Request(), settings.GOOGLE_CLIENT_ID)
        
        email = idinfo.get('email')
        first_name = idinfo.get('given_name')
        last_name = idinfo.get('family_name')

        user, created = User.objects.get_or_create(email=email, defaults={
            'first_name': first_name,
            'last_name': last_name,
        })

        if created:
            user.set_unusable_password()  # No password required since it's Google login
            user.save()

        return JsonResponse({"email": user.email, "name": f"{user.first_name} {user.last_name}"})
    
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': f"Token request failed: {str(e)}"}, status=400)
    except ValueError as e:
        return JsonResponse({'error': f"Invalid token: {str(e)}"}, status=400)
    except IntegrityError as e:
        return JsonResponse({'error': str(e)}, status=500)
