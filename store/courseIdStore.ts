import { create } from "zustand";

interface IdState {
    id: number| null; // Assuming the ID is a string, but you can change the type as needed
    setId: (id: number | null) => void;
    clearId: () => void;
  }
  
  // Create your Zustand store
  export const useIdStore = create<IdState>((set) => ({
    id: null,
    setId: (id) => set({ id }),
    clearId: () => set({ id: null }),
  }));