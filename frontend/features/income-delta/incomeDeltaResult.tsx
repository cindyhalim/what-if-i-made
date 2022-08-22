import React from "react"
import { Box, Flex } from "rebass"
import { theme } from "../../styles/theme"
import { TextHighlight } from "../../components/TextHighlight"
import { useAppSelector } from "../../core/redux/store"
import { formatIntToCurrency } from "../../core/money"
import { useTheme } from "../../hooks/useTheme"

export const IncomeDeltaResult = () => {
  const percentageIncrease = useAppSelector((state) => state.incomeDelta.percentageIncrease) || 0
  const currentIncomeAfterTax =
    useAppSelector((state) => state.incomeDelta.currentIncomeAfterTax) || 0
  const desiredIncomeAfterTax =
    useAppSelector((state) => state.incomeDelta.desiredIncomeAfterTax) || 0
  const { results: resultsTheme } = useTheme()

  const delta = percentageIncrease >= 0 ? "increase" : "decrease"

  const spanStyles = {
    cursor: "default",
    ...theme.heading,
    lineHeight: 1.5,
    marginBottom: 20,
  }
  return (
    <Flex
      flexDirection="column"
      sx={{
        justifyContent: "center",
        alignItems: ["center", "center", "flex-start"],
        width: "100%",
      }}
    >
      <Box as={"span"} sx={spanStyles}>
        your <TextHighlight theme={resultsTheme} text={"current"} /> income after tax is{" "}
        <TextHighlight
          theme={resultsTheme}
          text={`${formatIntToCurrency(currentIncomeAfterTax)}`}
        />
        .
      </Box>
      <Box as={"span"} sx={spanStyles}>
        your <TextHighlight theme={resultsTheme} text={"desired"} /> income after tax is{" "}
        <TextHighlight
          theme={resultsTheme}
          text={`${formatIntToCurrency(desiredIncomeAfterTax)}`}
        />
        .
      </Box>
      <Box as={"span"} sx={spanStyles}>
        that is a{" "}
        <TextHighlight
          theme={resultsTheme}
          customColor={percentageIncrease < 0 ? theme.colors.error : undefined}
          text={`${formatIntToCurrency(
            Math.abs(desiredIncomeAfterTax - currentIncomeAfterTax),
          )} (~${Math.abs(percentageIncrease)}%)`}
        />{" "}
        {delta}!
      </Box>
    </Flex>
  )
}
