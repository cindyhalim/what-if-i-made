import React from "react";
import { Button as RButton, Text } from "rebass";
import { theme } from "../styles/theme";

export enum ButtonType {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
}

interface IButtonProps {
  children: React.ReactNode;
  type?: ButtonType;
  onClick: () => void;
}
export const Button: React.FC<IButtonProps> = ({
  children,
  type = ButtonType.PRIMARY,
  onClick,
}) => {
  return (
    <RButton
      sx={{
        width: ["120px", "200px"],
        height: ["35px", "50px"],
        color: theme.colors.green,
        backgroundColor: theme.colors.white,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": {
          opacity: 0.9,
        },
      }}
      onClick={onClick}
    >
      <Text as="h3" sx={{ fontSize: [18, 25] }}>
        {children}
      </Text>
    </RButton>
  );
};
