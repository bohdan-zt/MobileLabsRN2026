import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

// Масив з фейковими даними для новин
const NEWS_DATA = Array.from({ length: 8 }).map((_, index) => ({
    id: String(index),
    title: 'Заголовок новини',
    date: 'Дата новини',
    description: 'Короткий текст новини',
}));

export default function HomeScreen() {
    const renderItem = ({ item }) => (
        <View style={styles.newsCard}>
            <View style={styles.imagePlaceholder}>
                {/* Заглушка для картинки */}
                <Text style={{color: '#ccc', fontSize: 24}}>📷</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsDate}>{item.date}</Text>
                <Text style={styles.newsDescription}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Новини</Text>
            <FlatList
                data={NEWS_DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 15 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 15 },
    newsCard: { flexDirection: 'row', marginBottom: 20, alignItems: 'center' },
    imagePlaceholder: { width: 70, height: 70, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginRight: 15, borderRadius: 5 },
    textContainer: { flex: 1 },
    newsTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
    newsDate: { fontSize: 12, color: 'gray', marginBottom: 2 },
    newsDescription: { fontSize: 14, color: '#333' },
});