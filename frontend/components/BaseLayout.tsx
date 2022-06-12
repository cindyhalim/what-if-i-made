import { motion } from "framer-motion"
import React from "react"
import { Flex, Text } from "rebass"
import { Theme, themeColors } from "../styles/theme"

export const BaseLayout: React.FC<{
  theme: Theme
  children: React.ReactNode
  switchForm: {
    direction: "right" | "left"
    onClick: () => void
  }
}> = ({ theme, children, switchForm }) => (
  <Flex
    sx={{
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100%",
      color: themeColors[theme].text,
      backgroundColor: themeColors[theme].bg,
      position: "relative",
      paddingX: 20,
    }}
  >
    {children}
    <motion.div
      whileHover={{ opacity: 1.0, scale: 1.2 }}
      whileTap={{ opacity: 1.0, scale: 1.5 }}
      style={{
        width: 30,
        height: 30,
        backgroundColor: themeColors[theme].text,
        borderRadius: 15,
        opacity: 0.3,
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        top: "45%",
        ...(switchForm.direction === "right" && { right: 20 }),
        ...(switchForm.direction === "left" && { left: 20 }),
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={switchForm.onClick}
    >
      <Text sx={{ zIndex: 10, color: themeColors[theme].bg, fontWeight: "bold", fontSize: 20 }}>
        {switchForm.direction === "right" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
          </svg>
        )}
      </Text>
    </motion.div>
  </Flex>
)
