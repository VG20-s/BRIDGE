"use client";
import React from "react";
import { useUserStore } from "@/store/initial";
const Post = () => {
  const { user_Id, user_name, user_sen, user_email } = useUserStore(
    (state) => state
  );
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user_Id, user_name, user_sen, user_email);
  };

  return (
    <form onSubmit={submitHandler}>
      <input></input>
      <input></input>
      <textarea></textarea>
      <button>asdasd</button>
    </form>
  );
};

export default Post;
