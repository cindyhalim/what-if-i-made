export const formatCurrencyToInt = (currency: string) => {
  const formattedCurrency = currency.replace(/[^0-9]/g, "")
  return parseInt(formattedCurrency)
}

export const formatIntToCurrency = (numberCurrency: number) => {
  const formattedMoneyText = numberCurrency.toString()
  const textWithThousandsSeparator = formattedMoneyText.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return formattedMoneyText ? `$${textWithThousandsSeparator}` : ""
}
