import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const authBaseURL = "http://localhost:8080/auth";
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.authReducer);
  const nevigate = useNavigate();
  const [error, setError] = useState({
    NoEmployee_name: false,
    NoEmail: false,
    NoPassword: false,
  });
  const [form, setForm] = useState({
    employee_name: "",
    email: "",
    password: "",
  });

  // password Validation
  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let res = passwordRegex.test(password);
    if (!res) {
      setError({ ...error, NoPassword: true });
    }
    return res;
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    setError({
      NoEmployee_name: form.employee_name === "",
      NoEmail: form.email === "",
      NoPassword: form.password === "",
    });

    if (
      form.employee_name &&
      form.email &&
      form.password &&
      isValidPassword(form.password)
    ) {
      dispatch({ type: "LOADING_TRUE", payload: "" });
      axios
        .post(`${authBaseURL}/signup`, form)
        .then((res) => {
          dispatch({ type: "LOADING_FALSE", payload: "" });
          alert("Register Successfully");
          nevigate("/login");
        })
        .catch((error) => {
          dispatch({ type: "LOADING_FALSE", payload: "" });
          alert("server error. Try after some time");
          console.log(error);
        });
    }
  };

  return (
    <Box
      h="100vh"
      bgColor={"#f2f2f2"}
      display={"Flex"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Text fontSize={"2rem"}>Sign Up</Text>
      <Box marginTop={"10px"}>
        <Box
          w={["90vw", "60vw", "35vw"]}
          borderRadius="10px"
          margin="auto"
          p="1rem"
          backgroundColor={"white"}
          boxShadow="base"
        >
          <form action="" onSubmit={handleSignUp}>
            <FormControl isInvalid={error.NoEmployee_name}>
              <FormLabel>username</FormLabel>
              <Input
                type="text"
                placeholder="Enter username"
                value={form.employee_name}
                onChange={(e) =>
                  setForm({ ...form, employee_name: e.target.value })
                }
              />
              {error.NoEmail ? (
                <FormErrorMessage>Username is required.</FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl isInvalid={error.NoEmail}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {error.NoEmail ? (
                <FormErrorMessage>
                  Email should be present and valide.
                </FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl isInvalid={error.NoPassword}>
              <FormLabel mt="15px">Password</FormLabel>
              <Input
                pr="4.5rem"
                placeholder="Enter password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                value={form.password}
              />
              {error.NoPassword ? (
                <FormErrorMessage textAlign={"left"}>
                  Invalid password. Password should be at least 8 characters
                  long and contain at least one uppercase letter, one lowercase
                  letter, one digit, and one special character.
                </FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
            <Box mt="20px" display={"flex"} justifyContent={"right"}>
              {loading ? (
                <Button
                  isLoading
                  loadingText="Submitting"
                  colorScheme="teal"
                  variant="outline"
                >
                  Submit
                </Button>
              ) : (
                <Button type="submit" colorScheme={"facebook"}>
                  SIGN UP
                </Button>
              )}
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
