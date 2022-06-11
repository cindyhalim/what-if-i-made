import React, { useEffect, useState } from "react"
import { Theme } from "../styles/theme"
import { TextInput } from "./TextInput"

const options = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
]

interface IRegionTextInputProps {
  theme?: Theme
  input: string | null
  setInput: React.Dispatch<React.SetStateAction<string | null>>
}

export const RegionTextInput: React.FC<IRegionTextInputProps> = ({
  input,
  setInput,
  theme = Theme.PRIMARY,
}) => {
  const [searchResult, setSearchResult] = useState<string | null>(null)

  useEffect(() => {
    if (input && input.length >= 3) {
      const results = options.filter((option) => option.includes(input))
      setSearchResult(results[0] || "")
    }

    if (input && input.length < 4) {
      setSearchResult("")
    }
  }, [input])

  return (
    <TextInput
      theme={theme}
      name="region"
      placeholder="province/territory"
      value={input}
      autoSuggestion={searchResult || ""}
      setAutoSuggestion={setSearchResult}
      setValue={setInput}
    />
  )
}
