from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include("health.urls")),
    path('income/', include("income.urls")),
    path('admin/', admin.site.urls),
]
