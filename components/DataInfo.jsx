"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  Input,
  Avatar,
  Flex,
  Box,
  useToast,
} from "@chakra-ui/react";
const project = {
  title: "AI 기반 음악 추천 시스템",
  description: "사용자의 취향을 학습하여 개인화된 음악을 추천하는 시스템 개발",
  skills: ["Python", "TensorFlow", "React"],
  deadline: "2024-10-15",
};
const ProjectDetailModal = ({ isOpen, onClose }) => {
  const [comment, setComment] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [likes, setLikes] = useState(0);
  const toast = useToast();

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "팔로우 취소" : "팔로우 완료",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleLike = () => {
    setLikes(likes + 1);
    toast({
      title: "좋아요!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleComment = () => {
    if (comment.trim()) {
      toast({
        title: "댓글이 등록되었습니다.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setComment("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{project?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={4}>
            <Text>{project?.description}</Text>
            <HStack>
              {project?.skills.map((skill, index) => (
                <Badge key={index} colorScheme="blue">
                  {skill}
                </Badge>
              ))}
            </HStack>
            <Text fontSize="sm" color="gray.500">
              마감일: {project?.deadline}
            </Text>

            <Divider />

            <Flex justify="space-between" align="center">
              <HStack>
                <Button
                  onClick={handleLike}
                  colorScheme="red"
                  variant="outline"
                >
                  좋아요 ({likes})
                </Button>
              </HStack>
            </Flex>

            <Divider />

            <VStack align="stretch" spacing={3}>
              <Text fontWeight="bold">댓글</Text>
              <HStack>
                <Avatar size="sm" name="User" />
                <Input
                  placeholder="댓글을 입력하세요..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button onClick={handleComment} colorScheme="blue">
                  등록
                </Button>
              </HStack>

              <Box maxH="200px" overflowY="auto">
                <VStack align="stretch" spacing={2}>
                  <Flex>
                    <Avatar size="sm" name="John Doe" mr={2} />
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        John Doe
                      </Text>
                      <Text fontSize="sm">
                        흥미로운 프로젝트네요! 참여하고 싶습니다.
                      </Text>
                    </Box>
                  </Flex>
                </VStack>
              </Box>
            </VStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            닫기
          </Button>
          <Button variant="ghost">프로젝트 지원하기</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectDetailModal;
