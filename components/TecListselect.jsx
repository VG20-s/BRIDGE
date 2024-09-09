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
  selectedTechs = [],
  setSelectedTechs,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  console.log(selectedTechs);
  const filteredTechs = techStacks.filter((tech) =>
    tech.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (tech) => {
    const newData = selectedTechs.includes(tech)
      ? selectedTechs.filter((t) => t !== tech)
      : [...selectedTechs, tech];
    setSelectedTechs(newData);
  };

  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Box
      minW={"400PX"}
      mx="auto"
      mt="8"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      boxShadow="sm"
      bg={"#FFF"}
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
