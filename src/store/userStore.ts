// context/userStore.ts
import { create } from 'zustand';

type Folder = {
  id: string;
  icon: string;
  label: string;
  folder: string;
};

type UserStore = {
  selectedFolders: Folder[];
  setSelectedFolders: (folders: Folder[]) => void;
};

export const useUserStore = create<UserStore>(set => ({
  selectedFolders: [],
  setSelectedFolders: folders => set({ selectedFolders: folders }),
}));
