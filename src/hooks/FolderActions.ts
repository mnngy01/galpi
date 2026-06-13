// src/hooks/FolderActions.ts
import { useState, useEffect } from 'react';
import { getFolders, createFolder, updateFolder, deleteFolder } from '../services/folderApi';

export interface Folder {
  id: string;
  name: string;
  higherFolderId: string | null;
  createdAt: string;
}

export const FolderActions = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [folderNameInput, setFolderNameInput] = useState('');

  useEffect(() => {
    getFolders()
      .then((data: Folder[]) => setFolders(data ?? []))
      .catch((err: any) => console.error('폴더 불러오기 실패:', err));
  }, []);

  const openModal = () => {
    setFolderNameInput('');
    setIsModalVisible(true);
  };
  const closeModal = () => setIsModalVisible(false);

  const handleAddFolder = () => {
    if (!folderNameInput.trim()) return;
    createFolder(folderNameInput.trim())
      .then((newFolder: Folder) => setFolders(prev => [...prev, newFolder]))
      .catch((err: any) => console.error('폴더 생성 실패:', err));
    closeModal();
  };

  const handleDeleteFolder = (id: string) => {
    deleteFolder(id)
      .then(() => setFolders(prev => prev.filter(f => f.id !== id)))
      .catch((err: any) => console.error('폴더 삭제 실패:', err));
  };

  const handleUpdateFolder = (id: string, name: string) => {
    updateFolder(id, name)
      .then((updated: Folder) =>
        setFolders(prev =>
          prev.map(f => (f.id === id ? updated : f)),
        ),
      )
      .catch((err: any) => console.error('폴더 수정 실패:', err));
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
    handleUpdateFolder,
  };
};