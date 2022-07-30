from rest_framework import serializers
from income.utils import CanadianRegion, USState

COUNTRY_CHOICES = ['CA', 'US']

def _region_validator(country: str, region: str):
    if country == 'US':
        if region not in [e.name for e in USState]:
            raise serializers.ValidationError("The state provided is not supported")
    else:
        if region not in [e.name for e in CanadianRegion]:
             raise serializers.ValidationError("Not a valid Canadian province or territory")

class IncomesDeltaSerializer(serializers.Serializer):
    country = serializers.ChoiceField(
        choices=COUNTRY_CHOICES
    )
    current_income = serializers.IntegerField(min_value=0)
    desired_income = serializers.IntegerField(min_value=0)
    region = serializers.CharField(max_length=2)

    def validate(self, data):
        country = data.get("country", None)
        region = data.get("region", None)

        _region_validator(country, region)

        return data


class IncomeRequiredSerializer(serializers.Serializer):
    country = serializers.ChoiceField(
        choices=COUNTRY_CHOICES
    )
    region = serializers.CharField(max_length=2)
    average_expenses_per_month = serializers.IntegerField(min_value=0)
    savings_goal = serializers.IntegerField(min_value=0)
    savings_goal_rate = serializers.IntegerField(min_value=1)

    def validate(self, data):
        country = data.get("country", None)
        region = data.get("region", None)

        _region_validator(country, region)

        return data

