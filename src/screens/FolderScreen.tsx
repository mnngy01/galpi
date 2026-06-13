//FolderScreen.tsx
import React, { useState, useRef, useEffect } from 'react';import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ListRenderItem,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchBookmarksByFolder, Bookmark } from '../services/bookmarkApi';
import { FolderActions, Folder } from '../hooks/FolderActions';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;
const CONTEXT_MENU_WIDTH = 150;

// 폴더 카드 컴포넌트
const FolderCard = ({
  item,
  thumbnail,
  bookmarksCount,
  onPress,
  onLongPress,
}: {
  item: Folder;
  thumbnail?: string;
  bookmarksCount: number;
  onPress: () => void;
  onLongPress: (
    item: Folder,
    pageX: number,
    pageY: number,
    cardWidth: number,
    cardHeight: number,
  ) => void;
}) => {
  const cardRef = useRef<View>(null);

  return (
    <View ref={cardRef} collapsable={false}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        delayLongPress={300}
        onLongPress={() => {
          cardRef.current?.measure((x, y, w, h, pageX, pageY) => {
            onLongPress(item, pageX, pageY, w, h);
          });
        }}
        onPress={onPress}
      >
        {thumbnail ? (
          <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, styles.emptyThumbnail]} />
        )}

        <View style={styles.overlay}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardCount}>{bookmarksCount}개의 갈피</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// 메인 스크린
const FolderScreen = ({ navigation }: any) => {
  const {
    folders,
    setFolders,
    isModalVisible,
    openModal,
    closeModal,
    folderNameInput,
    setFolderNameInput,
    handleAddFolder,
    handleDeleteFolder,
  } = FolderActions();

  const [activeFolder, setActiveFolder] = useState<Folder | null>(null);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [editNameInput, setEditNameInput] = useState('');

  const [folderBookmarks, setFolderBookmarks] = useState<Record<number, Bookmark[]>>({});

  useEffect(() => {
    folders.forEach(folder => {
      fetchBookmarksByFolder(folder.folderId)
        .then((data: Bookmark[]) => {
          setFolderBookmarks(prev => ({ ...prev, [folder.folderId]: data }));
        })
        .catch((err: any) => console.error('북마크 불러오기 실패:', err));
    });
  }, [folders]);

  const handleLongPressCard = (
    item: Folder,
    pageX: number,
    pageY: number,
    cardWidth: number,
    cardHeight: number,
  ) => {
    if (item.name === '즐겨찾기') return;

    // 폴더의 왼쪽 선 = 팝업 메뉴의 왼쪽 선
    const menuX = pageX;

    // 폴더 바로 아래에 딱 붙도록 (만약 화면 아래로 넘어가면 폴더 위로 띄움)
    let menuY = pageY + cardHeight - 20;
    if (menuY + 100 > height) {
      menuY = pageY - 90;
    }

    setContextMenuPos({ x: menuX, y: menuY });
    setActiveFolder(item);
  };

  const handleUpdateFolder = () => {
    if (!editNameInput.trim() || !activeFolder) return;
    setFolders((prev: Folder[]) =>
      prev.map(f =>
        f.folderId === activeFolder.folderId
          ? { ...f, name: editNameInput.trim() }
          : f,
      ),
    );
    setIsUpdateModalVisible(false);
    setActiveFolder(null);
  };

  const renderFolderItem: ListRenderItem<Folder> = ({ item }) => {
  const categoryBookmarks = folderBookmarks[item.folderId] || [];
  const latestThumbnail = categoryBookmarks[categoryBookmarks.length - 1]?.imageUrl;

  return (
    <FolderCard
      item={item}
      thumbnail={latestThumbnail ?? undefined}
      bookmarksCount={categoryBookmarks.length}
      onLongPress={handleLongPressCard}
      onPress={() => {
        navigation.navigate('BookmarkList', {
          folderId: item.folderId,
          folderName: item.name,
        });
      }}
    />
  );
};

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <View style={styles.headerBtn} />
          <Text style={styles.logoText}>GALPI</Text>
          <TouchableOpacity style={styles.headerBtn} onPress={openModal}>
            <Text style={styles.moreIcon}>＋</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <FlatList
        data={folders || []}
        renderItem={renderFolderItem}
        keyExtractor={item => item.folderId.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* 1. 팝업 컨텍스트 메뉴 */}
      {activeFolder && !isUpdateModalVisible && (
        <Modal
          transparent
          animationType="fade"
          visible={true}
          onRequestClose={() => setActiveFolder(null)}
        >
          <TouchableWithoutFeedback onPress={() => setActiveFolder(null)}>
            <View style={styles.contextModalOverlay}>
              <View
                style={[
                  styles.contextMenu,
                  {
                    top: contextMenuPos.y,
                    left: contextMenuPos.x,
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.contextMenuBtn}
                  onPress={() => {
                    setEditNameInput(activeFolder.name);
                    setIsUpdateModalVisible(true);
                  }}
                >
                  <Text style={styles.contextMenuText}>제목 수정</Text>
                </TouchableOpacity>
                <View style={styles.contextMenuDivider} />
                <TouchableOpacity
                  style={styles.contextMenuBtn}
                  onPress={() => {
                    handleDeleteFolder(activeFolder.folderId);
                    setActiveFolder(null);
                  }}
                >
                  <Text style={[styles.contextMenuText, { color: '#FF3B30' }]}>
                    폴더 삭제
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      {/* 2. 새 폴더 생성 모달 */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContent}
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={closeModal}
                style={styles.modalCloseBtn}
              >
                <Text style={styles.modalCloseText}>×</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>새 폴더 생성</Text>
              <TouchableOpacity
                onPress={handleAddFolder}
                disabled={!folderNameInput.trim()}
                style={[
                  styles.modalCreateBtn,
                  folderNameInput.trim()
                    ? styles.modalCreateBtnActive
                    : styles.modalCreateBtnInactive,
                ]}
              >
                <Text
                  style={[
                    styles.modalCreateText,
                    folderNameInput.trim()
                      ? styles.modalCreateTextActive
                      : styles.modalCreateTextInactive,
                  ]}
                >
                  생성
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <TextInput
                style={styles.input}
                placeholder="공유 앨범 이름"
                placeholderTextColor="#C7C7CD"
                value={folderNameInput}
                onChangeText={setFolderNameInput}
                autoFocus={true}
                maxLength={20}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* 3. 폴더 이름 수정 모달 */}
      <Modal
        visible={isUpdateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsUpdateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContent}
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => {
                  setIsUpdateModalVisible(false);
                  setActiveFolder(null);
                }}
                style={styles.modalCloseBtn}
              >
                <Text style={styles.modalCloseText}>×</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>폴더 이름 수정</Text>
              <TouchableOpacity
                onPress={handleUpdateFolder}
                disabled={
                  !editNameInput.trim() ||
                  editNameInput.trim() === activeFolder?.name
                }
                style={[
                  styles.modalCreateBtn,
                  editNameInput.trim() &&
                  editNameInput.trim() !== activeFolder?.name
                    ? styles.modalCreateBtnActive
                    : styles.modalCreateBtnInactive,
                ]}
              >
                <Text
                  style={[
                    styles.modalCreateText,
                    editNameInput.trim() &&
                    editNameInput.trim() !== activeFolder?.name
                      ? styles.modalCreateTextActive
                      : styles.modalCreateTextInactive,
                  ]}
                >
                  완료
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <TextInput
                style={styles.input}
                placeholder="변경할 폴더 이름"
                placeholderTextColor="#C7C7CD"
                value={editNameInput}
                onChangeText={setEditNameInput}
                autoFocus={true}
                maxLength={20}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerSafeArea: { backgroundColor: '#FFFFFF' },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerBtn: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreIcon: { fontSize: 22, fontWeight: '400', color: '#000' },
  logoText: {
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 2,
    color: '#000',
  },
  listContainer: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 100 },
  row: { justifyContent: 'space-between', marginBottom: 16 },
  card: {
    width: CARD_WIDTH - 2,
    height: CARD_WIDTH - 2,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
    position: 'relative',
  },
  thumbnail: { width: '100%', height: '100%', position: 'absolute' },
  emptyThumbnail: { backgroundColor: '#D1D1D6' },
  overlay: {
    flex: 1,
    padding: 14,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardCount: { fontSize: 12, color: '#EFEFEF', fontWeight: '500' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalHeader: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: { fontSize: 22, color: '#333', marginTop: -2 },
  modalTitle: { fontSize: 17, fontWeight: '600', color: '#000' },
  modalCreateBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCreateBtnActive: { backgroundColor: '#FFB899' },
  modalCreateBtnInactive: { backgroundColor: '#E5E5EA' },
  modalCreateText: { fontSize: 14, fontWeight: '600' },
  modalCreateTextActive: { color: '#FFFFFF' },
  modalCreateTextInactive: { color: '#A1A1A1' },
  modalBody: { padding: 20, alignItems: 'center' },
  input: {
    width: '100%',
    height: 54,
    backgroundColor: '#FFFFFF',
    borderRadius: 27,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  contextModalOverlay: { flex: 1, backgroundColor: 'transparent' },
  contextMenu: {
    position: 'absolute',
    width: CONTEXT_MENU_WIDTH,
    backgroundColor: '#2C2C2E',
    borderRadius: 14,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    zIndex: 999,
  },
  contextMenuBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  contextMenuText: { color: '#FFFFFF', fontSize: 15, fontWeight: '400' },
  contextMenuDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#48484A',
    marginHorizontal: 16,
  },
});

export default FolderScreen;
