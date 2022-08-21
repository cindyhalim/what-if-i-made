import { Input } from "@rebass/forms"
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Box } from "rebass"
import { Theme, theme as baseTheme, themeColors } from "../styles/theme"
import { motion } from "framer-motion"
import { INPUT_PADDING, useHighlightAnimation } from "../hooks/useHighlightAnimation"
import { useAppSelector } from "../core/redux/store"

type InputType = "money" | "text" | "number"
export interface ITextInputProps {
  name: string
  theme?: Theme
  placeholder?: string
  type?: InputType
  setValue: (val: string | null) => void
  value: string | null
  autoSuggestion?: string
}

export const TextInput: React.FC<ITextInputProps> = ({
  name,
  theme = Theme.PRIMARY,
  placeholder = "",
  type = "text",
  setValue,
  value,
  autoSuggestion,
}) => {
  const [inputWidth, setInputWidth] = useState<number>(0)

  const textRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { controls, animateHighlight, resetHighlight } = useHighlightAnimation()

  const inputHeight = inputRef?.current?.getBoundingClientRect()?.height || 0
  const height = `${inputHeight + INPUT_PADDING * 2}px`

  const getWidth = () => {
    return textRef?.current?.getBoundingClientRect()?.width || 0
  }

  // only want to trigger this on first render, hence why we don't add value in dep array
  useEffect(() => {
    if (value) {
      const width = getWidth()

      animateHighlight(width)
    }
  }, [animateHighlight])

  // reset highlgiht if value is reset
  useEffect(() => {
    if (!value) {
      resetHighlight()
    }
  }, [value])

  useLayoutEffect(() => {
    const width = getWidth()
    setInputWidth(width)
  }, [value, placeholder])

  const onWindowResize = useCallback(async () => {
    const width = getWidth()

    setInputWidth(width)

    if (value) {
      resetHighlight()
      animateHighlight(width)
    }
  }, [value, animateHighlight, resetHighlight])

  useLayoutEffect(() => {
    window.addEventListener("resize", onWindowResize)

    return () => window.removeEventListener("resize", onWindowResize)
  })

  const formatInputBasedOnType = (type: InputType, inputText: string) => {
    switch (type) {
      case "money":
        // replace symbols (non digits, non words, and not space)
        const formattedMoneyText = inputText.replace(/[^0-9]/g, "")
        const textWithThousandsSeparator = formattedMoneyText.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return formattedMoneyText ? `$${textWithThousandsSeparator}` : ""
      case "number":
        return inputText.replace(/[^0-9]/g, "")
      case "text":
        // replace symbols (not words and not space)
        const formattedText = inputText.replace(/[^a-zA-Z\s]/g, "")
        if (formattedText.length === 1) {
          return formattedText.toUpperCase()
        }
        return formattedText
      default:
        return inputText
    }
  }

  const validate = (type: InputType, text: string) => {
    if (type === "number") {
      if (parseInt(text) > 100) return false
    }

    return true
  }

  const handleOnInputFocus = () => {
    resetHighlight()
  }

  const handleOnInputBlur = () => {
    if (autoSuggestion) {
      setValue(autoSuggestion)
    }

    if (value) {
      const width = textRef?.current?.getBoundingClientRect()?.width || 0
      animateHighlight(width)
    }
  }

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedText = formatInputBasedOnType(type, event.target.value)
    const isValid = validate(type, formattedText)
    if (isValid) {
      setValue(formattedText)
    }
  }

  const handleOnInputContainerClick = () => {
    inputRef.current?.focus()
  }

  return (
    <Box
      as={"span"}
      sx={{
        position: "relative",
        cursor: "text",
        width: "auto",
        height: "auto",
        color: themeColors[theme].text,
        marginX: ["8px", "8px", "15px"],
      }}
      onClick={handleOnInputContainerClick}
    >
      <Input
        ref={inputRef}
        id={name}
        type="text"
        contentEditable={"true"}
        spellCheck={"false"}
        autoComplete={"off"}
        autoCapitalize={"sentences"}
        value={value || ""}
        placeholder={placeholder}
        sx={{
          ...baseTheme.heading,
          zIndex: 1000,
          outline: 0,
          border: 0,
          padding: 0,
          width: inputWidth + 10,
          display: "inline-block",
          "::placeholder": {
            color: themeColors[theme].text,
            fontWeight: "bold",
            opacity: 0.5,
          },
        }}
        onKeyDown={(event) => {
          if (autoSuggestion && event.code === "Enter") {
            setValue(autoSuggestion)
            event.currentTarget.blur()
          }
        }}
        onFocus={handleOnInputFocus}
        onBlur={handleOnInputBlur}
        onChange={handleOnInputChange}
      />
      {autoSuggestion && (
        <Input
          value={autoSuggestion}
          readOnly
          sx={{
            ...baseTheme.heading,
            padding: 0,
            width: inputWidth,
            display: "inline-block",
            position: "absolute",
            outline: 0,
            border: 0,
            opacity: 0.5,
            top: 0,
            left: 0,
          }}
        />
      )}
      <motion.div
        animate={controls}
        style={{
          backgroundColor: themeColors[theme].text,
          borderRadius: 10,
          opacity: 0.3,
          position: "absolute",
          top: `-${INPUT_PADDING}px`,
          left: `-${INPUT_PADDING}px`,
          height,
        }}
      />
      {/* hidden div to measure text input width and height*/}
      <Box
        ref={textRef}
        sx={{
          ...baseTheme.heading,
          width: "auto",
          visibility: "hidden",
          position: "fixed",
          top: 0,
          overflow: "auto",
        }}
      >
        {autoSuggestion || value || placeholder}
      </Box>
    </Box>
  )
}
