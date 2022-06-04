import React from "react";
import { Select } from "@rebass/forms";

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
];
export const Dropdown = () => {
  return (
    <Select name="provincesAndTerritories" defaultValue="Ontario">
      {options.map((optionName, idx) => (
        <option key={idx}>{optionName}</option>
      ))}
    </Select>
  );
};
