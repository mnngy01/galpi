// src/screens/BookmarkListScreen.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BOOKMARK_DATA, DUMMY_CATEGORIES } from '../data/dummyData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

interface BookmarkItem {
  bookmarkId: number;
  url: string;
  folderId: number;
  imageUrl: string;
  aiSummary: string;
  like: boolean;
  createdAt: string;
}

const FolderListScreen = ({ route, navigation }: any) => {
  const { folderId, folderName } = route.params;

  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(
    BOOKMARK_DATA.filter(url => {
      if (folderName === '즐겨찾기') return url.like;
      return url.folderId === folderId;
    }),
  );

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isMoveModalVisible, setIsMoveModalVisible] = useState(false);

  // 💡 [추가] ••• 버튼 드롭다운 팝업 관련 상태
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState(0);

  const enterSelectMode = () => {
    setIsSelectMode(true);
    setSelectedIds(new Set());
  };

  const exitSelectMode = () => {
    setIsSelectMode(false);
    setSelectedIds(new Set());
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleDelete = () => {
    Alert.alert('삭제', `${selectedIds.size}개의 갈피를 삭제할까요?`, [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          setBookmarks(prev =>
            prev.filter(b => !selectedIds.has(b.bookmarkId)),
          );
          exitSelectMode();
        },
      },
    ]);
  };

  const handleMove = (targetFolderId: number) => {
    setBookmarks(prev => prev.filter(b => !selectedIds.has(b.bookmarkId)));
    setIsMoveModalVisible(false);
    exitSelectMode();
  };

  const movableFolders = DUMMY_CATEGORIES.filter(c => c.folderId !== folderId);

  const renderBookmarkItem = ({ item }: { item: BookmarkItem }) => {
    const isSelected = selectedIds.has(item.bookmarkId);

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected]}
        activeOpacity={0.8}
        onPress={() => {
          if (isSelectMode) {
            toggleSelect(item.bookmarkId);
          } else {
            console.log(`${item.url} 북마크 클릭`);
          }
        }}
        onLongPress={() => {
          if (!isSelectMode) enterSelectMode();
          toggleSelect(item.bookmarkId);
        }}
      >
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, styles.emptyThumbnail]} />
        )}

        <View style={styles.overlay}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.url}
          </Text>
          <Text style={styles.cardSummary} numberOfLines={3}>
            {item.aiSummary}
          </Text>
        </View>

        {isSelectMode && (
          <View
            style={[
              styles.checkCircle,
              isSelected && styles.checkCircleSelected,
            ]}
          >
            {isSelected && <Text style={styles.checkMark}>✓</Text>}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() =>
              isSelectMode ? exitSelectMode() : navigation.goBack()
            }
            activeOpacity={0.7}
          >
            {isSelectMode ? (
              <Text style={styles.backButtonText}>취소</Text>
            ) : (
              <Image
                source={{
                  uri: 'https://img.icons8.com/ios-filled/50/000000/left.png',
                }}
                style={styles.backArrowImage}
              />
            )}
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{folderName}</Text>

          {isSelectMode ? (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={e => {
                if (selectedIds.size === 0) return;
                // 💡 버튼을 누른 Y좌표를 측정해서 팝업을 바로 밑에 띄웁니다.
                setContextMenuPos(e.nativeEvent.pageY);
                setIsContextMenuVisible(true);
              }}
            >
              <Text
                style={[
                  styles.actionIcon,
                  selectedIds.size === 0 && styles.actionIconDisabled,
                ]}
              >
                •••
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={enterSelectMode}
            >
              <Text style={styles.selectText}>선택</Text>
            </TouchableOpacity>
          )}
        </View>

        {isSelectMode && (
          <View style={styles.selectBar}>
            <Text style={styles.selectBarText}>
              {selectedIds.size > 0
                ? `${selectedIds.size}개 선택됨`
                : '항목을 선택하세요'}
            </Text>
          </View>
        )}
      </SafeAreaView>

      <View style={styles.contentWrapper}>
        {bookmarks.length === 0 ? (
          <View style={styles.emptyContent}>
            <Text style={styles.emptyText}>아직 저장된 갈피가 없어요</Text>
          </View>
        ) : (
          <FlatList<BookmarkItem>
            data={bookmarks}
            renderItem={renderBookmarkItem}
            keyExtractor={item => item.bookmarkId.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>

      {/* 💡 [추가] ••• 컨텍스트 메뉴 (iOS 스타일 드롭다운) */}
      <Modal
        visible={isContextMenuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsContextMenuVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setIsContextMenuVisible(false)}
        >
          <View style={styles.contextModalOverlay}>
            <View
              style={[
                styles.contextMenu,
                { top: contextMenuPos }, // 계산된 Y 좌표 적용
              ]}
            >
              <TouchableOpacity
                style={styles.contextMenuBtn}
                onPress={() => {
                  setIsContextMenuVisible(false);
                  setIsMoveModalVisible(true); // 이동 모달 띄우기
                }}
              >
                <Text style={styles.contextMenuText}>이동</Text>
              </TouchableOpacity>
              <View style={styles.contextMenuDivider} />
              <TouchableOpacity
                style={styles.contextMenuBtn}
                onPress={() => {
                  setIsContextMenuVisible(false);
                  handleDelete(); // 삭제 확인 알림 띄우기
                }}
              >
                <Text style={[styles.contextMenuText, { color: '#FF3B30' }]}>
                  삭제
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* 기존 폴더 이동 바텀 모달 유지 */}
      <Modal
        visible={isMoveModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsMoveModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setIsMoveModalVisible(false)}>
                <Text style={styles.modalCancelText}>취소</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>폴더 이동</Text>
              <View style={{ width: 40 }} />
            </View>

            <FlatList
              data={movableFolders}
              keyExtractor={item => item.folderId.toString()}
              style={styles.folderList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.folderItem}
                  activeOpacity={0.7}
                  onPress={() => handleMove(item.folderId)}
                >
                  <View style={styles.folderIcon}>
                    <Text style={styles.folderIconText}>📁</Text>
                  </View>
                  <Text style={styles.folderItemText}>{item.name}</Text>
                  <Text style={styles.folderArrow}>›</Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSafeArea: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  backButton: {
    padding: 4,
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backArrowImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: '#000',
  },
  actionButton: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  actionIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 1,
  },
  actionIconDisabled: {
    color: '#C7C7CD',
  },
  selectText: {
    padding: 10,
    fontSize: 15,
    fontWeight: '500',
    color: '#555',
  },
  selectBar: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E5EA',
  },
  selectBarText: {
    fontSize: 13,
    color: '#555',
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 100,
    paddingTop: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH - 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  },
  cardSelected: {
    opacity: 0.75,
    borderWidth: 3,
    borderColor: '#FFB899',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  emptyThumbnail: {
    backgroundColor: '#D1D1D6',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(50, 65, 100, 0.45)',
    padding: 14,
    justifyContent: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardSummary: {
    fontSize: 12,
    color: '#FFFFFF',
    lineHeight: 16,
  },
  checkCircle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleSelected: {
    backgroundColor: '#FFB899',
    borderColor: '#FFB899',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '60%',
    paddingBottom: 40,
  },
  modalHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#FFB899',
    width: 40,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  folderList: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  folderIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FFE5D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  folderIconText: {
    fontSize: 18,
  },
  folderItemText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  folderArrow: {
    fontSize: 20,
    color: '#C7C7CD',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E5EA',
    marginLeft: 60,
  },

  // 🎨 추가된 드롭다운 팝업 메뉴 스타일
  contextModalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contextMenu: {
    position: 'absolute',
    right: 16, // 화면 우측 여백에 딱 맞춤
    width: 160, // 메뉴 너비
    backgroundColor: 'rgba(250, 250, 250, 0.98)', // 살짝 불투명한 아이폰 스타일 화이트
    borderRadius: 14,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 999,
  },
  contextMenuBtn: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  contextMenuText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
  },
  contextMenuDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 16,
  },
});

export default FolderListScreen;
