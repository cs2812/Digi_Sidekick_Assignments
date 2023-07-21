import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userPost, userUpdate } from "../Store/users/action";

const UserModal = ({ type, data }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [form, setForm] = useState({
    username: type === "add" ? "" : data?.username,
    email: type === "add" ? "" : data?.email,
    age: type === "add" ? 21 : data?.age,
    gender: type === "add" ? "" : data?.gender,
    city: type === "add" ? "" : data?.city,
    state: type === "add" ? "" : data?.state,
    married: type === "add" ? false : data?.married,
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    dispatch(userPost(form));
  };
  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatch(userUpdate({ ...form, _id: data?._id }));
    onClose();
  };

  return (
    <>
      <Button
        colorScheme={type === "add" ? "teal" : "gray"}
        size={type === "add" ? "md" : "sm"}
        onClick={onOpen}
      >
        {type === "add" ? "Add user" : "Update"}
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {type === "add" ? "Add User" : "Update User"}
          </ModalHeader>
          <ModalCloseButton />
          <form
            action=""
            onSubmit={(e) =>
              type === "add" ? handleAddUser(e) : handleUpdateUser(e)
            }
          >
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  required
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  size="sm"
                  ref={initialRef}
                  placeholder="Enter Name"
                />
              </FormControl>

              <FormControl mt={1}>
                <FormLabel>Email</FormLabel>
                <Input
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  size="sm"
                  type="email"
                  placeholder="Enter Email"
                />
              </FormControl>
              <FormControl display={"flex"} gap="20px" mt={1}>
                <Box>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    value={form.gender}
                    required
                    onChange={(e) =>
                      setForm({ ...form, gender: e.target.value })
                    }
                    placeholder="Select option"
                    size="sm"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                </Box>
                <Box w={"30%"}>
                  <FormLabel>Age</FormLabel>
                  <NumberInput
                    required
                    defaultValue={form.age}
                    min={20}
                    onChange={(num) => {
                      console.log(num);
                      setForm({ ...form, age: +num });
                    }}
                    size={"sm"}
                    type="number"
                    placeholder="Enter Age"
                  >
                    <NumberInputField />
                  </NumberInput>
                </Box>

                <Box>
                  <Checkbox
                    defaultChecked={form.married}
                    mt="30px"
                    size="lg"
                    placeholder="Enter City"
                    onChange={(e) =>
                      setForm({ ...form, married: e.target.checked })
                    }
                  >
                    Married
                  </Checkbox>
                </Box>
              </FormControl>
              <FormControl display={"flex"} gap="20px">
                <Box>
                  <FormLabel>State</FormLabel>
                  <Input
                    required
                    size={"sm"}
                    placeholder="Enter State"
                    value={form.state}
                    onChange={(e) =>
                      setForm({ ...form, state: e.target.value })
                    }
                  />
                </Box>
                <Box>
                  <FormLabel>City</FormLabel>
                  <Input
                    required
                    size={"sm"}
                    placeholder="Enter City"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </Box>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                {type === "add" ? "Add" : "Update"}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserModal;
