import React from "react"
import { Button as RButton, Text } from "rebass"
import { Theme, themeColors } from "../styles/theme"

interface IButtonProps {
  children: React.ReactNode
  theme?: Theme
  onClick: () => void
}
export const Button: React.FC<IButtonProps> = ({ children, theme = Theme.PRIMARY, onClick }) => {
  return (
    <RButton
      sx={{
        width: ["120px", "200px"],
        height: ["35px", "50px"],
        color: themeColors[theme].button.text,
        backgroundColor: themeColors[theme].button.bg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": {
          opacity: 0.9,
        },
      }}
      onClick={onClick}
    >
      <Text as="h3" sx={{ fontSize: [18, 25] }}>
        {children}
      </Text>
    </RButton>
  )
}
