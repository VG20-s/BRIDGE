import { Box, Heading, Text, Badge, Flex, Modal } from "@chakra-ui/react";
export const ProjectCard = ({ title, contents, tags, dueDate }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      mb={4}
      boxShadow="md"
      bg={"white"}
    >
      <Heading as="h3" size="md" mb={2}>
        {title}
      </Heading>
      <Text color="gray.600" mb={2}>
        {contents}
      </Text>
      <Flex wrap="wrap" mb={2}>
        {tags?.map((skill, index) => (
          <Badge key={index} colorScheme="blue" mr={2} mb={2}>
            {skill}
          </Badge>
        ))}
      </Flex>
      <Text fontSize="sm" color="gray.500">
        마감일: {dueDate ? dueDate : "종료일 없음"}
      </Text>
      <Modal></Modal>
    </Box>
  );
};
