from django.urls import path
from .views import PlaceCreateView, PlaceDetailView, RegisterView,LoginView,UserView,LogoutView
urlpatterns = [
    path('register',RegisterView.as_view()),
    path('login',LoginView.as_view()),
    path('user',UserView.as_view()),
    path('logout',LogoutView.as_view()),
    path('places/create',PlaceCreateView.as_view()),
    path('places', PlaceDetailView.as_view()),

]
