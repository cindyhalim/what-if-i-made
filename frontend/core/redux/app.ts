import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Form = "income-delta" | "income-required"

export enum Country {
  CA = "CA",
  US = "US",
}
export interface IAppState {
  form: Form
  country: Country
  region: string | null
}

const appInitialState: IAppState = {
  form: "income-delta",
  country: Country.CA,
  region: null,
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
    setRegion: (state, action: PayloadAction<string | null>) => {
      state.region = action.payload
    },
    resetRegion: (state) => {
      state.region = appInitialState.region
    },
  },
})
