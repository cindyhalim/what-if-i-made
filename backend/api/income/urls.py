from django.urls import path
from . import views

urlpatterns = [
  path('', views.IncomesDeltaView.as_view(), name="incomes-delta")
]