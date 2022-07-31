import type { NextPage } from "next"
import Head from "next/head"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../styles/theme"
import React from "react"

import Form from "./form"
import Result from "./result"

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
