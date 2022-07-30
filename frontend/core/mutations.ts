import axios from "axios"
import { formatCurrencyToInt } from "./money"
import { Country } from "./redux/app"

const baseUrl = `${process.env.NEXT_PUBLIC_SERVICE_URL}/income`

const CARegionToCodeMap: { [key: string]: string } = {
  Alberta: "AB",
  "British Columbia": "BC",
  Manitoba: "MB",
  "New Brunswick": "NB",
  "Newfoundland and Labrador": "NL",
  "Northwest Territories": "NT",
  "Nova Scotia": "NS",
  Nunavut: "NU",
  Ontario: "ON",
  "Prince Edward Island": "PE",
  Quebec: "QC",
  Saskatchewan: "SK",
  Yukon: "YT",
}

const USRegionToCodeMap: { [key: string]: string } = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  "Washington DC": "DC",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
}

const regionToCodeMap = { ...CARegionToCodeMap, ...USRegionToCodeMap }
interface IIncomeDeltaMutationPayload {
  currentIncome: string
  desiredIncome: string
  region: string
  country: Country
}

interface IIncomeDeltaRawResponse {
  percentage_increase: number
  current_income_after_tax: number
  desired_income_after_tax: number
}

export const incomeDeltaMutationFn = async (payload: IIncomeDeltaMutationPayload) => {
  const regionCode = regionToCodeMap[payload.region]

  const response = await axios.post<IIncomeDeltaRawResponse>(`${baseUrl}/delta/`, {
    current_income: formatCurrencyToInt(payload.currentIncome),
    desired_income: formatCurrencyToInt(payload.desiredIncome),
    region: regionCode,
    country: payload.country,
  })

  return {
    percentageIncrease: response.data.percentage_increase,
    currentIncomeAfterTax: response.data.current_income_after_tax,
    desiredIncomeAfterTax: response.data.desired_income_after_tax,
  }
}

interface IIncomeRequiredMutationPayload {
  region: string
  expensesPerMonth: string
  goal: string
  duration: string
  country: Country
}

interface IIncomeRequiredRawResponse {
  income_required_before_tax: number
  tax_paid: number
}

export const incomeRequiredMutationFn = async (payload: IIncomeRequiredMutationPayload) => {
  const regionCode = regionToCodeMap[payload.region]

  const response = await axios.post<IIncomeRequiredRawResponse>(`${baseUrl}/required/`, {
    region: regionCode,
    average_expenses_per_month: formatCurrencyToInt(payload.expensesPerMonth),
    savings_goal: formatCurrencyToInt(payload.goal),
    savings_goal_rate: parseInt(payload.duration),
    country: payload.country,
  })

  return {
    incomeRequiredBeforeTax: response.data.income_required_before_tax,
    taxPaid: response.data.tax_paid,
  }
}
