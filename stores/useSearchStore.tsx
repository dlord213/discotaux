import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface SearchStoreInterface {
  query: string;
  mode: number; // 0 - Album | 1 - Track | 2 - User
  setQuery: (val: string) => void;
  setMode: (val: number) => void;
}

const useSearchStore = create<SearchStoreInterface>()(
  immer((set, get) => ({
    query: "",
    mode: 0,
    setQuery: (val: string) => set({ query: val }),
    setMode: (val: number) => set({ mode: val }),
    search: (access_token: string) => ({}),
  }))
);

export default useSearchStore;
