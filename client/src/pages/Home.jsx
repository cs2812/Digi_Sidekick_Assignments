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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_GET } from "../Store/users/type";

const Home = () => {
  const { usersData } = useSelector((store) => store.userReducer);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [sort, setSort] = useState(1);
  const [filterBy, setFilterBy] = useState("");
  const [filterQuery, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("key");
  const dispatch = useDispatch();
  // console.log(usersData)

  function getUser() {
    dispatch({ type: "LOADING_TRUE", payload: "" });
    fetch(
      `http://localhost:8080/users?page=${page}&limit=5&sortBy=age&sortOrder=${sort}&filterBy=${filterBy}&filterQuery=${filterQuery}&search=${search}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // notice the Bearer before your token
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setTotalPage(res.totalPages);
        dispatch({ type: USER_GET, payload: res });
        dispatch({ type: "LOADING_FALSE", payload: "" });
      })
      .catch((error) => {
        dispatch({ type: "LOADING_FALSE", payload: "" });
        alert("internal server issue, Try letter");
        console.log(error);
      });
  }
  useEffect(() => {
    getUser();
  }, [page, sort]);
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
                {usersData &&
                  usersData.map((ele) => (
                    <Tr key={ele._id}>
                      <Td>{ele.username}</Td>
                      <Td border={"2px solid #f7f7f7"}>{ele.age}</Td>
                      <Td border={"2px solid #f7f7f7"}>{`${ele.married}`}</Td>
                      <Td border={"2px solid #f7f7f7"}>{ele.city}</Td>
                      <Td border={"2px solid #f7f7f7"}>{ele.state}</Td>
                      <Td
                        border={"2px solid #f7f7f7"}
                        color={"blue"}
                        cursor={"pointer"}
                        textAlign={"center"}
                      >
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
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Flex mt="10px" justifyContent={"center"} gap="10px">
          <Button
            isDisabled={page === 1}
            onClick={() => setPage(page - 1)}
            colorScheme="teal"
          >
            Previous
          </Button>
          <Text mt="6px">
            Page: {page}/{totalPage}
          </Text>
          <Button
            isDisabled={page === totalPage}
            onClick={() => setPage(page + 1)}
            colorScheme="teal"
          >
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
