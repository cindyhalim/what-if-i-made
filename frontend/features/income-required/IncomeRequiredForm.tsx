import React, { useState } from "react"
import { Flex, Text } from "rebass"
import { BaseForm } from "../../components/BaseForm"
import { RegionTextInput } from "../../components/RegionTextInput"
import { TextInput } from "../../components/TextInput"
import { theme, Theme } from "../../styles/theme"

export const IncomeRequiredForm: React.FC = () => {
  const [region, setRegion] = useState<string | null>(null)
  const [spending, setSpending] = useState<string | null>(null)
  const [goal, setGoal] = useState<string | null>(null)
  const [duration, setDuration] = useState<string | null>(null)

  const incomeRequiredPrompts = [
    <>
      <Text as={"h2"} sx={{ ...theme.heading }}>
        i live in
      </Text>
      <RegionTextInput theme={Theme.SECONDARY} input={region} setInput={setRegion} />
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
        setValue={setSpending}
      />
      <Text as={"h2"} sx={{ ...theme.heading }}>
        per month
      </Text>
    </>,
    <>
      <Text as={"h2"} sx={{ ...theme.heading }}>
        i want to save
      </Text>
      <TextInput
        theme={Theme.SECONDARY}
        name={"current-income"}
        placeholder={"$100,000"}
        type={"money"}
        value={goal}
        setValue={setGoal}
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
        setValue={setDuration}
      />
      <Text as={"h2"} sx={{ ...theme.heading }}>
        years
      </Text>
    </>,
  ]

  return (
    <BaseForm
      theme={Theme.SECONDARY}
      button={{
        onSubmit: () => null,
      }}
    >
      {incomeRequiredPrompts.map((prompt, idx) => (
        <Flex key={idx} sx={{ flexWrap: "wrap", alignItems: "center", marginBottom: 20 }}>
          {prompt}
        </Flex>
      ))}
      <Text as={"h2"} sx={{ ...theme.heading }}>
        how much should i be making?
      </Text>
    </BaseForm>
  )
}
