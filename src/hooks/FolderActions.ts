// src/hooks/FolderActions.ts
import { useState, useEffect } from 'react';
import { getFolders, createFolder, updateFolder, deleteFolder } from '../services/folderApi';

export interface Folder {
  folderId: number;
  name: string;
  higherFolderId: number | null;
  createdAt: string;
}

export const FolderActions = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [folderNameInput, setFolderNameInput] = useState('');

  useEffect(() => {
    getFolders()
      .then(data => setFolders(data))
      .catch(err => console.error('폴더 불러오기 실패:', err));
  }, []);

  const openModal = () => {
    setFolderNameInput('');
    setIsModalVisible(true);
  };
  const closeModal = () => setIsModalVisible(false);

  const handleAddFolder = () => {
    if (!folderNameInput.trim()) return;
    createFolder(folderNameInput.trim())
      .then(newFolder => setFolders(prev => [...prev, newFolder]))
      .catch(err => console.error('폴더 생성 실패:', err));
    closeModal();
  };

  const handleDeleteFolder = (folderId: number) => {
    deleteFolder(folderId)
      .then(() => setFolders(prev => prev.filter(f => f.folderId !== folderId)))
      .catch(err => console.error('폴더 삭제 실패:', err));
  };

  const handleUpdateFolder = (folderId: number, name: string) => {
    updateFolder(folderId, name)
      .then(updated =>
        setFolders(prev =>
          prev.map(f => (f.folderId === folderId ? updated : f)),
        ),
      )
      .catch(err => console.error('폴더 수정 실패:', err));
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