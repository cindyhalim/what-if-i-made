import React from "react"
import { Box, Flex, Text } from "rebass"
import { theme } from "../../styles/theme"
import { TextHighlight } from "../../components/TextHighlight"
import { useAppSelector } from "../../core/redux/store"
import { formatCurrencyToInt, formatIntToCurrency } from "../../core/money"
import { useTheme } from "../../hooks/useTheme"
import { BarChart, IBarChartData } from "../../components/BarChart"
import { BaseForm } from "../../components/BaseForm"

export const IncomeRequiredResult = () => {
  const incomeBeforeTax = useAppSelector((state) => state.incomeRequired.incomeBeforeTax) || 0
  const savings = useAppSelector((state) => state.incomeRequired.goal) || ""
  const spendingPerMonth = useAppSelector((state) => state.incomeRequired.spending) || ""
  const taxesPaidPerYear = useAppSelector((state) => state.incomeRequired.taxesPaid) || 0
  const duration = useAppSelector((state) => state.incomeRequired.duration) || ""
  const { results: resultsTheme } = useTheme()

  const exceedsLimit = incomeBeforeTax && incomeBeforeTax >= 1000000

  const spendingPerMonthInt = formatCurrencyToInt(spendingPerMonth)
  const taxesPaidPerMonth = taxesPaidPerYear / 12
  const incomeBeforeTaxPerMonth = incomeBeforeTax / 12

  const barChartData: IBarChartData[] = [
    {
      label: "expenses",
      value: spendingPerMonthInt,
      color: "#F06543",
    },
    {
      label: "taxes paid",
      value: Math.round(taxesPaidPerMonth),
      color: "#F09D51",
    },
    {
      label: "to save",
      value: Math.round(incomeBeforeTaxPerMonth - (spendingPerMonthInt + taxesPaidPerMonth)),
      color: "#E0DFD5",
    },
  ]

  const barChartProps = {
    theme: resultsTheme,
    title: "monthly breakdown",
    data: barChartData,
    total: incomeBeforeTaxPerMonth,
  }

  return (
    <>
      {exceedsLimit ? (
        <Box
          as={"span"}
          sx={{
            cursor: "default",
            ...theme.heading,
            lineHeight: 1.5,
          }}
        >
          you need to make at least{" "}
          <TextHighlight theme={resultsTheme} text={formatIntToCurrency(incomeBeforeTax || 0)} />
          <br />
          to save <TextHighlight theme={resultsTheme} text={savings} /> in{" "}
          <TextHighlight theme={resultsTheme} text={duration} /> years.
        </Box>
      ) : (
        <>
          <Flex
            flexDirection="column"
            sx={{
              justifyContent: "center",
              width: "100%",
              alignItems: ["center", "center", "flex-start"],
            }}
          >
            <Box
              as={"span"}
              sx={{
                cursor: "default",
                ...theme.heading,
                lineHeight: 1.5,
              }}
            >
              you need to make at least{" "}
              <TextHighlight
                theme={resultsTheme}
                text={formatIntToCurrency(incomeBeforeTax || 0)}
              />
              *
              <br />
              to save <TextHighlight theme={resultsTheme} text={savings} /> in{" "}
              <TextHighlight theme={resultsTheme} text={duration} /> years.
            </Box>
          </Flex>
          <BarChart {...barChartProps} />
          <Text sx={{ fontSize: 14, fontWeight: "bold", opacity: 0.8, marginTop: 20 }}>
            * annually, before tax. does not account for inflation.
          </Text>
        </>
      )}
    </>
  )
}
