import { useAppSelector } from "../core/redux/store"
import { Theme } from "../styles/theme"

export const useTheme = () => {
  const form = useAppSelector((state) => state.app.form)

  if (form === "income-delta") {
    return {
      form: Theme.PRIMARY,
      results: Theme.SECONDARY,
    }
  } else {
    return {
      form: Theme.SECONDARY,
      results: Theme.PRIMARY,
    }
  }
}
