import math
import requests

from bs4 import BeautifulSoup
from enum import Enum
from re import sub

class CanadianRegion(Enum):
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

class USState(Enum):
    AL = "Alabama"
    AK = "Alaska"
    AZ = "Arizona"
    AR = "Arkansas"
    CA = "California"
    CO = "Colorado"
    CT = "Connecticut"
    DE = "Delaware"
    DC = "Washington DC"
    FL = "Florida"
    GA = "Georgia"
    HI = "Hawaii"
    ID = "Idaho"
    IL = "Illinois"
    IN = "Indiana"
    IA = "Iowa"
    KS = "Kansas"
    KY = "Kentucky"
    LA = "Louisiana"
    ME = "Maine"
    MD = "Maryland"
    MA = "Massachusetts"
    MI = "Michigan"
    MN = "Minnesota"
    MS = "Mississippi"
    MO = "Missouri"
    MT = "Montana"
    NE = "Nebraska"
    NV = "Nevada"
    NH = "New Hampshire"
    NJ = "New Jersey"
    NM = "New Mexico"
    NY = "New York"
    NC = "North Carolina"
    ND = "North Dakota"
    OH = "Ohio"
    OK = "Oklahoma"
    OR = "Oregon"
    PA = "Pennsylvania"
    RI = "Rhode Island"
    SC = "South Carolina"
    SD = "South Dakota"
    TN = "Tennessee"
    TX = "Texas"
    UT = "Utah"
    VT = "Vermont"
    VA = "Virginia"
    WA = "Washington"
    WV = "West Virginia"
    WI = "Wisconsin"
    WY = "Wyoming"




def get_net_pay_after_tax(country: str, region: str, salary: int) -> int:

    full_region_name = CanadianRegion[region].value if country == "CA" else USState[region].value
     
    url = (
        "https://ca.talent.com/ajax/taxcal/taxberg/taxBerg.php?country="
        + country.lower()
        +"&language=en&region="
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

def get_income_required_before_tax(country: str, region: str, income_after_tax: int) -> int:
    # return early if income after tax is 1 mill
    if income_after_tax > 1000000:
        return 1000000
    
    left = income_after_tax
    right = income_after_tax * 2

    while left <= right:
        mid = (left + right) // 2
        mid_income_after_tax = get_net_pay_after_tax(country, region, mid)

        if mid_income_after_tax == income_after_tax:
            return mid 
        elif mid_income_after_tax > income_after_tax:
            right = mid - 1
        else:
            left = mid + 1

    return -1
