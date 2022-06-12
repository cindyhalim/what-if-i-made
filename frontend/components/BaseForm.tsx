import React from "react"
import { Box, Flex, Text } from "rebass"
import { Theme, themeColors } from "../styles/theme"
import { Button } from "./Button"
import { motion } from "framer-motion"
interface IBaseFormProps {
  theme?: Theme
  children: React.ReactNode
  button: {
    onSubmit: () => void
  }
}
export const BaseForm: React.FC<IBaseFormProps> = ({ theme = Theme.PRIMARY, button, children }) => (
  <Flex
    sx={{
      flexDirection: "column",
      justifyContent: "center",
      maxWidth: "1500px",
    }}
  >
    {children}
    <Button
      theme={theme}
      onClick={button.onSubmit}
      sx={{ marginTop: [30, 50, 50], alignSelf: "center" }}
    >
      find out
    </Button>
  </Flex>
)
