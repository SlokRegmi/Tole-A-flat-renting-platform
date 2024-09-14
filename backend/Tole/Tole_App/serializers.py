from rest_framework import serializers

from .models import Place, User
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

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'
        fields = ['id','name','latitude','longitude','city','image1','image2','image3','image4','created_at']