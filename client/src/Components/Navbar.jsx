import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const handleLogin=()=>{
    navigate("/login")
  }
  const handleSignUp=()=>{
    navigate("/signup")
  }
  const handleLogout=()=>{
    
  }

  return (
    <Flex border={"solid"} p="0.5rem" justifyContent={"right"}>
      <Button onClick={handleLogout}>Log Out</Button>
      <Flex gap="10px">
        <Button onClick={handleLogin}>Login</Button>
        <Button onClick={handleSignUp}>Sign up</Button>
      </Flex>
      
    </Flex>
  )
}

export default Navbar
