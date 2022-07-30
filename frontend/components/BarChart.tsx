import { motion } from "framer-motion"
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
    <Box sx={{ width: "100%", marginY: [50, 50, 80], fontWeight: "bold" }}>
      <Flex
        sx={{
          height: HEIGHT,
        }}
      >
        {data.map((item, idx, arr) => {
          const label = `${item.label}: ${formatIntToCurrency(item.value)}`
          return (
            <motion.div
              key={idx}
              initial={{ width: 0, x: 0 }}
              animate={{
                width: `${toPercentage(item.value, total)}%`,
                transition: { delay: 1 + idx, duration: 1.5 },
              }}
              style={{
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
              whileHover={{
                scale: 1.1,
              }}
              onMouseOver={() => setLabel(label)}
              onClick={() => setLabel(label)}
            />
          )
        })}
      </Flex>
      <Flex
        sx={{
          fontSize: [18, 18, 20],
          marginTop: 20,
          height: 50,
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {title}
        {label && <Box sx={{ height: 50, marginTop: 20, fontSize: 16 }}>{label}</Box>}
      </Flex>
    </Box>
  )
}
