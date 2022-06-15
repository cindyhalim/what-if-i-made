import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Form = "income-delta" | "income-required"

export interface IAppState {
  form: Form
}

const appInitialState: IAppState = {
  form: "income-delta",
}

export const { actions, reducer } = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    setForm: (state, action: PayloadAction<Form>) => {
      state.form = action.payload
    },
  },
})
