import type { NextPage } from "next";
import Head from "next/head";
import { ThemeProvider } from "@emotion/react";
import { Flex, Text } from "rebass";

const theme = {
  breakpoints: ["425px", "768px", "1170px", "1280px", "1440px"],
  colors: {
    green: "#26AB64",
    white: "#F3F8F2",
  },
  heading: {
    fontSize: [40, 50, 60, 70],
  },
};

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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100%",
            color: theme.colors.white,
            backgroundColor: theme.colors.green,
          }}
        >
          <Text as={"h2"} sx={{ ...theme.heading }}>
            i live in ____
          </Text>
          <Text as={"h2"} sx={{ ...theme.heading }}>
            i currently make ____
          </Text>
          <Text as={"h2"} sx={{ ...theme.heading }}>
            what if i made ____ ?
          </Text>
        </Flex>
      </ThemeProvider>
    </>
  );
};

export default Home;
