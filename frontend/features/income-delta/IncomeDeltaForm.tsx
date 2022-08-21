import React, { useEffect, useState } from "react"
import { useMutation } from "react-query"
import { Flex, Text } from "rebass"
import { BaseForm } from "../../components/BaseForm"
import { americanStates, canadianRegions, RegionTextInput } from "../../components/RegionTextInput"
import { TextInput } from "../../components/TextInput"
import { incomeDeltaMutationFn } from "../../core/mutations"
import { actions } from "../../core/redux/incomeDeltaSlice"
import { actions as appActions } from "../../core/redux/app"
import { useAppDispatch, useAppSelector } from "../../core/redux/store"
import { theme } from "../../styles/theme"

export const IncomeDeltaForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const region = useAppSelector((state) => state.app.region)
  const currentIncome = useAppSelector((state) => state.incomeDelta.currentIncome)
  const desiredIncome = useAppSelector((state) => state.incomeDelta.desiredIncome)
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

  const incomeDeltaPrompts = [
    <>
      <Text as={"h2"} sx={{ ...theme.heading }}>
        i live in
      </Text>
      <RegionTextInput input={region} setInput={handleSetRegion} />
    </>,

    <>
      <Text as={"h2"} sx={{ ...theme.heading }}>
        i currently make{" "}
      </Text>
      <TextInput
        name={"current-income"}
        placeholder={"$50,000"}
        type={"money"}
        value={currentIncome}
        setValue={(val) => dispatch(actions.setCurrentIncome(val))}
      />
      <Text as={"h2"} sx={{ ...theme.heading }}>
        anually
      </Text>
    </>,
    <>
      <Text as={"h2"} sx={{ ...theme.heading }}>
        what if i made{" "}
      </Text>
      <TextInput
        name={"current-income"}
        placeholder={"$100,000"}
        type={"money"}
        value={desiredIncome}
        setValue={(val) => dispatch(actions.setDesiredIncome(val))}
      />
      <Text as={"h2"} sx={{ ...theme.heading }}>
        ?
      </Text>
    </>,
  ]

  const { isLoading, mutate } = useMutation("mutateIncomeDelta", incomeDeltaMutationFn, {
    onError: () => setErrorMessage("Something went wrong. Please try again."),
    onSuccess: (data) => {
      dispatch(
        actions.setResults({
          percentageIncrease: data.percentageIncrease,
          currentIncomeAfterTax: data.currentIncomeAfterTax,
          desiredIncomeAfterTax: data.desiredIncomeAfterTax,
        }),
      )
    },
  })

  const validate = () => {
    if (!region || !currentIncome || !desiredIncome) {
      setErrorMessage("Missing required fields")
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
        currentIncome: currentIncome || "",
        desiredIncome: desiredIncome || "",
      })
    }
  }

  return (
    <BaseForm
      button={{
        onSubmit: handleOnSubmit,
        isDisabled: isLoading,
        isLoading,
      }}
      errorMessage={errorMessage}
    >
      {incomeDeltaPrompts.map((prompt, idx) => (
        <Flex key={idx} sx={{ flexWrap: "wrap", alignItems: "center", marginBottom: 20 }}>
          {prompt}
        </Flex>
      ))}
    </BaseForm>
  )
}
