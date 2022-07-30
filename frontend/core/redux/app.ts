import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Form = "income-delta" | "income-required"
export type Country = "CA" | "US"
export interface IAppState {
  form: Form
  country: Country
}

const appInitialState: IAppState = {
  form: "income-delta",
  country: "CA",
}

export const { actions, reducer } = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    setForm: (state, action: PayloadAction<Form>) => {
      state.form = action.payload
    },
    setCountry: (state, action: PayloadAction<Country>) => {
      state.country = action.payload
    },
  },
})
