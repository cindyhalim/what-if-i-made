import { motion } from "framer-motion"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Box } from "rebass"
import { INPUT_PADDING, useHighlightAnimation } from "../hooks/useHighlightAnimation"
import { Theme, themeColors } from "../styles/theme"

export const TextHighlight: React.FC<{ text: string; theme: Theme; customColor?: string }> = ({
  text,
  theme,
  customColor,
}) => {
  const [height, setHeight] = useState<number>(0)

  const highlightRef = useRef<HTMLSpanElement | null>(null)

  const { controls, animateHighlight, resetHighlight } = useHighlightAnimation()

  const getDimensions = () => {
    const width = highlightRef?.current?.getBoundingClientRect().width || 0
    const height = highlightRef?.current?.getBoundingClientRect().height || 0

    return { width, height }
  }

  useEffect(() => {
    const { height, width } = getDimensions()
    setHeight(height)
    animateHighlight(width, 1)
  }, [animateHighlight])

  const onWindowResize = useCallback(async () => {
    const { width, height } = getDimensions()

    setHeight(height)

    resetHighlight()
    animateHighlight(width)
  }, [animateHighlight, resetHighlight])

  useEffect(() => {
    window.addEventListener("resize", onWindowResize)

    return () => window.removeEventListener("resize", onWindowResize)
  })

  return (
    <Box
      as="span"
      ref={highlightRef}
      sx={{
        position: "relative",
        color: customColor ?? themeColors[theme].text,
        fontWeight: "bold",
      }}
    >
      {text}
      <motion.div
        animate={controls}
        style={{
          backgroundColor: customColor ?? themeColors[theme].text,
          borderRadius: 10,
          opacity: 0.3,
          position: "absolute",
          top: `-${INPUT_PADDING}px`,
          left: `-${INPUT_PADDING}px`,
          height: `${height + INPUT_PADDING * 2}px`,
        }}
      />
    </Box>
  )
}
