import type { NextPage } from "next"
import Head from "next/head"
import { ThemeProvider } from "@emotion/react"
import { Theme, theme } from "../styles/theme"
import React, { useEffect, useState } from "react"

import { IncomeDeltaForm } from "../features/income-delta/IncomeDeltaForm"
import { IncomeRequiredForm } from "../features/income-required/IncomeRequiredForm"
import { motion, useAnimation } from "framer-motion"
import { BaseLayout } from "../components/BaseLayout"
import { Loading } from "../components/Loading"

type Form = "income-delta" | "income-required"

const Form = () => {
  const [form, setForm] = useState<Form>("income-delta")
  const controls = useAnimation()

  const isIncomeDeltaForm = form === "income-delta"

  useEffect(() => {
    isIncomeDeltaForm
      ? controls.start({
          x: [0, 100, 0],
          transition: { duration: 0.5 },
        })
      : controls.start({
          x: [0, -100, 0],
          transition: { duration: 0.5 },
        })
  }, [controls, isIncomeDeltaForm])

  const handleOnFormTransition = () => {
    return isIncomeDeltaForm ? setForm("income-required") : setForm("income-delta")
  }

  return (
    <BaseLayout
      theme={isIncomeDeltaForm ? Theme.PRIMARY : Theme.SECONDARY}
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
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>what if i made</title>
        <meta name="description" content="tool to visualize your nominal income gains" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Form />
      </ThemeProvider>
    </>
  )
}

export default Home
