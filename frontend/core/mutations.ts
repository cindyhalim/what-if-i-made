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

interface IIncomeDeltaQueryPayload {
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
export const incomeDeltaQueryFn = async (payload: IIncomeDeltaQueryPayload) => {
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
