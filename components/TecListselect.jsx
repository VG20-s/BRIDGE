"use client";
import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Input,
  Text,
  VStack,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";

const techStacks = [
  // Frontend
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Angular",
  "Vue.js",
  "Svelte",
  "Bootstrap",
  "Tailwind CSS",
  "Sass",
  "Webpack",
  "Vite",
  "Next.js",
  "Nuxt.js",
  "Styled-component",

  // Backend
  "Node.js",
  "Express.js",
  "Django",
  "Flask",
  "Ruby on Rails",
  "Spring Boot",
  "ASP.NET Core",
  "NestJS",
  "Koa",
  "FastAPI",
  "Golang",
  "PHP",
];

export default function TechSearchInterface({
  selectedTechs,
  setSelectedTechs,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTechs = techStacks.filter((tech) =>
    tech.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (tech) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const borderColor = useColorModeValue("gray.300", "gray.600");
  const bgColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      w="80"
      mx="auto"
      mt="8"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      boxShadow="sm"
      bg={bgColor}
      onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전달 차단
    >
      <Box p="4" borderBottomWidth="1px" borderColor={borderColor}>
        <Input
          placeholder="기술 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          focusBorderColor="blue.500"
        />
      </Box>
      <VStack
        p="4"
        maxH="240px"
        overflowY="auto"
        overflowX="hidden"  // 가로 스크롤을 차단하여 세로 스크롤에만 집중
        spacing="2"
        align="start"
        divider={<StackDivider borderColor={borderColor} />}
      >
        {filteredTechs.map((tech) => (
          <Checkbox
            key={tech}
            isChecked={selectedTechs.includes(tech)}
            onChange={() => handleCheckboxChange(tech)}
          >
            {tech}
          </Checkbox>
        ))}
      </VStack>
      <Box p="4" borderTopWidth="1px" borderColor={borderColor}>
        <Text fontWeight="bold">선택된 기술:</Text> {selectedTechs.join(", ")}
      </Box>
    </Box>
  );
}
