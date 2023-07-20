import {
  Box,
  Flex,
  Input,
  Select,
  Text,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
} from "@chakra-ui/react";
import React from "react";

const Home = () => {
  return (
    <Box>
      <Box
        boxSizing="border-box"
        bgColor={"#f2f2f2"}
        p={"4rem 0rem 0rem 0rem"}
        height={"100vh"}
      >
        <Flex p="1rem" justifyContent={"center"} gap="20px">
          <Box w={"40%"}>
            <Input placeholder="Search" border={"solid #2db3e5"} />
          </Box>
          <Flex gap="10px">
            <Text margin={"auto"}>Sort</Text>
            <Select
              placeholder="Select option"
              size="md"
              border={"solid #2db3e5"}
            >
              <option value="1">Age Low to High</option>
              <option value="-1">Age High to Low</option>
            </Select>
          </Flex>
          <Flex gap="10px">
            <Text margin={"auto"}>Filter</Text>
            <Select
              placeholder="Select option"
              size="md"
              border={"solid #2db3e5"}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Flex>
        </Flex>
        <Box>
          <TableContainer bg="whiteAlpha.800" shadow={"base"}>
            <Table variant="simple">
              <TableCaption>Users Details</TableCaption>
              <Thead>
                <Tr textAlign={"center"}>
                  <Th>Name</Th>
                  <Th border={"2px solid #f7f7f7"}>Age</Th>
                  <Th>marital status</Th>
                  <Th border={"2px solid #f7f7f7"}>City</Th>
                  <Th>State</Th>
                  <Th textAlign={"center"} border={"2px solid #f7f7f7"}>
                    Update
                  </Th>
                  <Th textAlign={"center"}>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{"name"}</Td>
                  <Td border={"2px solid #f7f7f7"}>{"24"}</Td>
                  <Td border={"2px solid #f7f7f7"}>{"false"}</Td>
                  <Td border={"2px solid #f7f7f7"}>{"jaipur"}</Td>
                  <Td border={"2px solid #f7f7f7"}>{"Rajasthan"}</Td>
                  <Td
                    border={"2px solid #f7f7f7"}
                    color={"blue"}
                    cursor={"pointer"}
                    textAlign={"center"}
                  >
                    {/* <SingleReqModal data={ele} /> */}
                    {"update"}
                  </Td>
                  <Td
                    border={"2px solid #f7f7f7"}
                    color={"blue"}
                    cursor={"pointer"}
                    textAlign={"center"}
                  >
                    {/* <SingleReqModal data={ele} /> */}
                    {"delete"}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Flex mt="10px" justifyContent={"center"} gap="10px">
          <Button colorScheme="teal">Previous</Button>
          <Text mt="6px">Page: {1}</Text>
          <Button colorScheme="teal">Next</Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
