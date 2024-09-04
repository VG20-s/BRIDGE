"use client";
import { createStore } from "zustand";
export const defaultInitState = {
  LikeList: [],
};

export const createLikesStore = () => {
  return createStore((set) => ({
    ...defaultInitState,
    set_Likes: (Likes) => {
      set({
        LikeList: Likes?.data?.reduce((a, b) => {
          if (!a.includes(b.postId)) {
            a.push(b.postId);
          }
          return a;
        }, []),
      });
    },
    clear_Likes: () => set(defaultInitState),
  }));
};
