import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const authBaseURL = "http://localhost:8080/auth";
  const { loading } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const nevigate = useNavigate();

  const [error, setError] = useState({
    NoEmail: false,
    NoPassword: false,
  });
  const [show, setShow] = React.useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault()
    setError({
      NoEmail: form.email === "",
      NoPassword: form.password === "",
    });
    if(form.email && form.password){
      dispatch({ type: "LOADING_TRUE", payload: "" });
      axios
        .post(`${authBaseURL}/login`,form)
        .then((res) => {
            localStorage.setItem("key", res.data.accessToken);
          dispatch({ type: "USER_LOGIN_SUCCESS", payload: "" });
          dispatch({ type: "LOADING_FALSE", payload: "" });
          alert("Login Successfully");
          nevigate("/");
        })
        .catch((error) => {
          dispatch({ type: "LOADING_FALSE", payload: "" });
          alert("Please check your email and password");
          console.log(error);
        });
    }
  };
  return (
    <Box>
      <Box
        h="100vh"
        bgColor={"#f2f2f2"}
        display={"Flex"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Text fontSize={"2rem"}>Log In</Text>
        <Box marginTop={"10px"}>
          <Box
            // textAlign={"left"}
            w={["90vw", "60vw", "35vw"]}
            borderRadius="10px"
            margin="auto"
            p="1rem"
            backgroundColor={"white"}
            boxShadow="base"
          >
            <form onSubmit={handleLogin}>
            <FormControl isInvalid={error.NoEmail}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {error.NoEmail ? (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl isInvalid={error.NoPassword}>
              <FormLabel mt="15px">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  value={form.password}
                />

                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {error.NoPassword ? (
                <FormErrorMessage>Password is required.</FormErrorMessage>
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
                <Button
                  type="submit"
                  colorScheme={"facebook"}
                >
                  LOG IN
                </Button>
              )}
            </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
