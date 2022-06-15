import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IIncomeDeltaState {
  currentIncome: string | null
  desiredIncome: string | null
  percentageIncrease: number | null
  currentIncomeAfterTax: number | null
  desiredIncomeAfterTax: number | null
  showResults: boolean
}

const incomeDeltaInitialState: IIncomeDeltaState = {
  currentIncome: null,
  desiredIncome: null,
  percentageIncrease: null,
  currentIncomeAfterTax: null,
  desiredIncomeAfterTax: null,
  showResults: false,
}

export const { actions, reducer } = createSlice({
  name: "incomeDelta",
  initialState: incomeDeltaInitialState,
  reducers: {
    setCurrentIncome: (state, action: PayloadAction<string | null>) => {
      state.currentIncome = action.payload
    },
    setDesiredIncome: (state, action: PayloadAction<string | null>) => {
      state.desiredIncome = action.payload
    },
    clearState: () => incomeDeltaInitialState,
    hideResults: (state) => {
      state.showResults = false
    },
    setResults: (
      state,
      action: PayloadAction<{
        percentageIncrease: number
        currentIncomeAfterTax: number
        desiredIncomeAfterTax: number
      }>,
    ) => {
      state.showResults = true
      state.percentageIncrease = action.payload.percentageIncrease
      state.currentIncomeAfterTax = action.payload.currentIncomeAfterTax
      state.desiredIncomeAfterTax = action.payload.desiredIncomeAfterTax
    },
  },
})
