import React from "react"
import { Chart } from "react-chartjs-2"
import { Box, Flex, Text } from "rebass"
import { Theme, theme } from "../../styles/theme"
import { TextHighlight } from "../../components/TextHighlight"
import { BaseLayout } from "../../components/BaseLayout"
import { useAppSelector } from "../../core/redux/store"
import { formatCurrencyToInt, formatIntToCurrency } from "../../core/money"
import { useTheme } from "../../hooks/useTheme"

export const IncomeDeltaResult = () => {
  const percentageIncrease = useAppSelector((state) => state.incomeDelta.percentageIncrease) || 0
  const currentIncomeAfterTax =
    useAppSelector((state) => state.incomeDelta.currentIncomeAfterTax) || 0
  const desiredIncomeAfterTax =
    useAppSelector((state) => state.incomeDelta.desiredIncomeAfterTax) || 0
  const { results: resultsTheme } = useTheme()

  const delta = percentageIncrease >= 0 ? "increase" : "decrease"
  return (
    <Flex
      flexDirection="column"
      sx={{
        justifyContent: "center",
        alignItems: ["center", "center", "flex-start"],
        width: "100%",
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
        your <TextHighlight theme={resultsTheme} text={"current"} /> nominal income after tax is{" "}
        <TextHighlight
          theme={resultsTheme}
          text={`${formatIntToCurrency(currentIncomeAfterTax)}`}
        />
        .
        <br />
        your <TextHighlight theme={resultsTheme} text={"desired"} /> nominal income after tax is{" "}
        <TextHighlight
          theme={resultsTheme}
          text={`${formatIntToCurrency(desiredIncomeAfterTax)}`}
        />
        .
        <br />
        that is a{" "}
        <TextHighlight
          theme={resultsTheme}
          customColor={percentageIncrease < 0 ? theme.colors.error : undefined}
          text={`${formatIntToCurrency(
            Math.abs(desiredIncomeAfterTax - currentIncomeAfterTax),
          )} (~${Math.abs(percentageIncrease)}%) ${delta}`}
        />
        !
      </Box>
    </Flex>
  )
}
