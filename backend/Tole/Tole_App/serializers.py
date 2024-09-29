from rest_framework import serializers

from .models import Place, User
from rest_framework import serializers
from .models import User
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstname', 'lastname', 'email', 'phoneno', 'password']
        extra_kwargs = {
            'password': {'write_only': True}  # Password will only be writable, not readable
        }
        
    def create(self, validated_data):
        password = validated_data.pop('password', None)  # Extract password from validated data
        instance = self.Meta.model(**validated_data)  # Create the user instance without password
        if password:
            instance.set_password(password)  # Hash the password
        instance.save()
        return instance


class PlaceSerializer(serializers.ModelSerializer):
    image1_url = serializers.SerializerMethodField()
    image2_url = serializers.SerializerMethodField()
    image3_url = serializers.SerializerMethodField()
    image4_url = serializers.SerializerMethodField()

    class Meta:
        model = Place
        fields = [
            
            'name',
            'latitude',
            'longitude',
            'city',
            'image1',
            'image2',
            'image3',
            'image4',
            'image1_url',
            'image2_url',
            'image3_url',
            'image4_url',
            'created_at',
        ]

    def get_image1_url(self, obj):
        if obj.image1 and hasattr(obj.image1, 'url'):
            return obj.image1.url
        return None

    def get_image2_url(self, obj):
        if obj.image2 and hasattr(obj.image2, 'url'):
            return obj.image2.url
        return None

    def get_image3_url(self, obj):
        if obj.image3 and hasattr(obj.image3, 'url'):
            return obj.image3.url
        return None

    def get_image4_url(self, obj):
        if obj.image4 and hasattr(obj.image4, 'url'):
            return obj.image4.url
        return None

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','firstname','lastname','email','phoneno','password']
        extra_kwargs = {
            'password':{'write_only':True}
        }
        
    def create(self, validated_data):
            password = validated_data.pop('password',None)
            instance = self.Meta.model(**validated_data)
            if password is not None:
                instance.set_password(password)
            instance.save()
            return instance