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
import Loading from "../Components/Loading";
import UserModal from "../Components/UserModal";
import { userDelete } from "../Store/users/action";
import { getFilter } from "../helper";

const Home = () => {
  const { usersData } = useSelector((store) => store.userReducer);
  const { loading, updateLoading, addLoading } = useSelector(
    (store) => store.authReducer
  );
  const [filterData, setFilterData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [sort, setSort] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [filterQuery, setfilterQuery] = useState("");
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("key");
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(userDelete(id));
  };
  const handleFilter = (e) => {
    if (e.target.value === "") {
      setFilterBy("");
      setfilterQuery("");
    } else {
      setFilterBy("city");
      setfilterQuery(e.target.value);
    }
  };
  const handleSort = (e) => {
    if (e.target.value === "") {
      setSortBy("")
      setSort("")
    } else {
      setSortBy("age")
      setSort(+e.target.value)
    }
  };

  function getUser() {
    dispatch({ type: "LOADING_TRUE", payload: "" });
    fetch(
      `http://localhost:8080/users?page=${page}&limit=5&sortBy=${sortBy}&sortOrder=${sort}&filterBy=${filterBy}&filterQuery=${filterQuery}&search=${search}`,
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
  }, [page, sort, search, filterQuery]);

  useEffect(() => {
    getFilter(setFilterData);
  }, []);
  return (
    <Box>
      <Box
        boxSizing="border-box"
        bgColor={"#f2f2f2"}
        p={"4rem 0rem 0rem 0rem"}
        height={"100vh"}
      >
        <Flex p="1rem" justifyContent={"center"} gap="20px">
          <Box w={"35%"}>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name"
              border={"solid #2db3e5"}
            />
          </Box>
          <Flex gap="10px">
            <Text margin={"auto"}>Sort</Text>
            <Select
              placeholder="Sort by age"
              size="md"
              border={"solid #2db3e5"}
              onChange={handleSort}
            >
              <option value="">ALL</option>
              <option value="1">Age Low to High</option>
              <option value="-1">Age High to Low</option>
            </Select>
          </Flex>
          <Flex gap="10px">
            <Text margin={"auto"}>Filter</Text>
            <Select
              placeholder="Filter by city"
              size="md"
              border={"solid #2db3e5"}
              onChange={handleFilter}
            >
              <option value="">ALL</option>
              {filterData.map((ele, i) => (
                <option key={i} value={ele}>
                  {ele}
                </option>
              ))}
            </Select>
          </Flex>
          {addLoading ? (
            <Button
              isLoading
              loadingText="Submitting"
              colorScheme="teal"
              variant="outline"
            >
              Submit
            </Button>
          ) : (
            <UserModal type={"add"} />
          )}
        </Flex>
        <Box
          overflowX={"hidden"}
          overflowY={"auto"}
          boxSizing="border-box"
          w="90%"
          h={"75%"}
          margin={"auto"}
        >
          {loading ? (
            <Loading />
          ) : (
            <TableContainer bg="whiteAlpha.800" shadow={"base"}>
              <Table variant="simple">
                <TableCaption mt="0%">Users Details</TableCaption>
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
                          {updateLoading ? (
                            ""
                          ) : (
                            <UserModal type={"update"} data={ele} />
                          )}
                        </Td>
                        <Td
                          border={"2px solid #f7f7f7"}
                          color={"blue"}
                          cursor={"pointer"}
                          textAlign={"center"}
                        >
                          <Button
                            size="sm"
                            onClick={() => handleDelete(ele._id)}
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
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
            isDisabled={page === totalPage || totalPage <= page}
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
