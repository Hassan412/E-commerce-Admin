import { create } from "zustand";

interface useStoredModelStore {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
}

export const useStoredModel = create<useStoredModelStore>((set)=> ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false})
}))