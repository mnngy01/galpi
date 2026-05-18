import React from 'react';
import {
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DUMMY_URLS } from '../data/dummyData';
import { FolderActions, CategoryItem } from '../hooks/FolderActions';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const FolderScreen = ({ navigation }: any) => {
  const {
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
  } = FolderActions();

  const renderFolderItem: ListRenderItem<CategoryItem> = ({ item }) => {
    const categoryUrls = DUMMY_URLS.filter(url => {
      if (item.name === '즐겨찾기') return url.isFavorite;
      return url.category === item.name;
    });

    const latestBookmark = categoryUrls[categoryUrls.length - 1];
    const latestThumbnail = latestBookmark?.thumbnail;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => {
          if (!isEditMode) {
            navigation.navigate('BookmarkList', {
              folderId: item.id,
              folderName: item.name,
            });
          }
        }}
      >
        {latestThumbnail ? (
          <Image source={{ uri: latestThumbnail }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, styles.emptyThumbnail]} />
        )}

        <View style={styles.overlay}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardCount}>{categoryUrls.length}개의 갈피</Text>
        </View>

        {/* 편집 모드일 때 좌측 상단 삭제 버튼 노출 */}
        {isEditMode && item.name !== '즐겨찾기' && (
          <TouchableOpacity
            style={styles.deleteBadge}
            activeOpacity={0.7}
            onPress={() => handleDeleteFolder(item.id)}
          >
            <Text style={styles.deleteBadgeText}>×</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          {/* 왼쪽: 편집/완료 버튼 */}
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => setIsEditMode(!isEditMode)}
          >
            <Text style={styles.headerBtnText}>
              {isEditMode ? '완료' : '편집'}
            </Text>
          </TouchableOpacity>

          {/* 중앙: 로고 */}
          <Text style={styles.logoText}>GALPI</Text>

          {/* 오른쪽: ... 팝업 트리거 버튼 */}
          <TouchableOpacity style={styles.headerBtn} onPress={openModal}>
            <Text style={styles.moreIcon}>＋</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <FlatList
        data={folders}
        renderItem={renderFolderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* 아래에서 올라오는 새 폴더 생성 바텀 팝업 */}
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
            {/* 팝업 헤더 */}
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

            {/* 입력창 바디 */}
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
  headerBtnText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#555',
  },
  moreIcon: {
    fontSize: 22,
    fontWeight: '400',
    color: '#000',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 2,
    color: '#000',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH - 2,
    height: CARD_WIDTH - 2,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
    position: 'relative',
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
  cardCount: {
    fontSize: 12,
    color: '#EFEFEF',
    fontWeight: '500',
  },
  deleteBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBadgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: -2,
  },
  /* 바텀 팝업 모달 스타일 */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // 뒷배경 어둡게
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
  modalCloseText: {
    fontSize: 22,
    color: '#333',
    marginTop: -2,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  modalCreateBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCreateBtnActive: {
    backgroundColor: '#FFB899', // 입력 시 주황색 활성화
  },
  modalCreateBtnInactive: {
    backgroundColor: '#E5E5EA', // 비활성화 회색
  },
  modalCreateText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalCreateTextActive: {
    color: '#FFFFFF',
  },
  modalCreateTextInactive: {
    color: '#A1A1A1',
  },
  modalBody: {
    padding: 20,
    alignItems: 'center',
  },
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
});

export default FolderScreen;
