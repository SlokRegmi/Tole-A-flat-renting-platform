from Tole_App.models import Place

# Create a new Place object and upload an image
place = Place.objects.create(
    name="Test Place",
    latitude=40.785091,
    longitude=-73.968285,
    city="lalitpur",
    image1=r"C:\Users\Administrator\Desktop\Tole Renting\backend\Tole\media\places\1.jpg"
)

print(place.image1.url)  # This should return a Cloudinary URL, not a local media path
