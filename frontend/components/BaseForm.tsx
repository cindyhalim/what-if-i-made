import React from "react"
import { Flex } from "rebass"
import { Theme, themeColors } from "../styles/theme"
import { Button } from "./Button"

interface IBaseFormProps {
  theme?: Theme
  children: React.ReactNode
  button: {
    children: string
    onSubmit: () => void
  }
}
export const BaseForm: React.FC<IBaseFormProps> = ({ theme = Theme.PRIMARY, button, children }) => (
  <Flex
    sx={{
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100%",
      color: themeColors[theme].text,
      flexDirection: "column",
      backgroundColor: themeColors[theme].bg,
    }}
  >
    <Flex
      sx={{
        flexDirection: "column",
        width: "90%",
        marginY: 80,
      }}
    >
      {children}
    </Flex>
    <Button theme={theme} onClick={button.onSubmit}>
      {button.children}
    </Button>
  </Flex>
)
