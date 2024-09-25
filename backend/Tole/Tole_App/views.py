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

        # Print any validation errors
        print("Registration failed:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        
        user = User.objects.filter(email=email).first()
        if user is None:
            return Response(
                {
                    'message': 'User not found'
                },
                status=status.HTTP_404_NOT_FOUND 
            )
        
        if not user.check_password(password):
            return Response(
                {
                    'message': 'Incorrect password'
                },
                status=status.HTTP_401_UNAUTHORIZED  
            )
        
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        
        response = Response(
            {
                'message': 'Login successful',
                'jwt': token
            },
            status=status.HTTP_200_OK  
        )
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
        category = request.query_params.get('category', None)
        if category:
            places = Place.objects.filter(city=category)
        else:
            places = Place.objects.all()
        if places.exists():
            data = [{'latitude' : place.latitude, 'longitude' : place.longitude, 'id' : place.place_id} for place in places]
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No places found'}, status=status.HTTP_404_NOT_FOUND)
        


class PlaceDescriptionView(APIView):
    def get(self, request, *args, **kwargs):
        place_id = kwargs.get('place_id')
        place = Place.objects.filter(place_id=place_id).first()
        if place:
            serializer = PlaceSerializer(place)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Place not found'}, status=status.HTTP_404_NOT_FOUND)


class Payment(APIView):

    def post(self, request, *args, **kwargs): 
        data = {
            "return_url": request.build_absolute_uri(reverse('payment_success')),  # Dynamically generate return URL
            "website_url":"HTTPS://your.com",  # Dynamically generate website URL
            "amount": request.data['amount'],  # in paisa, so 130000 paisa = 1300 NPR
            "purchase_order_id": "id_123456789",
            "purchase_order_name": "Room renting",
            "customer_info": {
                "name": request.data['name'],
                "email": request.data['email'],
                "phone": request.data['phone']
            }
        }

        headers = {
            "Authorization": f"Key {settings.KHALTI_SECRET_KEY}",
            "Content-Type": "application/json"
        }

        response = requests.post('https://a.khalti.com/api/v2/epayment/initiate/', json=data, headers=headers)

        if response.status_code == 200:
            payment_data = response.json()
            return redirect(payment_data['payment_url'])
        else:
            return JsonResponse({"error": response.json()}, status=response.status_code)

    def get(self, request, *args, **kwargs):  # This will handle GET requests
        pidx = request.GET.get('pidx')
        status = request.GET.get('status')
        transaction_id = request.GET.get('transaction_id')
        amount = request.GET.get('amount')

        if status == "Completed":
            return HttpResponse(f"Payment successful with Transaction ID: {transaction_id}")
        elif status == "Pending":
            return HttpResponse("Payment pending. Please check again later.")
        else:
            return HttpResponse("Payment failed or was canceled.")


