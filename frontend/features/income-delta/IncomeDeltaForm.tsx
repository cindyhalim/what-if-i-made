import React, { useState } from "react"
import { useMutation } from "react-query"
import { Flex, Text } from "rebass"
import { BaseForm } from "../../components/BaseForm"
import { RegionTextInput } from "../../components/RegionTextInput"
import { TextInput } from "../../components/TextInput"
import { incomeDeltaQueryFn } from "../../core/mutations"
import { theme } from "../../styles/theme"

export const IncomeDeltaForm: React.FC = () => {
  const [currentIncome, setCurrentIncome] = useState<string | null>(null)
  const [desiredIncome, setDesiredIncome] = useState<string | null>(null)
  const [region, setRegion] = useState<string | null>(null)

  const incomeDeltaPrompts = [
    <>
      <Text as={"h2"} sx={{ ...theme.heading }}>
        i live in
      </Text>
      <RegionTextInput input={region} setInput={setRegion} />
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
        setValue={setCurrentIncome}
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
        setValue={setDesiredIncome}
      />
      <Text as={"h2"} sx={{ ...theme.heading }}>
        ?
      </Text>
    </>,
  ]

  const mutation = useMutation(incomeDeltaQueryFn)

  const handleOnSubmit = () => {
    mutation.mutate({
      region: region || "",
      currentIncome: currentIncome || "",
      desiredIncome: desiredIncome || "",
    })
  }

  return (
    <BaseForm
      button={{
        onSubmit: handleOnSubmit,
      }}
    >
      {incomeDeltaPrompts.map((prompt, idx) => (
        <Flex key={idx} sx={{ flexWrap: "wrap", alignItems: "center", marginBottom: 20 }}>
          {prompt}
        </Flex>
      ))}
    </BaseForm>
  )
}
