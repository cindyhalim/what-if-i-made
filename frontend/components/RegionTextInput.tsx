import React from "react"
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
  setInput: (value: string | null) => void
}

export const RegionTextInput: React.FC<IRegionTextInputProps> = ({
  input,
  setInput,
  theme = Theme.PRIMARY,
}) => {
  const country = useAppSelector((state) => state.app.country)
  const isCanada = country == "CA"
  const regionList = isCanada ? canadianRegions : americanStates
  const placeholder = isCanada ? "province/territory" : "state"

  const results = input ? regionList.filter((region) => region.includes(input)) : []
  const searchResult = input && input.length >= 3 ? results[0] : ""

  return (
    <TextInput
      theme={theme}
      name="region"
      placeholder={placeholder}
      value={input}
      autoSuggestion={searchResult}
      setValue={setInput}
    />
  )
}
