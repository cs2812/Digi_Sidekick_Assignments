import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <Flex
      p={"1rem"}
      w="100vw"
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"transparent"}
    >
      <Text fontSize={"xl"}>Loading...</Text>
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
