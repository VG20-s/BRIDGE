"use client";
import React, { useState } from "react";

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

  return (
    <div
      className="w-80 mx-auto mt-8 border border-gray-300 rounded-lg shadow-sm bg-slate-200 "
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 border-b border-gray-300">
        <input
          type="text"
          placeholder="기술 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="p-4 max-h-60 overflow-y-auto">
        {filteredTechs.map((tech) => (
          <div key={tech} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={tech}
              checked={selectedTechs.includes(tech)}
              onChange={() => handleCheckboxChange(tech)}
              className="mr-2"
            />
            <label htmlFor={tech}>{tech}</label>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-300">
        <strong>선택된 기술:</strong> {selectedTechs.join(", ")}
      </div>
    </div>
  );
}
