"use client";
import React, { useState } from "react";
import { useLikeStore, useUserStore } from "@/store/initial";
import { Likes, disLikes } from "@/api/getLike";
import { mutate } from "swr";
import { Button, useToast } from "@chakra-ui/react";
const LikeButton = ({ project_id }) => {
  const { user_Id } = useUserStore((state) => state);
  const [isSending, setiisSending] = useState(false);
  const { LikeList } = useLikeStore((store) => store);
  const isLike = LikeList?.includes(project_id);
  const toast = useToast();
  const SubmitLike = async () => {
    if (isSending) return;
    setiisSending(true);
    {
      if (!isLike) {
        await Likes({ user_Id: user_Id, id: project_id });
      } else {
        await disLikes({ user_Id: user_Id, id: project_id });
      }
    }
    mutate(["likes", user_Id]);
    setiisSending(false);
    toast({
      title: isLike ? "좋아요 취소" : "좋아요 완료",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Button
      onClick={() => SubmitLike()}
      leftIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
          fill={isLike ? "red" : "none"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      }
    >
      {isLike ? "좋아요 취소" : "좋아요"}
    </Button>
  );
};

export default LikeButton;
