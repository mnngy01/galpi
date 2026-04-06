import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../store/userStore';

const FolderScreen = ({ navigation }: any) => {
  const selectedFolders = useUserStore(state => state.selectedFolders);

  const dummyFolders = [
    { id: 'dummy1', icon: '📁', label: '내 폴더', folder: 'my-folder' },
  ];

  const folders = selectedFolders.length > 0 ? selectedFolders : dummyFolders;

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.logoText}>GALPI</Text>
      </View>

      {/* 폴더 그리드 */}
      <FlatList
        data={folders}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.folder}
            activeOpacity={0.7}
            onPress={() => console.log('폴더 클릭:', item.label)}
          >
            <Text style={styles.folderIcon}>{item.icon}</Text>
            <Text style={styles.folderLabel}>{item.label}</Text>
            <Text style={styles.folderCount}>0개</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 2,
    color: '#000',
  },
  grid: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  folder: {
    width: '48%',
    backgroundColor: '#FFF8F6',
    borderWidth: 1,
    borderColor: '#FFD3C0',
    borderRadius: 16,
    padding: 20,
    gap: 8,
  },
  folderIcon: {
    fontSize: 28,
  },
  folderLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  folderCount: {
    fontSize: 12,
    color: '#A0A0A0',
  },
});

export default FolderScreen;
