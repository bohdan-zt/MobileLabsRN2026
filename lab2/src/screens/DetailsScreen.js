import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function DetailsScreen({ route }) {
    // Дістаємо об'єкт новини, який ми передали через параметри навігації
    const { newsItem } = route.params;

    return (
        <ScrollView style={styles.container}>
            {/* Виводимо картинку на всю ширину */}
            <Image source={{ uri: newsItem.image }} style={styles.image} />
            <View style={styles.content}>
                {/* Виводимо заголовок та повний текст новини */}
                <Text style={styles.title}>{newsItem.title}</Text>
                <Text style={styles.description}>{newsItem.description}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    image: { width: '100%', height: 250, resizeMode: 'cover' },
    content: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' },
    description: { fontSize: 16, color: '#444', lineHeight: 24 },
});