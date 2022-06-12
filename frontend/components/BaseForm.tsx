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
  }
}
export const BaseForm: React.FC<IBaseFormProps> = ({ theme = Theme.PRIMARY, button, children }) => (
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
    <ErrorToast message={"Something went wrong. Please try again."} />
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
