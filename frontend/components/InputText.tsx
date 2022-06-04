import { Input } from "@rebass/forms";
import React from "react";
import { theme } from "../styles/theme";

interface ITextInputProps {
  name: string;
}
export const TextInput: React.FC<ITextInputProps> = ({ name }) => {
  return (
    <Input
      id={name}
      name={name}
      type="text"
      sx={{
        maxWidth: ["200px", "350px"],
        height: ["35px", "80px"],
        outline: 0,
        border: 0,
        borderBottom: `8px solid ${theme.colors.white}`,
        color: theme.colors.white,
        fontSize: 60,
        fontWeight: "bold",
      }}
    />
  );
};
