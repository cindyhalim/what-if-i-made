import { motion } from "framer-motion"
import React, { useEffect, useRef } from "react"
import { BaseLayout } from "../components/BaseLayout"
import { useAppSelector } from "../core/redux/store"
import { IncomeDeltaResult } from "../features/income-delta/incomeDeltaResult"
import { IncomeRequiredResult } from "../features/income-required/IncomeRequiredResult"
import { useTheme } from "../hooks/useTheme"

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
        whileInView={{ opacity: 1, transition: { duration: 1.5 } }}
        viewport={{ once: false }}
      >
        {incomeDeltaHasResults && <IncomeDeltaResult />}
        {incomeRequiredHasResults && <IncomeRequiredResult />}
      </motion.div>
    </BaseLayout>
  )
}

export default Result
