import React from "react";
import { Box } from "@chakra-ui/react";
const Header = () => {
  return (
    <Box
      bg="white"
      w="100%"
      h={"5%"}
      alignItems={"center"}
      color={"black"}
      display={"flex"}
      justifyContent={"space-between"}
      padding={'0 15px'}
    >
      <div>DevConnect</div>
      <h1>로그아웃</h1>
      {/* <Avatar /> */}
    </Box>
  );
};

export default Header;
