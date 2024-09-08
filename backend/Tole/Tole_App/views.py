from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime
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

class LoginView (APIView):
    def post(self,request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('User not found')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')
        
        payload = {
            'id':user.id,
            'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat':datetime.datetime.utcnow()
        }

        token = jwt.encode(payload,'secret',algorithm='HS256').decode('utf-8')
        response = Response()
        response.set_cookie(key='jwt',value=token,httponly=True)
        response.data = {'jwt' : token}
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