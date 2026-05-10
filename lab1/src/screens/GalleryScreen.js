import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

// Створюємо масив з 10 порожніх елементів для сітки
const GALLERY_DATA = Array.from({ length: 10 }).map((_, index) => ({
    id: String(index),
}));

export default function GalleryScreen() {
    const renderItem = ({ item }) => (
        <View style={styles.card} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={GALLERY_DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2} // Головна фішка цього екрана — 2 колонки
                columnWrapperStyle={styles.row} // Стилізуємо простір між колонками
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    card: {
        flex: 1, // Дозволяє карткам розтягуватися рівномірно
        aspectRatio: 1.5, // Робить їх прямокутними, як на макеті
        marginHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd', // Сіра рамка
    },
});