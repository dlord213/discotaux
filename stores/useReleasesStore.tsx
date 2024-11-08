import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useReleasesStore = create(immer((set, get) => ({})));

export default useReleasesStore;
