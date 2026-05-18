// src/hooks/useFolderActions.ts
import { useState } from 'react';
import { Alert } from 'react-native';
import { DUMMY_CATEGORIES } from '../data/dummyData';

// API 명세 기반 카테고리 아이템 인터페이스 정의
export interface CategoryItem {
  id: number;
  name: string;
  higherFolderId: number | null;
  createdAt: string;
}

export const FolderActions = () => {
  // 로컬 상태로 카테고리 더미 데이터 관리 (추가/삭제 실시간 반영 목적)
  const [folders, setFolders] = useState<CategoryItem[]>(DUMMY_CATEGORIES);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [folderNameInput, setFolderNameInput] = useState('');

  // 1. 새로운 폴더(카테고리) 추가 기능
  const openModal = () => {
    console.log('openModal 호출됨!');
    setFolderNameInput('');
    console.log('isModalVisible를 true로 설정');
    setIsModalVisible(true);
  };
  const closeModal = () => setIsModalVisible(false);

  // 폴더 추가 로직
  const handleAddFolder = () => {
    if (!folderNameInput.trim()) return;

    const newFolder: CategoryItem = {
      id: Date.now(), // 고유 ID 생성
      name: folderNameInput.trim(),
      higherFolderId: null,
      createdAt: new Date().toISOString(),
    };

    setFolders([...folders, newFolder]); // 맨 뒤에 생성되도록
    closeModal();
  };

  // 폴더 삭제 로직
  const handleDeleteFolder = (id: number) => {
    setFolders(folders.filter(folder => folder.id !== id));
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
