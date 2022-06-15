import { configureStore } from "@reduxjs/toolkit"
import { reducer as incomeRequiredReducer } from "./incomeRequiredSlice"
import { reducer as incomeDeltaReducer } from "./incomeDeltaSlice"
import { reducer as appReducer } from "./app"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const store = configureStore({
  reducer: {
    incomeRequired: incomeRequiredReducer,
    incomeDelta: incomeDeltaReducer,
    app: appReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
