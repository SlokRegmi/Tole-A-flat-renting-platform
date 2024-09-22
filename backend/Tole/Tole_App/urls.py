from django.urls import path
from .views import Payment, PlaceCreateView, PlaceDetailView, RegisterView,LoginView,UserView,LogoutView
urlpatterns = [
    path('register',RegisterView.as_view()),
    path('login',LoginView.as_view()),
    path('user',UserView.as_view()),
    path('logout',LogoutView.as_view()),
    path('places/create',PlaceCreateView.as_view()),
    path('places', PlaceDetailView.as_view()),
    path('payment', Payment.as_view()),
    path('payment/initiate', Payment.as_view(), name='initiate_payment'),
    path('payment/success', Payment.as_view(), name='payment_success'),

]
