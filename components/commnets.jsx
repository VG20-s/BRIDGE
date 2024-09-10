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
import { postCommnets, deleteComments, editComments } from "@/api/getcomments";
import { UserBadge } from "@/components/userInfo";
import { useComments } from "@/api/useComments";
import { useUserStore } from "@/store/initial";
import AlertDelete from "./alertDelete";
import { mutate } from "swr";
const Commnets = ({ postId, postOwner }) => {
  const { user_name, user_Id } = useUserStore((state) => state);
  const comments = useRef();
  const cancelRef = useRef();
  const editinput = useRef();
  const delTarget = useRef();
  const [isopen, setisopen] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [issending, setissending] = useState(false);
  const [targetData, settargetData] = useState(false);
  const { data, isLoading } = useComments(postId);
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
    comments.current.value = "";
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
  const editData = async (id) => {
    if (issending) return;
    if (targetData == editinput.current.value) return;
    setissending(true);
    await editComments({ id, data: { comment: editinput.current.value } });
    setissending(false);
    toast({
      title: "댓글 수정완료",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setisEdit(false);
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
                    <UserBadge data={a}>
                    </UserBadge>
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        {a.username}
                      </Text>
                      {isEdit == a.id ? (
                        <Flex>
                          <Input
                            ref={editinput}
                            fontSize="sm"
                            w={"300px"}
                            defaultValue={a.comment}
                          ></Input>
                          <Button onClick={() => editData(a.id)}>수정</Button>
                        </Flex>
                      ) : (
                        <Text fontSize="sm">{a.comment}</Text>
                      )}
                    </Box>
                  </Flex>
                  <Flex alignItems={"center"}>
                    {a.userId == user_Id && (
                      <Button
                        onClick={() => {
                          setisEdit((prevstate) => (prevstate ? false : a.id));
                          settargetData(a.comment);
                        }}
                      >
                        {isEdit == a.id ? "취소" : "수정"}
                      </Button>
                    )}
                    {(a.userId == user_Id || postOwner == user_Id) && (
                      <Box
                        onClick={() => {
                          setisopen(true);
                          delTarget.current = a.id;
                        }}
                        cursor={"pointer"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </Box>
                    )}
                  </Flex>
                </Flex>
              </VStack>
            </Box>
          );
        })
      )}
      <AlertDelete
        ref={cancelRef}
        delCom={delCom}
        id={delTarget.current}
        isopen={isopen}
        setisopen={setisopen}
      ></AlertDelete>
    </VStack>
  );
};

export default Commnets;
