// import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { colorObj } from "../utils/theme";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { NextPage } from "next";

const MyButton = styled(Button)`
  background-color: ${colorObj.primary}};
  color: white;
`;

const ExampleUI: NextPage = () => {
  return (
    <>
      <div className="min-h-full flex items-center justify-center ">
        <div className="p-8 text-center">
          {/* <Text fontSize="6xl">Create Loan Request</Text>
          <Text fontSize="lg">You must sign up before you can create a loan request.</Text>

          <Button variant={"solid"} bg={"black"} color={"white"} rounded={"3xl"} size={"lg"}>
            Sign Up
          </Button>

          <Flex justifyContent="center">
            <Box boxSize="sm">
              <Image src="lock.png" alt="Dan Abramov" />
            </Box>
          </Flex> */}

          <h1>Hello Third!</h1>

          <MyButton color="primary" variant="contained">
            Hello World
          </MyButton>
        </div>
      </div>
    </>
  );
};

export default ExampleUI;
