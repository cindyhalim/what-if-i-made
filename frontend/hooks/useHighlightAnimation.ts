import { useAnimation } from "framer-motion"
import { useCallback } from "react"

export const INPUT_PADDING = 5

export const useHighlightAnimation = () => {
  const controls = useAnimation()

  const animateHighlight = useCallback(
    (width: number, delay?: number) => {
      controls.start({
        width: `${width + INPUT_PADDING * 2}px`,
        transition: { duration: 0.5, delay: delay ?? 0 },
      })
    },
    [controls],
  )

  const resetHighlight = () => {
    controls.set({
      width: `0px`,
    })
  }

  return { controls, animateHighlight, resetHighlight }
}
