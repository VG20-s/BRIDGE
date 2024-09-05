"use client";
import { createStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const defaultInitState = {
  user_Id: "",
  user_name: "",
  user_sen: "",
  user_email: "",
};

export const createUserStore = () => {
  return createStore(
    persist(
      (set) => ({
        ...defaultInitState,
        set_user: (user) =>
          set({
            user_Id: user.sub,
            user_name: user.user_name,
            user_sen: user.sen,
            user_email: user.email,
          }),
        clear_user: () => set(defaultInitState),
      }),
      {
        name: "user-storage", // 로컬 스토리지에 저장될 때 사용될 키 이름
        storage: createJSONStorage(() => localStorage), // 또는 localStorage
      }
    )
  );
};
