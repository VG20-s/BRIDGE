import React from "react";
import LikeButton from "@/components/LikeButton";
import Commnets from "@/components/commnets";
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
  Flex,
} from "@chakra-ui/react";
const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{project?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={4}>
            <Text>{project?.contents}</Text>
            <HStack>
              {project?.tags.map((skill, index) => (
                <Badge key={skill} colorScheme="blue">
                  {skill}
                </Badge>
              ))}
            </HStack>
            <Text fontSize="sm" color="gray.500">
              마감일: {project?.dueDate ? project?.dueDate : "마감기한 없음"}
            </Text>
            <Divider />
            <Flex justify="space-between" align="center">
              <HStack>
                <LikeButton project_id={project?.id}></LikeButton>
              </HStack>
            </Flex>
            <Divider />
            <Commnets postId={project?.id}/>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button color={"ghost"} colorScheme="blue" mr={3} onClick={onClose}>
            닫기
          </Button>
          <Button variant="ghost">프로젝트 지원하기</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectDetailModal;
