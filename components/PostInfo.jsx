import React, { useEffect, useState } from "react";
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
  Input,
  Textarea,
  Box,
} from "@chakra-ui/react";
import { useUserStore } from "@/store/initial";
import TechSearchInterface from "@/components/TecListselect";

const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedProject, setEditedProject] = useState({ ...project });
  const [isTagSelectionOpen, setIsTagSelectionOpen] = useState(false);
  const { user_Id } = useUserStore((state) => state);

  useEffect(() => {
    setEditedProject({ ...project });
    setIsEdit(false);
    setIsTagSelectionOpen(false);
  }, [project]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    function getDifferences(ori, edited) {
      const differences = {};
      for (const key in ori) {
        if (ori.hasOwnProperty(key)) {
          if (ori[key] !== edited[key]) {
            differences[key] = edited[key];
          }
        }
      }
      return differences;
    }
    const differences = getDifferences(project, editedProject);
    console.log(differences);

    setIsEdit(false);
    setIsTagSelectionOpen(false);
  };

  const handleCancel = () => {
    setEditedProject({ ...project });
    setIsEdit(false);
    setIsTagSelectionOpen(false);
  };

  const handleTagSelection = (newTags) => {
    setEditedProject((prev) => ({ ...prev, tags: newTags }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mt={"30PX"}>
          {isEdit ? (
            <Input
              name="title"
              value={editedProject.title}
              onChange={handleInputChange}
            />
          ) : (
            project?.title
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={4}>
            {isEdit ? (
              <Textarea
                name="contents"
                value={editedProject?.contents}
                onChange={handleInputChange}
              />
            ) : (
              <Text>{project?.contents}</Text>
            )}
            <Box>
              <Flex wrap="wrap" mb={2} gap="4px">
                {(isEdit ? editedProject?.tags : project?.tags)?.map(
                  (skill) => (
                    <Badge key={skill} colorScheme="blue">
                      {skill}
                    </Badge>
                  )
                )}
              </Flex>
              {isEdit && (
                <Button
                  size="sm"
                  onClick={() => setIsTagSelectionOpen(!isTagSelectionOpen)}
                >
                  {isTagSelectionOpen ? "수정완료" : "태그수정"}
                </Button>
              )}
              {isTagSelectionOpen && (
                <Box mt={2}>
                  <TechSearchInterface
                    selectedTechs={editedProject?.tags}
                    setSelectedTechs={handleTagSelection}
                  />
                </Box>
              )}
            </Box>
            {isEdit ? (
              <Input
                name="dueDate"
                value={editedProject.dueDate || ""}
                onChange={handleInputChange}
                type="date"
                width="80%"
              />
            ) : (
              <Text fontSize="sm" color="gray.500">
                마감일: {project?.dueDate ? project?.dueDate : "마감기한 없음"}
              </Text>
            )}
            <Divider />
            <Flex justify="space-between" align="center">
              <LikeButton project_id={project?.id} />
              {user_Id != project?.createrId ? (
                <Button variant="ghost">프로젝트 지원하기</Button>
              ) : isEdit ? (
                <HStack>
                  <Button onClick={handleSave} variant={"outline"}>
                    저장
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    취소
                  </Button>
                </HStack>
              ) : (
                <Button variant="ghost" onClick={() => setIsEdit(true)}>
                  수정
                </Button>
              )}
            </Flex>
            <Divider />
            <Commnets postId={project?.id} postOwner={project?.createrId} />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectDetailModal;
