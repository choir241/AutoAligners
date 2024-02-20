import { create } from "zustand";
import { produce } from "immer";
import { State, Action } from "./Zustand-Types";

export const useStore = create<State & Action>((set) => ({
  emailCookie: "",
  setEmailCookie: (emailCookie: string) => {
    set(
      produce((state) => {
        state.emailCookie = emailCookie;
      }),
    );
  },
}));
