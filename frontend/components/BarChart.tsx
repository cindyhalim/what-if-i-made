import React, { useState } from "react"
import { Box, Flex } from "rebass"
import { formatIntToCurrency } from "../core/money"
import { Theme } from "../styles/theme"
import { TextHighlight } from "./TextHighlight"

export interface IBarChartData {
  label: string
  value: number
  color: string
}
interface IBarChartProps {
  title: string
  data: IBarChartData[]
  total: number
  theme: Theme
}

export const BarChart: React.FC<IBarChartProps> = ({ data, total, theme, title }) => {
  const [label, setLabel] = useState<string | null>(null)
  const HEIGHT = "20px"
  const BORDER_RADIUS = "5px"

  const toPercentage = (numerator: number, denominator: number) => (numerator / denominator) * 100

  return (
    <Box sx={{ width: "100%", marginTop: [50, 50, 150], fontWeight: "bold" }}>
      <Flex
        sx={{
          fontSize: [18, 18, 20],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextHighlight theme={theme} text={title}></TextHighlight>
      </Flex>
      <Flex
        sx={{
          marginTop: 50,
          height: HEIGHT,
          position: "relative",
        }}
      >
        {data.map((item, idx, arr) => {
          const label = `${item.label}: ${formatIntToCurrency(item.value)}`
          return (
            <Box
              key={idx}
              sx={{
                position: "aboslute",
                backgroundColor: item.color,
                height: HEIGHT,
                width: `${toPercentage(item.value, total)}%`,
                ...(!idx && {
                  borderTopLeftRadius: BORDER_RADIUS,
                  borderBottomLeftRadius: BORDER_RADIUS,
                }),
                ...(idx === arr.length - 1 && {
                  borderTopRightRadius: BORDER_RADIUS,
                  borderBottomRightRadius: BORDER_RADIUS,
                }),
              }}
              onMouseOver={() => setLabel(label)}
              onClick={() => setLabel(label)}
            />
          )
        })}
      </Flex>
      {label && <Box sx={{ height: 50, marginTop: 20 }}>{label}</Box>}
    </Box>
  )
}
