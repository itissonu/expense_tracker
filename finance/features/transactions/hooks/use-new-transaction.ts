import { create } from "zustand"

type newCategoriesState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void
}
export const useNewTransaction= create<newCategoriesState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))