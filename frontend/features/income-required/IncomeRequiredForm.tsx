import React, { useEffect, useState } from "react"
import { useMutation } from "react-query"
import { Flex, Text } from "rebass"
import { BaseForm } from "../../components/BaseForm"
import { americanStates, canadianRegions, RegionTextInput } from "../../components/RegionTextInput"
import { TextInput } from "../../components/TextInput"
import { incomeRequiredMutationFn } from "../../core/mutations"
import { actions } from "../../core/redux/incomeRequiredSlice"
import { actions as appActions } from "../../core/redux/app"
import { useAppDispatch, useAppSelector } from "../../core/redux/store"
import { theme, Theme } from "../../styles/theme"

export const IncomeRequiredForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const region = useAppSelector((state) => state.app.region)
  const spending = useAppSelector((state) => state.incomeRequired.spending)
  const goal = useAppSelector((state) => state.incomeRequired.goal)
  const duration = useAppSelector((state) => state.incomeRequired.duration)
  const country = useAppSelector((state) => state.app.country)

  const dispatch = useAppDispatch()

  useEffect(() => {
    // clears the state when unmounted
    return () => {
      dispatch(actions.clearState())
    }
  }, [dispatch])

  const handleSetRegion = (value: string | null) => {
    dispatch(appActions.setRegion(value))
  }

  const incomeRequiredPrompts = [
    <>
      <Text as={"h2"} sx={{ ...theme.heading }}>
        i live in
      </Text>
      <RegionTextInput theme={Theme.SECONDARY} input={region} setInput={handleSetRegion} />
    </>,
    <>
      <Text as={"h2"} sx={{ ...theme.heading }}>
        on average, i spend
      </Text>
      <TextInput
        theme={Theme.SECONDARY}
        name={"current-income"}
        placeholder={"$4,500"}
        type={"money"}
        value={spending}
        setValue={(val) => dispatch(actions.setSpending(val))}
      />
      <Text as={"h2"} sx={{ ...theme.heading }}>
        per month
      </Text>
    </>,
    <>
      <Text as={"h2"} sx={{ ...theme.heading }}>
        if i want to save
      </Text>
      <TextInput
        theme={Theme.SECONDARY}
        name={"current-income"}
        placeholder={"$100,000"}
        type={"money"}
        value={goal}
        setValue={(val) => dispatch(actions.setGoal(val))}
      />
      <Text as={"h2"} sx={{ ...theme.heading }}>
        in
      </Text>
      <TextInput
        theme={Theme.SECONDARY}
        name={"current-income"}
        placeholder={"3"}
        type={"number"}
        value={duration}
        setValue={(val) => dispatch(actions.setDuration(val))}
      />
      <Text as={"h2"} sx={{ ...theme.heading }}>
        years
      </Text>
    </>,
  ]

  const { isLoading, mutate } = useMutation("mutateIncomeRequired", incomeRequiredMutationFn, {
    onError: () => setErrorMessage("Something went wrong. Please try again."),
    onSuccess: (data) => {
      dispatch(
        actions.setResults({
          incomeBeforeTax: data.incomeRequiredBeforeTax,
          taxesPaid: data.taxPaid,
        }),
      )
    },
  })

  const validate = () => {
    if (!region || !spending || !goal || !duration) {
      setErrorMessage("Missing required fields")
      return false
    }

    if (parseInt(duration) < 1) {
      setErrorMessage("Saving goal should at least be 1 year")
      return false
    }

    if (
      (region && country === "CA" && !canadianRegions.includes(region)) ||
      (country === "US" && !americanStates.includes(region))
    ) {
      setErrorMessage("Not a valid Canadian province/territory")
      return false
    }

    return true
  }

  const handleOnSubmit = () => {
    const isValid = validate()

    if (isValid) {
      dispatch(actions.hideResults())
      mutate({
        country,
        region: region || "",
        expensesPerMonth: spending || "",
        goal: goal || "",
        duration: duration || "",
      })
    }
  }
  return (
    <BaseForm
      theme={Theme.SECONDARY}
      button={{
        onSubmit: handleOnSubmit,
        isDisabled: isLoading,
        isLoading,
      }}
      errorMessage={errorMessage}
    >
      {incomeRequiredPrompts.map((prompt, idx) => (
        <Flex key={idx} sx={{ flexWrap: "wrap", alignItems: "center", marginBottom: 20 }}>
          {prompt}
        </Flex>
      ))}
      <Text as={"h2"} sx={{ ...theme.heading }}>
        how much should i make?
      </Text>
    </BaseForm>
  )
}
