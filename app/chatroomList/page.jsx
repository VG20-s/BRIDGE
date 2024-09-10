"use client";
import React, { useState } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useUserStore } from "@/store/initial";
import Botnav from "@/components/Bottomnav";
import Header from "@/components/Header";

const initialChatRooms = [
  {
    id: 1,
    name: "프로젝트 A 팀",
    lastMessage: "회의 시간 조정했습니다.",
    unreadCount: 3,
    timestamp: "14:30",
  },
  {
    id: 2,
    name: "마케팅 부서",
    lastMessage: "새 캠페인 아이디어 있으신가요?",
    unreadCount: 0,
    timestamp: "어제",
  },
  {
    id: 3,
    name: "점심 메이트",
    lastMessage: "오늘 점심 뭐 먹을까요?",
    unreadCount: 5,
    timestamp: "09:15",
  },
];

const ChatRoomListPage = () => {
  const [chatRooms, setChatRooms] = useState(initialChatRooms);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user_Id } = useUserStore((state) => state);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");


  const filteredChatRooms = chatRooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    onOpen();
  };

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
              {filteredChatRooms.map((room) => (
                <Flex
                  key={room.id}
                  p={4}
                  _hover={{ bg: "gray.100" }}
                  cursor="pointer"
                  onClick={() => handleRoomSelect(room)}
                >
                  <Avatar size="md" name={room.name} mr={3} />
                  <Box flex={1}>
                    <Flex justify="space-between" align="baseline">
                      <Text fontWeight="bold">{room.name}</Text>
                      <Text fontSize="xs" color="gray.500">
                        {room.timestamp}
                      </Text>
                    </Flex>
                    <Text fontSize="sm" color="gray.500" noOfLines={1}>
                      {room.lastMessage}
                    </Text>
                  </Box>
                  {room.unreadCount > 0 && (
                    <Badge colorScheme="red" borderRadius="full" ml={2}>
                      {room.unreadCount}
                    </Badge>
                  )}
                </Flex>
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
