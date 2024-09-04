"use client";
import { createStore } from "zustand";
export const defaultInitState = {
  LikeList:[]
};

export const createLikesStore = () => {
  return createStore(
      (set) => ({
        ...defaultInitState,
        set_user: (Likes) =>
          set({
            LikeList:Likes
          }),
        clear_user: () => set(defaultInitState),
      })
    )
};
