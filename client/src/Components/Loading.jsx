import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <Flex
      border={"solid"}
      height={"100vh"}
      p={"1rem"}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"transparent"}
    >
      <Spinner
        thickness="4px"
        speed="0.90s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};

export default Loading;
