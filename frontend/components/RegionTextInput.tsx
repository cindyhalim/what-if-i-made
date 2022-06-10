import React, { useEffect, useMemo, useState } from "react"
import { TextInput } from "./TextInput"
import Fuse from "fuse.js"

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
  input: string | null
  setInput: React.Dispatch<React.SetStateAction<string | null>>
}

export const RegionTextInput: React.FC<IRegionTextInputProps> = ({ input, setInput }) => {
  const [searchResult, setSearchResult] = useState<string | null>(null)

  useEffect(() => {
    if (input && input.length >= 3) {
      const results = options.filter((option) => option.includes(input))
      setSearchResult(results[0] || "")
    }
  }, [input])

  useEffect(() => {
    if (input && input.length < 4) {
      setSearchResult("")
    }
  }, [input])

  return (
    <>
      <TextInput
        name="region"
        placeholder="province/territory"
        value={input}
        autoSuggestion={searchResult || ""}
        setAutoSuggestion={setSearchResult}
        setValue={setInput}
        onChange={(text: string) => {
          setInput(text)
        }}
      />
    </>
  )
}
