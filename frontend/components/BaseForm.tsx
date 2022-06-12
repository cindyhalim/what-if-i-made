import React from "react"
import { Flex } from "rebass"
import { Theme } from "../styles/theme"
import { Button } from "./Button"
import { ErrorToast } from "./ErrorToast"

interface IBaseFormProps {
  theme?: Theme
  children: React.ReactNode
  button: {
    onSubmit: () => void
    isDisabled: boolean
    isLoading: boolean
  }
  errorMessage: string | null
}
export const BaseForm: React.FC<IBaseFormProps> = ({
  theme = Theme.PRIMARY,
  button,
  children,
  errorMessage,
}) => (
  <Flex
    sx={{
      width: "100%",
      position: "relative",
      height: "100vh",
      flexDirection: "column",
      justifyContent: "center",
      maxWidth: "1500px",
    }}
  >
    {errorMessage && <ErrorToast message={errorMessage || ""} />}
    {children}
    <Button
      isLoading={button.isLoading}
      isDisabled={button.isDisabled}
      theme={theme}
      onClick={button.onSubmit}
      sx={{ marginTop: [30, 50, 50], alignSelf: "center" }}
    >
      find out
    </Button>
  </Flex>
)
