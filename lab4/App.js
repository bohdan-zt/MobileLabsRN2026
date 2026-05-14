import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { File, Directory, Paths } from 'expo-file-system';

const formatBytes = (bytes) => {
  if (bytes === 0 || !bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function App() {
  const [currentDir, setCurrentDir] = useState(Paths.document);
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ total: 0, available: 0, used: 0 });

  const [modalVisible, setModalVisible] = useState(false);
  const [createType, setCreateType] = useState('folder');
  const [inputName, setInputName] = useState('');
  const [inputContent, setInputContent] = useState('');

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    loadStorageStats();
    loadDirectoryContents();
  }, [currentDir]);

  const loadStorageStats = () => {
    const total = Paths.totalDiskSpace;
    const available = Paths.availableDiskSpace;
    setStats({ total, available, used: total - available });
  };

  const loadDirectoryContents = () => {
    try {
      if (!currentDir.exists) currentDir.create();
      setItems(currentDir.list());
    } catch (error) {
      console.error("Помилка зчитування:", error);
    }
  };

  const handleItemPress = async (item) => {
    if (item instanceof Directory) {
      setCurrentDir(item);
    } else {
      try {
        const content = await item.text();
        setEditingFile(item);
        setEditingContent(content);
        setEditModalVisible(true);
      } catch (error) {
        Alert.alert("Помилка зчитування", error.message);
      }
    }
  };

  // --- НОВА ЛОГІКА: ДОВГЕ НАТИСКАННЯ ---
  const handleItemLongPress = (item) => {
    Alert.alert(
        "Дії з об'єктом",
        `Що ви хочете зробити з "${item.name}"?`,
        [
          { text: "Інформація", onPress: () => showItemInfo(item) },
          { text: "Видалити", onPress: () => deleteItem(item), style: "destructive" },
          { text: "Скасувати", style: "cancel" }
        ]
    );
  };

  // Завдання 6: Детальна інформація
  const showItemInfo = (item) => {
    try {
      const info = item.info(); // Отримуємо метадані об'єкта
      const isDir = item instanceof Directory;

      let infoString = `Назва: ${item.name}\n`;
      infoString += `Тип: ${isDir ? 'Папка' : 'Файл'}\n`;
      if (!isDir) {
        infoString += `Розмір: ${formatBytes(item.size)}\n`;
        infoString += `Розширення: ${item.extension}\n`;
      }

      // Конвертуємо час модифікації (unix timestamp) у зручний формат
      if (info.modificationTime) {
        const date = new Date(info.modificationTime);
        infoString += `Змінено: ${date.toLocaleString()}\n`;
      }

      infoString += `Шлях: .../${currentDir.name}/${item.name}`;

      Alert.alert("Деталі", infoString);
    } catch (error) {
      Alert.alert("Помилка", error.message);
    }
  };

  // Завдання 5: Видалення
  const deleteItem = (item) => {
    try {
      item.delete(); // ООП-метод видалення
      loadDirectoryContents(); // Оновлюємо список
      loadStorageStats(); // Оновлюємо пам'ять
    } catch (error) {
      Alert.alert("Помилка видалення", error.message);
    }
  };

  const goBack = () => {
    if (currentDir.uri !== Paths.document.uri) {
      setCurrentDir(currentDir.parentDirectory);
    }
  };

  const openCreateModal = (type) => {
    setCreateType(type);
    setInputName('');
    setInputContent('');
    setModalVisible(true);
  };

  const handleCreate = () => {
    if (!inputName.trim()) {
      Alert.alert('Помилка', 'Введіть назву!');
      return;
    }

    try {
      if (createType === 'folder') {
        const newDir = new Directory(currentDir, inputName.trim());
        if (!newDir.exists) newDir.create();
        else Alert.alert('Помилка', 'Папка вже існує!');
      } else {
        let fileName = inputName.trim();
        if (!fileName.endsWith('.txt')) fileName += '.txt';
        const newFile = new File(currentDir, fileName);
        if (!newFile.exists) newFile.write(inputContent);
        else Alert.alert('Помилка', 'Файл вже існує!');
      }
      loadDirectoryContents();
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Помилка створення', error.message);
    }
  };

  const handleSaveFile = () => {
    try {
      editingFile.write(editingContent);
      setEditModalVisible(false);
      setEditingFile(null);
      loadDirectoryContents();
      Alert.alert("Успіх", "Файл успішно збережено!");
    } catch (error) {
      Alert.alert("Помилка збереження", error.message);
    }
  };

  const renderItem = ({ item }) => {
    const isDir = item instanceof Directory;
    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleItemPress(item)}
            onLongPress={() => handleItemLongPress(item)} // Додано обробник довгого натискання
        >
          <Text style={styles.itemIcon}>{isDir ? '📁' : '📄'}</Text>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            {!isDir && <Text style={styles.itemSize}>{formatBytes(item.size)}</Text>}
          </View>
        </TouchableOpacity>
    );
  };

  return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Пам'ять пристрою</Text>
          <Text>Всього: {formatBytes(stats.total)} | Зайнято: {formatBytes(stats.used)}</Text>
          <Text>Вільно: {formatBytes(stats.available)}</Text>
        </View>

        <View style={styles.navContainer}>
          <TouchableOpacity
              style={[styles.backButton, currentDir.uri === Paths.document.uri && styles.disabledButton]}
              onPress={goBack}
              disabled={currentDir.uri === Paths.document.uri}
          >
            <Text style={styles.backButtonText}>⬅ Назад</Text>
          </TouchableOpacity>
          <Text style={styles.currentPathText} numberOfLines={1} ellipsizeMode="head">
            .../{currentDir.name}
          </Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => openCreateModal('folder')}>
            <Text style={styles.actionBtnText}>+ Нова папка</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.actionBtnFile]} onPress={() => openCreateModal('file')}>
            <Text style={styles.actionBtnText}>+ Новий файл</Text>
          </TouchableOpacity>
        </View>

        <FlatList
            data={items}
            keyExtractor={(item) => item.uri}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={styles.emptyText}>Папка порожня</Text>}
            contentContainerStyle={styles.listContent}
        />

        {/* Модальне вікно СТВОРЕННЯ */}
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {createType === 'folder' ? 'Створити папку' : 'Створити файл .txt'}
              </Text>

              <TextInput
                  style={styles.input}
                  placeholder={createType === 'folder' ? 'Назва папки...' : 'Назва файлу...'}
                  value={inputName}
                  onChangeText={setInputName}
              />

              {createType === 'file' && (
                  <TextInput
                      style={[styles.input, styles.textArea]}
                      placeholder="Вміст файлу..."
                      value={inputContent}
                      onChangeText={setInputContent}
                      multiline={true}
                  />
              )}

              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelBtnText}>Скасувати</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalBtn, styles.confirmBtn]} onPress={handleCreate}>
                  <Text style={styles.confirmBtnText}>Створити</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Модальне вікно РЕДАГУВАННЯ */}
        <Modal visible={editModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {editingFile ? editingFile.name : ''}
              </Text>

              <TextInput
                  style={[styles.input, styles.textArea, { height: 200 }]}
                  value={editingContent}
                  onChangeText={setEditingContent}
                  multiline={true}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={() => setEditModalVisible(false)}>
                  <Text style={styles.cancelBtnText}>Закрити</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalBtn, styles.confirmBtn]} onPress={handleSaveFile}>
                  <Text style={styles.confirmBtnText}>Зберегти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  statsContainer: { padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#ddd' },
  statsTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  navContainer: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#e9ecef' },
  backButton: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#007bff', borderRadius: 5, marginRight: 10 },
  disabledButton: { backgroundColor: '#ccc' },
  backButtonText: { color: '#fff', fontWeight: 'bold' },
  currentPathText: { flex: 1, fontSize: 16, color: '#333' },
  actionRow: { flexDirection: 'row', padding: 10, justifyContent: 'space-around', backgroundColor: '#fff' },
  actionBtn: { backgroundColor: '#28a745', padding: 10, borderRadius: 8, flex: 0.45, alignItems: 'center' },
  actionBtnFile: { backgroundColor: '#17a2b8' },
  actionBtnText: { color: '#fff', fontWeight: 'bold' },
  listContent: { padding: 15 },
  itemContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
  itemIcon: { fontSize: 24, marginRight: 15 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: '500' },
  itemSize: { fontSize: 12, color: '#666', marginTop: 2 },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 50, fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#fff', padding: 20, borderRadius: 10, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15, backgroundColor: '#f9f9f9' },
  textArea: { height: 80, textAlignVertical: 'top' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  modalBtn: { flex: 0.48, padding: 12, borderRadius: 5, alignItems: 'center' },
  cancelBtn: { backgroundColor: '#f8d7da' },
  cancelBtnText: { color: '#721c24', fontWeight: 'bold' },
  confirmBtn: { backgroundColor: '#007bff' },
  confirmBtnText: { color: '#fff', fontWeight: 'bold' },
});