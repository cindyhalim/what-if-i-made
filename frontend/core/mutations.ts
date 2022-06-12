import axios from "axios"

const baseUrl = "http://127.0.0.1:8000/income"

const regionToCodeMap: { [key: string]: string } = {
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

interface IIncomeDeltaMutationPayload {
  currentIncome: string
  desiredIncome: string
  region: string
}

interface IIncomeDeltaRawResponse {
  percentage_increase: number
  current_income_after_tax: number
  desired_income_after_tax: number
}

const formatCurrencyToInt = (currency: string) => {
  const formattedCurrency = currency.replace(/[^0-9]/g, "")
  return parseInt(formattedCurrency)
}

export const incomeDeltaMutationFn = async (payload: IIncomeDeltaMutationPayload) => {
  const regionCode = regionToCodeMap[payload.region]

  const response = await axios.post<IIncomeDeltaRawResponse>(`${baseUrl}/delta`, {
    current_income: formatCurrencyToInt(payload.currentIncome),
    desired_income: formatCurrencyToInt(payload.desiredIncome),
    region: regionCode,
  })

  console.log("response!", { response: response.data })

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
}

interface IIncomeRequiredRawResponse {
  income_required_before_tax: number
}

export const incomeRequiredMutationFn = async (payload: IIncomeRequiredMutationPayload) => {
  const regionCode = regionToCodeMap[payload.region]

  const response = await axios.post<IIncomeRequiredRawResponse>(`${baseUrl}/required`, {
    region: regionCode,
    average_expenses_per_month: formatCurrencyToInt(payload.expensesPerMonth),
    savings_goal: formatCurrencyToInt(payload.goal),
    savings_goal_rate: parseInt(payload.duration),
  })

  console.log("response!", { response: response.data })
  return {
    incomeRequiredBeforeTax: response.data.income_required_before_tax,
  }
}
