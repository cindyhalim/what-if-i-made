import React from "react"
import { Chart } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, ArcHoverOptions } from "chart.js"
import { Box, Flex, Text } from "rebass"
import { Theme, theme } from "../../styles/theme"
import { TextHighlight } from "../../components/TextHighlight"
import { BaseLayout } from "../../components/BaseLayout"

ChartJS.register(ArcElement)

export const IncomeRequiredResult = () => {
  const pieChartColors = {
    tax: "#0063D5",
    expenses: "#FF4E3A",
    savings: "#FFAD05",
  }

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
    <BaseLayout theme={Theme.PRIMARY}>
      <Flex
        flexDirection={["column", "column", "row"]}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          paddingX: [20, 20, 40],
        }}
      >
        <Box
          sx={{ width: [280, 350, 450], height: [380, 350, 450], marginRight: [0, 0, 60] }}
          order={[3, 3, 1]}
        >
          <Chart
            type="pie"
            data={{
              datasets: [
                {
                  data: [300, 50, 100],
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
            you need to make at least <TextHighlight theme={Theme.PRIMARY} text={"$700,000"} />
            * to save <TextHighlight theme={Theme.PRIMARY} text={"$100,000"} /> in{" "}
            <TextHighlight theme={Theme.PRIMARY} text={"3"} /> years.
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
      </Flex>
    </BaseLayout>
  )
}
