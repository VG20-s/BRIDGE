"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  Flex,
  Divider,
  useColorModeValue,
  Input,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useUserStore } from "@/store/initial";
import Botnav from "@/components/Bottomnav";
import Header from "@/components/Header";
import { useGetrooms } from "@/api/useROOmms";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";
const TimeCal = (timeM) => {
  const messageTime = new Date(timeM);
  const currentTime = new Date();
  const timeDifference = Math.floor((currentTime - messageTime) / 1000 / 60);
  const timeLabel = timeDifference <= 1 ? "방금" : `${timeDifference}분 전`;

  return timeLabel;
};
const ChatRoomListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user_Id } = useUserStore((state) => state);
  const { data } = useGetrooms();
  console.log(data);
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  useEffect(() => {
    const channel = supabase
      .channel(`public:rooms:participants=cs.{${user_Id}}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "rooms",
          filter: `participants=cs.{${user_Id}}`,
        },
        (payload) => {
          console.log(payload);
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status); // 구독 상태 확인
      });
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user_Id]);
  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      <Flex flex={1}>
        <Box
          w="600px"
          borderRightWidth="1px"
          borderColor={borderColor}
          bg={bgColor}
          h={"he"}
        >
          <VStack h="full" spacing={0}>
            <Box p={4} w="full">
              <HStack>
                <Input
                  placeholder="채팅방 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconButton aria-label="Search" icon={<SearchIcon />} />
              </HStack>
            </Box>
            <Divider />
            <VStack
              flex={1}
              w="full"
              overflowY="auto"
              spacing={0}
              divider={<Divider />}
              align="stretch"
            >
              {data?.data?.map((room) => (
                <Link href={`chatroom/${room.id}`}>
                  <Flex
                    key={room.id}
                    p={4}
                    _hover={{ bg: "gray.100" }}
                    cursor="pointer"
                  >
                    <Avatar size="md" name={room.id + "  "} mr={3} />
                    <Box flex={1}>
                      <Flex justify="space-between" align="baseline">
                        <Text fontWeight="bold">{room.id}</Text>
                        <Text fontSize="xs" color="gray.500">
                          {TimeCal(room.lasttime)}
                        </Text>
                      </Flex>
                      <Text fontSize="sm" color="gray.500" noOfLines={1}>
                        {room.lastmsg}
                      </Text>
                    </Box>
                    {room.unreadCount > 0 && (
                      <Badge colorScheme="red" borderRadius="full" ml={2}>
                        {room.id}
                      </Badge>
                    )}
                  </Flex>
                </Link>
              ))}
            </VStack>
          </VStack>
        </Box>
      </Flex>
      <Botnav></Botnav>
    </div>
  );
};

export default ChatRoomListPage;
