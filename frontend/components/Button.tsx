import React from "react"
import { Button as RButton, SxStyleProp, Text } from "rebass"
import { Theme, themeColors } from "../styles/theme"
import { Loading } from "./Loading"

interface IButtonProps {
  isDisabled: boolean
  isLoading: boolean
  children: React.ReactNode
  theme?: Theme
  onClick: () => void
  sx?: SxStyleProp
}
export const Button: React.FC<IButtonProps> = ({
  isDisabled,
  isLoading,
  children,
  theme = Theme.PRIMARY,
  onClick,
  sx,
}) => {
  return (
    <RButton
      disabled={isDisabled}
      sx={{
        width: ["150px", "200px"],
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
        ...sx,
      }}
      onClick={onClick}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Text as="h3" sx={{ fontSize: [18, 25] }}>
          {children}
        </Text>
      )}
    </RButton>
  )
}
