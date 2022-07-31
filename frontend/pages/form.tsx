import React from "react"
import { useAppDispatch, useAppSelector } from "../core/redux/store"
import { actions, Country, Form as FormType } from "../core/redux/app"
import { actions as incomeDeltaActions } from "../core/redux/incomeDeltaSlice"
import { actions as incomeRequiredActions } from "../core/redux/incomeRequiredSlice"

import { useTheme } from "../hooks/useTheme"
import { motion, useAnimation } from "framer-motion"
import { BaseLayout } from "../components/BaseLayout"
import { IncomeDeltaForm } from "../features/income-delta/IncomeDeltaForm"
import { IncomeRequiredForm } from "../features/income-required/IncomeRequiredForm"
import { CountryIndicator } from "../components/CountryIndicator"
import { Flex } from "rebass"

const Form = () => {
  const form = useAppSelector((state) => state.app.form)
  const dispatch = useAppDispatch()
  const { form: formTheme } = useTheme()

  const setForm = (formType: FormType) => {
    dispatch(actions.setForm(formType))
  }
  const controls = useAnimation()

  const isIncomeDeltaForm = form === "income-delta"

  const handleOnFormTransition = () => {
    if (isIncomeDeltaForm) {
      dispatch(incomeDeltaActions.hideResults())
      setForm("income-required")
      controls.start({
        x: [0, -100, 0],
        transition: { duration: 0.5 },
      })
    } else {
      dispatch(incomeRequiredActions.hideResults())
      setForm("income-delta")
      controls.start({
        x: [0, 100, 0],
        transition: { duration: 0.5 },
      })
    }
  }

  return (
    <BaseLayout
      theme={formTheme}
      switchForm={{
        direction: isIncomeDeltaForm ? "right" : "left",
        onClick: handleOnFormTransition,
      }}
    >
      <Flex
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        {[Country.CA, Country.US].map((country, idx) => (
          <CountryIndicator key={idx} text={country} theme={formTheme} />
        ))}
      </Flex>
      <motion.div animate={controls}>
        {isIncomeDeltaForm ? <IncomeDeltaForm /> : <IncomeRequiredForm />}
      </motion.div>
    </BaseLayout>
  )
}

export default Form
