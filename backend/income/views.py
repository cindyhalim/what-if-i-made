from rest_framework.views import APIView
from rest_framework.response import Response
from income.serializers import IncomesDeltaSerializer, IncomeRequiredSerializer
from income.utils import (
    get_net_pay_after_tax,
    get_percentage_increase,
    get_income_required_before_tax,
)

class IncomesDeltaView(APIView):
    serializer_class = IncomesDeltaSerializer

    def post(self, request):
        serializer = IncomesDeltaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.data

        region = data["region"]
        current_income = data["current_income"]
        desired_income = data["desired_income"]

        current_income_after_tax = get_net_pay_after_tax(
            region=region, salary=current_income
        )
        desired_income_after_tax = get_net_pay_after_tax(
            region=region, salary=desired_income
        )
        percentage_increase = get_percentage_increase(
            current_income_after_tax, desired_income_after_tax
        )

        response = dict(
            percentage_increase=percentage_increase,
            current_income_after_tax=current_income_after_tax,
            desired_income_after_tax=desired_income_after_tax,
        )

        return Response(response)


class IncomeRequiredView(APIView):
    serializer_class = IncomeRequiredSerializer

    def post(self, request):
        serializer = IncomeRequiredSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.data

        income_required_after_tax = int(    
            (data["savings_goal"] / data["savings_goal_rate"])
            + (data["average_expenses_per_month"] * 12)
        )

        income_required_before_tax = get_income_required_before_tax(
            region=data["region"], 
            income_after_tax=income_required_after_tax,
        )

        return Response(dict(income_required_before_tax=income_required_before_tax, tax_paid=income_required_before_tax-income_required_after_tax))
