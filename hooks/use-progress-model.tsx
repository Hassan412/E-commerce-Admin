import { create } from "zustand";

interface useProgressModel {
    isOpen: boolean;
    value: number;
    onOpen: () => void,
    Url: boolean;
    onClose: () => void;
    onChange: () => void;
}

export const useProgressModel = create<useProgressModel>((set)=> ({
    isOpen: false,
    value: 0,
    onChange: () => set({ Url: true }),
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false,Url: false}),
    Url: false
}))