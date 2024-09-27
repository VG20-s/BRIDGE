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
import { usePathname } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
const ChatRoom = () => {
  const chatRoomId = usePathname().split("/")[2];
  const [messages, setMessages] = useState([]);
  const newMessage = useRef(); //불필요한 리랜더링 발생으로 ref로 변경
  const [isSending, setisSending] = useState(false);
  const messagesEndRef = useRef(null);
  const { user_Id, user_name } = useUserStore((state) => state);

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  useEffect(() => {
    if (!chatRoomId) return;
    console.log(chatRoomId);
    // Fetch initial messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("chat")
        .select("*")
        .eq("roomId", chatRoomId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        console.log(data);
        setMessages(data);
      }
    };

    fetchMessages();
    const channel = supabase
      .channel(`public:chat:roomId=eq.${chatRoomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat",
          filter: `roomId=eq.${chatRoomId}`,
        },
        (payload) => {
          console.log(payload);
          const newMessage = payload.new;
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatRoomId]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Send message function
  const handleSendMessage = async () => {
    if (!newMessage.current.value.trim() || isSending) return;
    setisSending(true);
    const { error } = await supabase.from("chat").insert([
      {
        roomId: chatRoomId,
        content: newMessage.current.value,
        userId: user_Id, // Include sender name
        userName: user_name, // Include sender name
        read: false,
      },
    ]);

    if (error) {
      console.error("Failed to send message:", error);
      setisSending(false);
    } else {
      newMessage.current.value = "";
      setisSending(false);
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
                justify={message.userId === user_Id ? "flex-end" : "flex-start"}
              >
                <HStack
                  maxW="70%"
                  bg={message.userId === user_Id ? "blue.100" : "gray.100"}
                  p={2}
                  borderRadius="lg"
                  spacing={2}
                >
                  {message.userId === user_Id && (
                    <Avatar size="sm" name={message.sender} />
                  )}
                  <VStack align={"flex-start"} spacing={0}>
                    <Text fontSize="xs" color="gray.500">
                      {message.userName}
                    </Text>
                    <Text>{message.content}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {new Date(message.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
              ref={newMessage}
              placeholder="메시지를 입력하세요..."
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <Button
              color={"black"}
              colorScheme="blue"
              onClick={handleSendMessage}
              disabled={!isSending}
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
