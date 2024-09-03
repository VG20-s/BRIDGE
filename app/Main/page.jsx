"use client";
import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";
import Header from "@/components/Header";
import Botnav from "@/components/Bottomnav";
import ProjectDetailModal from "@/components/DataInfo";
import { postsData } from "@/app/Main/PostsData";
import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/Projectcard";
const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [postData, setpostData] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const a = await postsData();
      setpostData(a);
      setisLoading(true);
      console.log(a);
    };
    fetchData();
  }, []);
  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      <div className="overflow-auto pt-4 flex justify-start flex-col h-full">
        {!isLoading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} height="200px" mb="4">
                <Box h="100%">
                  <SkeletonText noOfLines={4} spacing="4" />
                </Box>
              </Skeleton>
            ))}
          </>
        ) : (
          postData?.data.map((project, index) => (
            <Box
              key={project.id || index}
              onClick={() => openModal(project)}
              cursor="pointer"
              mb="4"
            >
              <ProjectCard {...project} />
            </Box>
          ))
        )}
        <ProjectDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
      </div>
      <Botnav></Botnav>
    </div>
  );
};

export default Main;
