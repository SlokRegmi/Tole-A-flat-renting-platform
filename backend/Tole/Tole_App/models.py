from django.db import models
from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField

class User(AbstractUser):
    firstname = models.CharField(max_length=50)  # AbstractUser already has first_name
    lastname = models.CharField(max_length=50)   # AbstractUser already has last_name
    email = models.EmailField(max_length=50, unique=True)
    phoneno = models.CharField(max_length=10, blank=True, null=True)
    password = models.CharField(max_length=100)

    
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'lastname']  # First name and last name are required

    def __str__(self):
        return self.email


class Place(models.Model):
    place_id = models.AutoField(primary_key=True)  # Primary Key for the place
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically add timestamp

    name = models.CharField(max_length=100)  # Name of the place
    latitude = models.DecimalField(max_digits=9, decimal_places=6)  # Latitude
    longitude = models.DecimalField(max_digits=9, decimal_places=6)  # Longitude
    city = models.CharField(max_length=20, default='other')  # City name
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price in some currency
    image1 = CloudinaryField('image1', blank=True, null=True)
    image2 = CloudinaryField('image2', blank=True, null=True)
    image3 = CloudinaryField('image3', blank=True, null=True)
    image4 = CloudinaryField('image4', blank=True, null=True)

    def __str__(self):
        return self.name
