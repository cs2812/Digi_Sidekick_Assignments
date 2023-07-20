import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Signup = () => {
  const [error, setError] = useState({
    NoUsername: false,
    NoEmail: false,
    NoPassword: false,
  });
  const [form, setForm] = useState({
    username: "",
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
    e.preventDefault()
    setError({
      NoUsername: form.username === "",
      NoEmail: form.email === "",
      NoPassword: form.password === "",
    });
    if(form.username && form.email && form.password && isValidPassword(form.password) ){
      console.log(form, isValidPassword(form.password));
    }
    // dispatch(userlogin(form))
    // nevigate("/")
    // setForm({
    //   email: "",
    //   password: "",
    // });
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
          // textAlign={"left"}
          w={["90vw", "60vw", "35vw"]}
          borderRadius="10px"
          margin="auto"
          p="1rem"
          backgroundColor={"white"}
          boxShadow="base"
        >
          <form action="" onSubmit={handleSignUp}>
            <FormControl isInvalid={error.NoUsername}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
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
                  Invalid password. Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.
                </FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
            <Box mt="20px" display={"flex"} justifyContent={"right"}>
              <Button
                type="submit"
                colorScheme={"facebook"}
              >
                SIGN UP
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
