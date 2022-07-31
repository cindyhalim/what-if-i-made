import { motion } from "framer-motion"
import React from "react"
import { useDispatch } from "react-redux"
import { Box } from "rebass"
import { actions, Country } from "../core/redux/app"
import { actions as incomeDeltaActions } from "../core/redux/incomeDeltaSlice"
import { actions as incomeRequiredActions } from "../core/redux/incomeRequiredSlice"
import { useAppSelector } from "../core/redux/store"
import { Theme, themeColors } from "../styles/theme"

interface ICountryIndicatorProps {
  text: Country
  theme: Theme
}

export const CountryIndicator: React.FC<ICountryIndicatorProps> = ({ text, theme }) => {
  const currentCountry = useAppSelector((state) => state.app.country)
  const isSelected = (current: Country) => current === text

  const dispatch = useDispatch()

  const DIMENSION = 30
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
      }}
      style={{
        display: "flex",
        backgroundColor: themeColors[theme].text,
        width: DIMENSION,
        height: DIMENSION,
        borderRadius: DIMENSION,
        opacity: isSelected(currentCountry) ? 1 : 0.6,
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        marginRight: "5px",
      }}
      onClick={() => {
        dispatch(actions.setCountry(text))
        dispatch(actions.resetRegion())
        // reset forms
        dispatch(incomeDeltaActions.clearState())
        dispatch(incomeRequiredActions.clearState())
      }}
    >
      <Box
        sx={{
          fontSize: 14,
          color: themeColors[theme].bg,
          fontWeight: "bold",
        }}
      >
        {text.toUpperCase()}
      </Box>
    </motion.div>
  )
}
