"use client";
import { postsData } from "@/app/Main/PostsData";
import Botnav from "@/components/Bottomnav";
import ProjectDetailModal from "@/components/PostInfo";
import Header from "@/components/Header";
import { ProjectCard } from "@/components/Projectcard";
import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLike } from "@/api/useLike";
import { useLikeStore } from "@/store/initial";

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [postData, setpostData] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const set_Likes = useLikeStore((store) => store.set_Likes);
  const { data, isError } = useLike();
  useEffect(() => {
    const fetchData = async () => {
      const a = await postsData();
      setpostData(a);
      setisLoading(true);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("아무것도모름");
    if (!isError) {
      set_Likes(data);
      console.log(data);
    }
  }, [data, isError, set_Likes]);
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
