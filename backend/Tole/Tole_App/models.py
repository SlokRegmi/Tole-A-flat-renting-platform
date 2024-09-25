from django.db import models
from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField
# Create your models here.
class User(AbstractUser):
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, unique=True)
    phoneno = models.CharField(max_length=10)
    password = models.CharField(max_length=255)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
class Place(models.Model):
    
    place_id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)

    name = models.CharField(max_length=100)  # Name of the place
    latitude = models.DecimalField(max_digits=9, decimal_places=6)  # Latitude
    longitude = models.DecimalField(max_digits=9, decimal_places=6)  # Longitude
    city = models.CharField(max_length=20, default='other') # City
    image1 = CloudinaryField('image1', blank=True, null=True)
    image2 = CloudinaryField('image2', blank=True, null=True)
    image3 = CloudinaryField('image3', blank=True, null=True)
    image4 = CloudinaryField('image4', blank=True, null=True)
    
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name