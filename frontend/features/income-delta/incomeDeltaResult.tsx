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
  const percentageIncrease = useAppSelector((state) => state.incomeDelta.percentageIncrease)
  const currentIncomeAfterTax =
    useAppSelector((state) => state.incomeDelta.currentIncomeAfterTax) || 0
  const desiredIncomeAfterTax =
    useAppSelector((state) => state.incomeDelta.desiredIncomeAfterTax) || 0
  const { results: resultsTheme } = useTheme()

  return (
    <Flex
      flexDirection="column"
      sx={{
        justifyContent: "center",
        alignItems: ["center", "center", "flex-start"],
        width: ["100%", "100%", "50%"],
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
        that is a <TextHighlight theme={resultsTheme} text={`${percentageIncrease}% increase`} />!
        your current nominal income after tax is{" "}
        <TextHighlight
          theme={resultsTheme}
          text={`${formatIntToCurrency(currentIncomeAfterTax)}`}
        />{" "}
        and your nominal desired income after tax is{" "}
        <TextHighlight
          theme={resultsTheme}
          text={`${formatIntToCurrency(desiredIncomeAfterTax)}`}
        />
        .
      </Box>
    </Flex>
  )
}
