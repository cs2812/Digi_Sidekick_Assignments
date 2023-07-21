import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const {isAuth} =useSelector((store)=>store.authReducer)
  const dispatch = useDispatch()

  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogout = () => {
    dispatch({type:"USER_LOGOUT_SUCCESS"})
  };

  return (
    <Flex
      width={"100vw"}
      bgColor={"#60c8ee"}
      p="0.5rem"
      justifyContent={"right"}
      position={"absolute"}
    >
      {isAuth ? (
        <Button onClick={handleLogout}>Log Out</Button>
      ) : (
        <Flex gap="10px">
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={handleSignUp}>Sign up</Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
