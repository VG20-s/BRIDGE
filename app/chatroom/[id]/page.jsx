"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Avatar,
  Flex,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useUserStore } from "@/store/initial";
import Botnav from "@/components/Bottomnav";
import Link from "next/link";

const initialMessages = [
  { id: 1, sender: "User1", content: "안녕하세요!", timestamp: "10:00" },
  { id: 2, sender: "User2", content: "네, 안녕하세요!", timestamp: "10:01" },
];

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const { user_Id, user_name } = useUserStore((state) => state);

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const message = {
        id: messages.length + 1,
        sender: user_name,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      <Box w="full" h="600px" overflow="hidden" boxShadow="md" flex={1}>
        <VStack h="full" spacing={0}>
          <Flex
            w="full"
            h="60px"
            gap={"10px"}
            bg={bgColor}
            p={4}
            borderBottomWidth="1px"
            borderColor={borderColor}
          >
            <Link href={"/chatroomList"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </Link>
            <Text fontSize="xl" fontWeight="bold">
              Chat Room #{roomId}
            </Text>
          </Flex>
          <VStack
            flex={1}
            w="full"
            overflowY="auto"
            p={4}
            spacing={4}
            alignItems="stretch"
            className="custom-scrollbar"
          >
            {messages.map((message) => (
              <Flex
                key={message.id}
                justify={
                  message.sender === user_name ? "flex-end" : "flex-start"
                }
              >
                <HStack
                  maxW="70%"
                  bg={message.sender === user_name ? "blue.100" : "gray.100"}
                  p={2}
                  borderRadius="lg"
                  spacing={2}
                >
                  {message.sender !== user_name && (
                    <Avatar size="sm" name={message.sender} />
                  )}
                  <VStack align={"flex-start"} spacing={0}>
                    <Text fontSize="xs" color="gray.500">
                      {message.sender}
                    </Text>
                    <Text>{message.content}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {message.timestamp}
                    </Text>
                  </VStack>
                </HStack>
              </Flex>
            ))}
            <div ref={messagesEndRef} />
          </VStack>
          <Divider />
          <HStack w="full" p={4} spacing={2} bg={bgColor}>
            <Input
              flex={1}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <Button
              color={"black"}
              colorScheme="blue"
              onClick={handleSendMessage}
            >
              전송
            </Button>
          </HStack>
        </VStack>
      </Box>
      <Botnav />
    </div>
  );
};

export default ChatRoom;
