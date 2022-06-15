import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IIncomeRequiredState {
  spending: string | null
  goal: string | null
  duration: string | null
  incomeBeforeTax: number | null
  taxesPaid: number | null
  showResults: boolean
}

const incomeRequiredInitialState: IIncomeRequiredState = {
  spending: null,
  goal: null,
  duration: null,
  incomeBeforeTax: null,
  taxesPaid: null,
  showResults: false,
}

export const { actions, reducer } = createSlice({
  name: "incomeRequired",
  initialState: incomeRequiredInitialState,
  reducers: {
    setSpending: (state, action: PayloadAction<string | null>) => {
      state.spending = action.payload
    },
    setGoal: (state, action: PayloadAction<string | null>) => {
      state.goal = action.payload
    },
    setDuration: (state, action: PayloadAction<string | null>) => {
      state.duration = action.payload
    },
    hideResults: (state) => {
      state.showResults = false
    },
    clearState: () => incomeRequiredInitialState,
    setResults: (
      state,
      action: PayloadAction<{
        incomeBeforeTax: number
        taxesPaid: number
      }>,
    ) => {
      state.showResults = true
      state.incomeBeforeTax = action.payload.incomeBeforeTax
      state.taxesPaid = action.payload.taxesPaid
    },
  },
})
