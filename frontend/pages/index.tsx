import type { NextPage } from "next"
import Head from "next/head"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../styles/theme"
import React, { useEffect, useRef } from "react"

import { IncomeDeltaForm } from "../features/income-delta/IncomeDeltaForm"
import { IncomeRequiredForm } from "../features/income-required/IncomeRequiredForm"
import { motion, useAnimation } from "framer-motion"
import { BaseLayout } from "../components/BaseLayout"

import { IncomeRequiredResult } from "../features/income-required/IncomeRequiredResult"
import { IncomeDeltaResult } from "../features/income-delta/incomeDeltaResult"
import { useAppDispatch, useAppSelector } from "../core/redux/store"
import { actions, Form } from "../core/redux/app"
import { actions as incomeDeltaActions } from "../core/redux/incomeDeltaSlice"
import { actions as incomeRequiredActions } from "../core/redux/incomeRequiredSlice"
import { useTheme } from "../hooks/useTheme"

const Form = () => {
  const form = useAppSelector((state) => state.app.form)
  const dispatch = useAppDispatch()
  const { form: formTheme } = useTheme()

  const setForm = (formType: Form) => {
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
      <motion.div animate={controls}>
        {isIncomeDeltaForm ? <IncomeDeltaForm /> : <IncomeRequiredForm />}
      </motion.div>
    </BaseLayout>
  )
}

const Result = () => {
  const incomeDeltaHasResults = useAppSelector((state) => state.incomeDelta.showResults)
  const incomeRequiredHasResults = useAppSelector((state) => state.incomeRequired.showResults)
  const { results: resultsTheme } = useTheme()

  const resultsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (incomeDeltaHasResults || incomeRequiredHasResults) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
    }
  }, [incomeDeltaHasResults, incomeRequiredHasResults])

  if (!incomeDeltaHasResults && !incomeRequiredHasResults) {
    return null
  }

  return (
    <BaseLayout theme={resultsTheme} ref={resultsRef}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: false }}
      >
        {incomeDeltaHasResults && <IncomeDeltaResult />}
        {incomeRequiredHasResults && <IncomeRequiredResult />}
      </motion.div>
    </BaseLayout>
  )
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>what if i made - income visualizer</title>
        <meta name="description" content="tool to visualize your nominal income gains" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Form />
        <Result />
      </ThemeProvider>
    </>
  )
}

export default Home
