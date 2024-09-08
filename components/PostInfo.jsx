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
} from "@chakra-ui/react";
import { useUserStore } from "@/store/initial";
import TechSearchInterface from "@/components/TecListselect";
const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  const [isEdit, setisEdit] = useState(false);
  const [isOpenstack, setisOpenstack] = useState(false);
  const [selectedTechs, setselectedTechs] = useState([]);
  const { user_Id } = useUserStore((state) => state);
  useEffect(() => {
    setselectedTechs(project?.tags);
  }, [project]);
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" zIndex={10}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{project?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing={4}>
              {isEdit ? (
                <Input defaultValue={project?.contents}></Input>
              ) : (
                <Text>{project?.contents}</Text>
              )}
              <HStack>
                {isEdit ? (
                  <HStack onClick={() => setisOpenstack(true)} h={"120px"}>
                    {selectedTechs?.map((skill, index) => (
                      <Badge key={skill} colorScheme="blue">
                        {skill}
                      </Badge>
                    ))}
                  </HStack>
                ) : (
                  <HStack>
                    {project?.tags.map((skill, index) => (
                      <Badge key={skill} colorScheme="blue">
                        {skill}
                      </Badge>
                    ))}
                  </HStack>
                )}
              </HStack>
              {isEdit ? (
                <Input
                  defaultValue={project?.dueDate}
                  name="endDate"
                  width={"80%"}
                  type="date"
                  required
                />
              ) : (
                <Text fontSize="sm" color="gray.500">
                  마감일:{" "}
                  {project?.dueDate ? project?.dueDate : "마감기한 없음"}
                </Text>
              )}
              <Divider />
              <Flex justify="space-between" align="center">
                <LikeButton project_id={project?.id}></LikeButton>
                {user_Id == project?.userId ? (
                  <Button variant="ghost">프로젝트 지원하기</Button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => setisEdit((state) => !state)}
                  >
                    {" "}
                    수정
                  </Button>
                )}
              </Flex>
              <Divider />
              <Commnets postId={project?.id} postOwner={project?.createrId} />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button color={"ghost"} colorScheme="blue" mr={3} onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {isOpenstack && (
        <div
          onClick={() => setisOpenstack(false)}
          className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-800 bg-opacity-50"
          style={{ zIndex: 2000 }}
        >
          <TechSearchInterface
            selectedTechs={selectedTechs}
            setSelectedTechs={setselectedTechs}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectDetailModal;
