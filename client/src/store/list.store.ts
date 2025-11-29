import { create } from "zustand";
import { persist } from "zustand/middleware";


interface ActiveListFormState {
    ListFormActiveId: string | null;
    setActiveListForm: (id: string) => void;
    closeListForm: () => void;
}

export const useActiveListFormStore = create<ActiveListFormState>()(
    persist(
        (set) => ({
            ListFormActiveId: null,
            setActiveListForm: (id: string) => {
                set({ ListFormActiveId: id });
            },
            closeListForm: () => {
                set({ ListFormActiveId: null });
            },
        }),
        {
            name: "list-form-storage",
        }
    )
);
