import { Input } from "@rebass/forms"
import React, { useEffect, useRef, useState } from "react"
import { Box } from "rebass"
import { theme } from "../styles/theme"
import { motion, useAnimation } from "framer-motion"
import { usePrevious } from "../utils/usePrevious"

type InputType = "money"
interface ITextInputProps {
  name: string
  placeholder?: string
  type?: InputType | null
}

export const TextInput: React.FC<ITextInputProps> = ({ name, placeholder = "", type = null }) => {
  const INPUT_PADDING = 5

  const [value, setValue] = useState<string | null>(null)
  const [inputHeight, setInputHeight] = useState<number>(0)
  const [inputWidth, setInputWidth] = useState<number>(0)

  const textRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const controls = useAnimation()

  const prev = usePrevious({ inputWidth })

  useEffect(() => {
    const inputHeight = inputRef?.current?.clientHeight || 0
    setInputHeight(inputHeight)
  }, [])

  useEffect(() => {
    const width = textRef?.current?.clientWidth || 0
    const prevWidth = prev?.inputWidth || 0

    if (prevWidth < width) {
      setInputWidth(width)
    }
  }, [prev, value, setInputWidth])

  const formatInputBasedOnMask = (inputText: string) => {
    let formattedText = inputText.replace(/[^a-zA-Z\s]/g, "")
    if (type === "money") {
      formattedText = inputText.replace(/[^0-9]/g, "")
      const textWithThousandsSeparator = formattedText.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return formattedText ? `$${textWithThousandsSeparator}` : ""
    }

    return formattedText
  }

  const handleOnFocus = () => {
    controls.set({ width: "0px" })
  }

  const handleOnBlur = () => {
    const width = textRef?.current?.clientWidth || 0
    controls.start({
      width: value ? `${width + INPUT_PADDING * 2}px` : "0px",
      transition: { duration: 0.5 },
    })
  }

  return (
    <Box
      as={"span"}
      sx={{
        position: "relative",
        cursor: "text",
        width: "auto",
        height: "auto",
        color: theme.colors.white,
        marginX: ["10px", "10px", "15px"],
      }}
      onClick={() => {
        inputRef.current?.focus()
      }}
    >
      <Input
        ref={inputRef}
        id={name}
        type="text"
        contentEditable={"true"}
        spellCheck={"false"}
        autoComplete={"off"}
        value={value || ""}
        placeholder={placeholder}
        sx={{
          ...theme.heading,
          fontWeight: "bold",
          outline: 0,
          border: 0,
          padding: 0,
          width: inputWidth,
          display: "inline-block",
          "::placeholder": {
            color: theme.colors.white,
            fontWeight: "bold",
            opacity: 0.5,
          },
        }}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={(event) => {
          const formattedText = formatInputBasedOnMask(event.target.value)
          setValue(formattedText)
        }}
      />
      <Box
        ref={textRef}
        sx={{
          ...theme.heading,
          fontWeight: "bold",
          width: "auto",
          visibility: "hidden",
          position: "fixed",
          top: 0,
          overflow: "auto",
        }}
      >
        {value || placeholder}
      </Box>
      <motion.div
        animate={controls}
        style={{
          backgroundColor: theme.colors.white,
          borderRadius: 10,
          opacity: 0.2,
          position: "absolute",
          top: `-${INPUT_PADDING}px`,
          left: `-${INPUT_PADDING}px`,
          height: `${inputHeight + INPUT_PADDING * 2}px`,
        }}
      />
    </Box>
  )
}
