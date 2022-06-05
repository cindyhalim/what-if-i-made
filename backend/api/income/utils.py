from enum import Enum
from re import sub
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

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
 
  options = Options()
  options.headless = True
  service = ChromeService(executable_path=ChromeDriverManager().install())
  driver = webdriver.Chrome(service=service, options=options)

  url = "https://ca.talent.com/ajax/taxcal/taxberg/taxBerg.php?country=ca&language=en&region=" + full_region_name + "&salary=" + str(salary) + "&from=year"
  driver.get(url)
  
  net_pay_element = driver.find_element(By.CLASS_NAME, 'l-net-pay__text')

  net_pay_text_element = net_pay_element.find_element(By.CLASS_NAME, 'c_taxBerg__tax-text')


  net_pay_time_based_raw = net_pay_text_element.get_attribute("peryear") 

  driver.quit()

  """
  removes $ and , from raw net pay string and convert to int
  # $1,036,365 -> 1036365
  """
  net_pay_time_based = int(sub('[\$\,]', '', net_pay_time_based_raw))

  return net_pay_time_based

def get_percentage_increase(curr_income: int, new_income: int) -> int:
  percentage = ((new_income - curr_income) / curr_income) * 100
  return round(percentage)