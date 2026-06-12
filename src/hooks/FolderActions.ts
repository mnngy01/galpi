// src/hooks/useFolderActions.ts
import { useState } from 'react';
import { DUMMY_CATEGORIES } from '../data/dummyData';

// ✅ id → folderId 로 수정
export interface CategoryItem {
  folderId: number;
  name: string;
  higherFolderId: number | null;
  createdAt: string;
}

export const FolderActions = () => {
  const [folders, setFolders] = useState<CategoryItem[]>(DUMMY_CATEGORIES);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [folderNameInput, setFolderNameInput] = useState('');

  const openModal = () => {
    setFolderNameInput('');
    setIsModalVisible(true);
  };
  const closeModal = () => setIsModalVisible(false);

  const handleAddFolder = () => {
    if (!folderNameInput.trim()) return;

    const newFolder: CategoryItem = {
      folderId: Date.now(), // ✅ id → folderId
      name: folderNameInput.trim(),
      higherFolderId: null,
      createdAt: new Date().toISOString(),
    };

    setFolders([...folders, newFolder]);
    closeModal();
  };

  // ✅ id → folderId
  const handleDeleteFolder = (folderId: number) => {
    setFolders(folders.filter(folder => folder.folderId !== folderId));
  };

  return {
    folders,
    isEditMode,
    setIsEditMode,
    isModalVisible,
    openModal,
    closeModal,
    folderNameInput,
    setFolderNameInput,
    handleAddFolder,
    handleDeleteFolder,
  };
};