// src/hooks/FolderActions.ts
import { useState } from 'react';
import { DUMMY_CATEGORIES } from '../data/dummyData';

// 1. API 명세 및 실제 더미 데이터에 맞게 'id'를 'folderId'로 수정
export interface CategoryItem {
  folderId: number; // 👈 id에서 folderId로 변경
  name: string;
  higherFolderId: number | null;
  createdAt: string;
}

export const FolderActions = () => {
  // 로컬 상태로 카테고리 더미 데이터 관리
  const [folders, setFolders] = useState<CategoryItem[]>(DUMMY_CATEGORIES);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [folderNameInput, setFolderNameInput] = useState('');

  // 새로운 폴더(카테고리) 추가 기능
  const openModal = () => {
    setFolderNameInput('');
    setIsModalVisible(true);
  };
  const closeModal = () => setIsModalVisible(false);

  // 폴더 추가 로직
  const handleAddFolder = () => {
    if (!folderNameInput.trim()) return;

    const newFolder: CategoryItem = {
      folderId: Date.now(), // 👈 folderId로 매핑
      name: folderNameInput.trim(),
      higherFolderId: null,
      createdAt: new Date().toISOString(),
    };

    setFolders([...folders, newFolder]);
    closeModal();
  };

  // 폴더 삭제 로직
  const handleDeleteFolder = (folderId: number) => {
    // 👈 id 대신 folderId 사용
    setFolders(folders.filter(folder => folder.folderId !== folderId));
  };

  return {
    folders,
    setFolders,
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
