import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import { Box, Text } from "rebass"
import { theme } from "../styles/theme"

interface IErrorToastProps {
  message: string
}
export const ErrorToast: React.FC<IErrorToastProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  return (
    <Box
      sx={{
        position: "absolute",
        top: 20,
        zIndex: 1,
        width: "100%",
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="hide"
            animate="show"
            exit="hide"
            variants={{
              show: { opacity: 1, y: 0 },
              hide: { opacity: 0, y: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onAnimationComplete={() => setTimeout(() => setIsVisible(false), 4000)}
          >
            <Box
              sx={{
                minHeight: "50px",
                width: "100%",
                marginBottom: 30,
                padding: [10, 10, 15],
                bg: theme.colors.error,
                borderRadius: 5,
              }}
            >
              <Text
                as="p"
                sx={{ fontWeight: "bold", color: theme.colors.white, fontSize: [14, 14, 18] }}
              >
                {message}
              </Text>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}
