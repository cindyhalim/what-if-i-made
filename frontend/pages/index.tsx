import type { NextPage } from "next"
import Head from "next/head"
import { ThemeProvider } from "@emotion/react"
import { Theme, theme } from "../styles/theme"
import React, { useState } from "react"

import { IncomeDeltaForm } from "../features/income-delta/IncomeDeltaForm"
import { IncomeRequiredForm } from "../features/income-required/IncomeRequiredForm"
import { motion, useAnimation } from "framer-motion"
import { BaseLayout } from "../components/BaseLayout"

import { IncomeRequiredResult } from "../features/income-required/IncomeRequiredResult"

type Form = "income-delta" | "income-required"

const Form = () => {
  const [form, setForm] = useState<Form>("income-delta")
  const controls = useAnimation()

  const isIncomeDeltaForm = form === "income-delta"

  const handleOnFormTransition = () => {
    if (isIncomeDeltaForm) {
      setForm("income-required")
      controls.start({
        x: [0, -100, 0],
        transition: { duration: 0.5 },
      })
    } else {
      setForm("income-delta")
      controls.start({
        x: [0, 100, 0],
        transition: { duration: 0.5 },
      })
    }
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

// const IncomeDeltaResult = () => {
//   return (
//     <Box
//       as={"span"}
//       sx={{
//         cursor: "default",
//         ...theme.heading,
//       }}
//     >
//       that is a <TextHighlight theme={Theme.SECONDARY} text={" 50% increase"} />
//     </Box>
//   )
// }

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
        {/* <BaseLayout theme={Theme.SECONDARY}>
          <IncomeDeltaResult />
        </BaseLayout> */}

        <IncomeRequiredResult />
      </ThemeProvider>
    </>
  )
}

export default Home
