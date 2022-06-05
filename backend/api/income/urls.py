from django.urls import path
from . import views

urlpatterns = [
  path('delta', views.IncomesDeltaView.as_view(), name="incomes-delta"),
  path('required', views.IncomeRequiredView.as_view(), name="incomes-required"),
]