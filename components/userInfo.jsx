import React from "react";
import {
  Box,
  Avatar,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useUserStore } from "@/store/initial";

export const UserBadge = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user_Id } = useUserStore((state) => state);
  return (
    <>
      <Box
        onClick={onOpen}
        cursor="pointer"
        borderRadius="lg"
        p={2}
        display="inline-flex"
        alignItems="center"
      >
        <Avatar size="sm" name={data.username} mr={2} />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>사용자 정보</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing={4}>
              <HStack>
                <Avatar size="xl" name={data.username} />
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold">
                    {data.username}
                  </Text>
                  <Text color="gray.600">{data.user.email}</Text>
                </VStack>
              </HStack>
              {user_Id != data.userId && (
                <Button
                  colorScheme="blue"
                  color={"black"}
                  onClick={() => {
                    console.log("메시지 보내기 클릭");
                  }}
                >
                  메시지 보내기
                </Button>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
