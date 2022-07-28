import math

from enum import Enum
from re import sub
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By

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

    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-dev-tools')
    chrome_options.add_argument('--remote-debugging-port=9222')
    chrome_options.add_argument('--window-size=1280x1696')
    chrome_options.add_argument('--user-data-dir=/tmp/chrome-user-data')
    chrome_options.add_argument('--single-process')
    chrome_options.add_argument("--no-zygote")
    chrome_options.add_argument('--ignore-certificate-errors')
    chrome_options.binary_location = "/opt/chrome/chrome"

    driver = webdriver.Chrome("/opt/chromedriver", options=chrome_options)

    url = (
        "https://ca.talent.com/ajax/taxcal/taxberg/taxBerg.php?country=ca&language=en&region="
        + full_region_name
        + "&salary="
        + str(salary)
        + "&from=year"
    )
    driver.get(url)

    net_pay_element = driver.find_element(By.CLASS_NAME, "l-net-pay__text")

    net_pay_text_element = net_pay_element.find_element(
        By.CLASS_NAME, "c_taxBerg__tax-text"
    )

    net_pay_time_based_raw = net_pay_text_element.get_attribute("peryear")

    driver.quit()

    """
    removes $ and , from raw net pay string and convert to int
    # $1,036,365 -> 1036365
    """
    net_pay_time_based = int(sub("[\$\,]", "", net_pay_time_based_raw))

    return net_pay_time_based


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
