import { string } from "zod";
import { create } from "zustand"

type OpenCategoryState = {
    id?: string;
    isOpen: boolean;
    onOpen: (id: string) => void;
    onClose: () => void
}
export const useOpenTransaction = create<OpenCategoryState>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: undefined })
}))