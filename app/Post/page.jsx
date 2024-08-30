"use client";
import React, { useState } from "react";
import { useUserStore } from "@/store/initial";
import { Box, Button, Input, Tag, Text, Textarea } from "@chakra-ui/react";
import TechSearchInterface from "@/components/TecListselect";
import { Posts } from "./createpost";
const Post = () => {
  const { user_Id, user_name, user_sen, user_email } = useUserStore(
    (state) => state
  );
  const [isOpenstack, setisOpenstack] = useState(false);
  const [selectedTechs, setselectedTechs] = useState([]);
  const submitHandler = (e) => {
    e.preventDefault();
    const a = new FormData(e.target);
    const result = Posts({
      title: a.get("title"),
      contents: a.get("contents"),
      tags: selectedTechs,
      user_Id: user_Id,
    });
    if (!result.success) {
      console.log(result.data);
      setselectedTechs([]);
      e.target.reset();
    } else {
      console.log(result.data);
    }
  };

  return (
    <div>
      <div className="h-screen flex justify-center w-full">
        <form
          className="flex gap-2 justify-center w-4/5   items-center flex-col bg-slate-100"
          onSubmit={submitHandler}
          sample
        >
          <Text mb="8px">Title</Text>
          <Input width={"80%"} name="title" placeholder="타이틀" />
          <Text mb="8px">Value</Text>
          <Textarea width={"80%"} name="contents" placeholder="모집 내용" />
          <Box
            width={"80%"}
            flex
            border={"1px"}
            borderRadius={"10px"}
            padding={"10px"}
            onClick={() => setisOpenstack(true)}
          >
            <Text mb="8px" width={"100%"} textAlign={"center"}>
              tags
            </Text>
            <div className="flex gap-3 flex-wrap">
              {selectedTechs.map((a, b) => {
                return (
                  <Tag key={a} variant="solid">
                    {a}
                  </Tag>
                );
              })}
            </div>
          </Box>
          <Button type="submit" variant="outline" colorScheme="blue">
            Button
          </Button>
        </form>
      </div>
      {isOpenstack && (
        <div
          onClick={() => setisOpenstack(false)}
          className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-800 bg-opacity-50 z-50"
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

export default Post;
