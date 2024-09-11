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
import { getrooms, createRooms } from "@/api/useRooms";
import { useRouter } from "next/navigation";
export const UserBadge = ({ data }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user_Id } = useUserStore((state) => state);
  const Message = async () => {
    console.log(user_Id, data.userId);
    const a = await getrooms([user_Id, data.userId]);
    if (a.data.length > 0) {
      router.push(`chatroom/${a.data[0].id}`);
    } else {
      const b = await createRooms([user_Id, data.userId]);
      router.push(`chatroom/${b[0].id}`);
    }
  };
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
                  onClick={() => Message()}
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
