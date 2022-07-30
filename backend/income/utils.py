import math
import requests

from bs4 import BeautifulSoup
from enum import Enum
from re import sub

class Region(Enum):
    AB = "Alberta"
    BC = "British Columbia"
    MB = "Manitoba"
    NB = "New Brunswick"
    NL = "Newfoundland and Labrador"
    NT = "Northwest Territories"
    NS = "Nova Scotia"
    NU = "Nunavut"
    ON = "Ontario"
    PE = "Prince Edward Island"
    QC = "Quebec"
    SK = "Saskatchewan"
    YT = "Yukon"

def get_net_pay_after_tax(region: str, salary: int) -> int:
    full_region_name = Region[region].value
    
    url = (
        "https://ca.talent.com/ajax/taxcal/taxberg/taxBerg.php?country=ca&language=en&region="
        + full_region_name
        + "&salary="
        + str(salary)
        + "&from=year"
    )

    response = requests.get(url)
    html = BeautifulSoup(response.content, 'html.parser')

    net_pay_element = html.select(".l-net-pay__text > .c_taxBerg__tax-text.timeBased")[0]
    raw_net_pay = net_pay_element["peryear"]

    """
    removes $ and , from raw net pay string and convert to int
    # $1,036,365 -> 1036365
    """
    net_pay = int(sub("[\$\,]", "", raw_net_pay))
    
    return net_pay

def get_percentage_increase(curr_income: int, new_income: int) -> int:
    percentage = ((new_income - curr_income) / curr_income) * 100
    return round(percentage)

def get_income_required_before_tax(region: str, income_after_tax: int) -> int:
    # return early if income after tax is 1 mill
    if income_after_tax > 1000000:
        return 1000000
    
    left = income_after_tax
    right = income_after_tax * 2

    while left <= right:
        mid = (left + right) // 2
        mid_income_after_tax = get_net_pay_after_tax(region, mid)

        if mid_income_after_tax == income_after_tax:
            return mid 
        elif mid_income_after_tax > income_after_tax:
            right = mid - 1
        else:
            left = mid + 1

    return -1
