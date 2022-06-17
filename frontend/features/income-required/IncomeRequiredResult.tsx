import React from "react"
import { Chart } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement } from "chart.js"
import { Box, Flex, Text } from "rebass"
import { theme } from "../../styles/theme"
import { TextHighlight } from "../../components/TextHighlight"
import { useAppSelector } from "../../core/redux/store"
import { formatCurrencyToInt, formatIntToCurrency } from "../../core/money"
import { useTheme } from "../../hooks/useTheme"

ChartJS.register(ArcElement)

export const IncomeRequiredResult = () => {
  const incomeBeforeTax = useAppSelector((state) => state.incomeRequired.incomeBeforeTax)
  const savings = useAppSelector((state) => state.incomeRequired.goal) || ""
  const spendingPerMonth = useAppSelector((state) => state.incomeRequired.spending) || ""
  const taxesPaid = useAppSelector((state) => state.incomeRequired.taxesPaid) || 0
  const duration = useAppSelector((state) => state.incomeRequired.duration) || ""
  const { results: resultsTheme } = useTheme()

  const pieChartColors = {
    tax: "#0063D5",
    expenses: "#FF4E3A",
    savings: "#FFAD05",
  }

  const exceedsLimit = incomeBeforeTax && incomeBeforeTax >= 1000000

  const legend = [
    {
      text: "Expenses",
      color: pieChartColors.expenses,
    },
    {
      text: "Savings",
      color: pieChartColors.savings,
    },
    {
      text: "Taxes",
      color: pieChartColors.tax,
    },
  ]
  return (
    <Flex
      flexDirection={["column", "column", "row"]}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        paddingX: [20, 20, 40],
      }}
    >
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
          <Box
            sx={{ width: [280, 350, 450], height: [380, 350, 450], marginRight: [0, 0, 60] }}
            order={[3, 3, 1]}
          >
            <Box
              as={"span"}
              sx={{
                display: "flex",
                justifyContent: "center",
                cursor: "default",
                ...theme.heading,
                fontSize: 20,
                marginBottom: 40,
              }}
            >
              <TextHighlight theme={resultsTheme} text={"monthly breakdown"}></TextHighlight>
            </Box>
            <Chart
              type="pie"
              data={{
                datasets: [
                  {
                    label: "BLAH",
                    data: [
                      taxesPaid / 12,
                      formatCurrencyToInt(savings) / 12,
                      formatCurrencyToInt(spendingPerMonth),
                    ],
                    backgroundColor: [
                      pieChartColors.tax,
                      pieChartColors.savings,
                      pieChartColors.expenses,
                    ],
                    hoverOffset: 0,
                  },
                ],
                labels: ["Red", "Blue", "Yellow"],
              }}
            />
          </Box>
          <Flex
            flexDirection="column"
            sx={{
              justifyContent: "center",
              alignItems: ["center", "center", "flex-start"],
              width: ["100%", "100%", "50%"],
            }}
            order={[1, 1, 2]}
          >
            <Box
              as={"span"}
              sx={{
                cursor: "default",
                ...theme.heading,
                lineHeight: 1.5,
              }}
            >
              you need to make over{" "}
              <TextHighlight
                theme={resultsTheme}
                text={formatIntToCurrency(incomeBeforeTax || 0)}
              />
              * to save <TextHighlight theme={resultsTheme} text={savings} /> in{" "}
              <TextHighlight theme={resultsTheme} text={duration} /> years.
            </Box>
            <Text sx={{ fontSize: 14, fontWeight: "bold", opacity: 0.8, marginTop: 20 }}>
              * annually, before tax. does not account for inflation.
            </Text>
            <Box sx={{ marginY: 20 }}>
              {legend.map((item, idx) => (
                <Flex key={idx} sx={{ marginBottom: 10 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: item.color,
                      borderRadius: "5px",
                    }}
                  />
                  <Text sx={{ fontWeight: "bold", marginLeft: 10 }}>{item.text}</Text>
                </Flex>
              ))}
            </Box>
          </Flex>
        </>
      )}
    </Flex>
  )
}
