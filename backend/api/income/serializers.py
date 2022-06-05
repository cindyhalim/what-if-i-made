from rest_framework import serializers
from income.utils import Region

def _region_validator(value: str) -> bool:
  if value not in [e.name for e in Region]:
    raise serializers.ValidationError("Not a valid Canadian province or territory")
  return value

class IncomesDeltaSerializer(serializers.Serializer):
  current_income = serializers.IntegerField(min_value=0)
  desired_income = serializers.IntegerField(min_value=0)
  region = serializers.CharField(max_length=2)

  def validate_region(self, value):
   return _region_validator(value)

class IncomeRequiredSerializer(serializers.Serializer):
  region = serializers.CharField(max_length=2)
  average_expenses_per_month = serializers.IntegerField(min_value=0)
  savings_goal = serializers.IntegerField(min_value=0)
  savings_goal_rate = serializers.IntegerField(min_value=1)

  def validate_region(self, value):
    return _region_validator(value)