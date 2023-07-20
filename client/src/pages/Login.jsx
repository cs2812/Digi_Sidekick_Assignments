import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Loading from "../Components/Loading";

const Login = () => {
  const isLoading = true;
  const [error, setError] = useState({
    NoEmail: false,
    NoPassword: false,
  });
  const [show, setShow] = React.useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    setError({
      NoEmail: form.email === "",
      NoPassword: form.password === "",
    });
    // dispatch(userlogin(form))
    // nevigate("/")
    console.log(form);
    // setForm({
    //   email: "",
    //   password: "",
    // });
  };
  return (
    <Box>
      {isLoading ? (
        <Loading />
      ) : (
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
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShow(!show)}
                    >
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
                <Button
                  type="submit"
                  colorScheme={"facebook"}
                  onClick={handleLogin}
                >
                  LOG IN
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Login;
