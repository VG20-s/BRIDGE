"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createUserStore } from "./user";
import { createLikesStore } from "./Likes";
export const UserStoreContext = createContext(undefined);

export const CounterStoreProvider = ({ children }) => {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = createUserStore();
  }
  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = (selector) => {
  const context = useContext(UserStoreContext);
  if (!context) {
    throw new Error(`useUserStore must be used within UserStoreProvider`);
  }

  return useStore(context, selector);
};

export const LikeStoreContext = createContext(undefined);

export const LikeStoreProvider = ({ children }) => {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = createLikesStore();
  }
  return (
    <LikeStoreContext.Provider value={storeRef.current}>
      {children}
    </LikeStoreContext.Provider>
  );
};

export const useLikeStore = (selector) => {
  const context = useContext(LikeStoreContext);
  if (!context) {
    throw new Error(`useUserStore must be used within UserStoreProvider`);
  }

  return useStore(context, selector);
};
