import React, { useEffect, useState } from "react"
import { useAppSelector } from "../core/redux/store"
import { Theme } from "../styles/theme"
import { TextInput } from "./TextInput"

export const canadianRegions = [
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

export const americanStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Washington DC",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
]

export interface IRegionTextInputProps {
  theme?: Theme
  input: string | null
  setInput: React.Dispatch<React.SetStateAction<string | null>>
}

export const RegionTextInput: React.FC<IRegionTextInputProps> = ({
  input,
  setInput,
  theme = Theme.PRIMARY,
}) => {
  const country = useAppSelector((state) => state.app.country)
  const [searchResult, setSearchResult] = useState<string | null>(null)
  const isCanada = country == "CA"
  const region_list = isCanada ? canadianRegions : americanStates
  const placeholder = isCanada ? "province/territory" : "state"

  useEffect(() => {
    if (input && input.length >= 3) {
      const results = region_list.filter((region) => region.includes(input))
      setSearchResult(results[0] || "")
    }

    if (input && input.length < 4) {
      setSearchResult("")
    }
  }, [input, region_list])

  return (
    <TextInput
      theme={theme}
      name="region"
      placeholder={placeholder}
      value={input}
      autoSuggestion={searchResult || ""}
      setAutoSuggestion={setSearchResult}
      setValue={setInput}
    />
  )
}
