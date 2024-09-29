from django.contrib import admin

# Register your models here.
from .models import User, Place
admin.site.register(User)
admin.site.register(Place)
admin.site.site_header = 'Tole Admin'
