from rest_framework import serializers
from income.utils import Region

class IncomesDeltaSerializer(serializers.Serializer):
  current_income = serializers.IntegerField(min_value=0)
  desired_income = serializers.IntegerField(min_value=0)
  region = serializers.CharField(max_length=2)

  def validate_region(self, value):
    if value not in [e.name for e in Region]:
      raise serializers.ValidationError("Not a valid Canadian province or territory")
    return value