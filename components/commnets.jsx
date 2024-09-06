"use client";
import React, { useRef, useState } from "react";
import {
  Button,
  Text,
  VStack,
  HStack,
  Input,
  Avatar,
  Flex,
  Box,
  useToast,
  Skeleton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { postCommnets, deleteComments } from "@/api/getcomments";
import { useComments } from "@/api/useComments";
import { useUserStore } from "@/store/initial";
import { mutate } from "swr";
const Commnets = ({ postId }) => {
  const { user_name, user_Id } = useUserStore((state) => state);
  const comments = useRef();
  const cancelRef = useRef();
  const [issending, setissending] = useState(false);
  const { data, isLoading } = useComments(postId);
  const [isopen, setisopen] = useState(false);
  const toast = useToast();
  const Postcom = async () => {
    if (issending) return;
    setissending(true);
    await postCommnets({
      contents: comments.current.value,
      userId: user_Id,
      username: user_name,
      postId: postId,
    });
    setissending(false);
    toast({
      title: "댓글 작성완료",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    mutate(["Comments", postId]);
  };
  const delCom = async (id) => {
    if (issending) return;
    setissending(true);
    await deleteComments({ id, user_Id });
    setissending(false);
    toast({
      title: "댓글 삭제완료",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    mutate(["Comments", postId]);
  };
  return (
    <VStack align="stretch" spacing={3}>
      <Text fontWeight="bold">댓글</Text>
      <HStack>
        <Avatar size="sm" name={user_name} />
        <Input ref={comments} placeholder="댓글을 입력하세요..." />
        <Button onClick={() => Postcom()} color={"ghost"} colorScheme="blue">
          등록
        </Button>
      </HStack>

      {isLoading ? (
        <>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} height="40px" mb="4">
              <Box h="100%"></Box>
            </Skeleton>
          ))}
        </>
      ) : (
        data?.data.map((a, b) => {
          return (
            <Box key={a.id} maxH="200px" overflowY="auto">
              <VStack align="stretch" spacing={2}>
                <Flex justifyContent={"space-between"} pr={"10px"}>
                  <Flex>
                    <Avatar size="sm" name={a.username  } mr={2} />
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        {a.username}
                      </Text>
                      <Text fontSize="sm">{a.comment}</Text>
                    </Box>
                  </Flex>
                  {a.userId == user_Id && (
                    <Box onClick={() => setisopen(true)} cursor={"pointer"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </Box>
                  )}
                  <AlertDialog
                    motionPreset="slideInBottom"
                    leastDestructiveRef={cancelRef}
                    onClose={() => setisopen(true)}
                    isOpen={isopen}
                    isCentered
                  >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                      <AlertDialogHeader>댓글 삭제</AlertDialogHeader>
                      <AlertDialogCloseButton />
                      <AlertDialogBody>
                        진짜 댓글을 삭제하시겠습니까?
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button
                          ref={cancelRef}
                          onClick={() => setisopen(false)}
                        >
                          No
                        </Button>
                        <Button
                          color="red"
                          onClick={() => {
                            delCom(a.id);
                            setisopen(false);
                          }}
                          ml={3}
                        >
                          Yes
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </Flex>
              </VStack>
            </Box>
          );
        })
      )}
    </VStack>
  );
};

export default Commnets;
