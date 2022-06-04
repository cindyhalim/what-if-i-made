import type { NextPage } from "next";
import Head from "next/head";
import { ThemeProvider } from "@emotion/react";
import { Box, Flex, Text } from "rebass";
import { Button } from "../components/Button";
import { theme } from "../styles/theme";
import { Dropdown } from "../components/Dropdown";
import { TextInput } from "../components/InputText";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>what if i made</title>
        <meta
          name="description"
          content="tool to visualize your nominal income gains"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100%",
            color: theme.colors.white,
            flexDirection: "column",
            backgroundColor: theme.colors.green,
          }}
        >
          <Flex sx={{ flexDirection: "column", marginY: 80 }}>
            <Text as={"h2"} sx={{ ...theme.heading }}>
              i live in
            </Text>
            <Box sx={{ display: "inline-block" }}>
              <Text as={"h2"} sx={{ ...theme.heading }}>
                i currently make <TextInput name={"current-income"} />.
              </Text>
            </Box>

            <Text as={"h2"} sx={{ ...theme.heading }}>
              what if i made ____ ?
            </Text>
          </Flex>
          <Button onClick={() => null}>find out</Button>
        </Flex>
      </ThemeProvider>
    </>
  );
};

export default Home;
