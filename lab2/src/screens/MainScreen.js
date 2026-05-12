import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Image
} from 'react-native';
import { INITIAL_NEWS } from '../data/dummyData';

export default function MainScreen({ navigation }) {
    // Стейт для списку новин
    const [news, setNews] = useState(INITIAL_NEWS);
    // Стейт для індикатора Pull-to-Refresh (свайп вниз)
    const [refreshing, setRefreshing] = useState(false);
    // Стейт для індикатора Infinite Scroll (підвантаження знизу)
    const [loadingMore, setLoadingMore] = useState(false);

    // Функція для Pull-to-Refresh
    const handleRefresh = () => {
        setRefreshing(true);
        // Імітуємо затримку мережі 1.5 секунди
        setTimeout(() => {
            setNews([...INITIAL_NEWS]); // "Оновлюємо" до початкового стану
            setRefreshing(false);
        }, 1500);
    };

    // Функція для Infinite Scroll
    const handleLoadMore = () => {
        if (loadingMore) return; // Уникаємо дублювання запитів
        setLoadingMore(true);

        // Імітуємо завантаження нових даних з сервера
        setTimeout(() => {
            const moreNews = Array.from({ length: 5 }).map((_, i) => ({
                id: String(news.length + i + 1),
                title: `Новина ${news.length + i + 1}`,
                description: `Це підвантажена новина номер ${news.length + i + 1}, яка з'явилася завдяки Infinite Scroll.`,
                image: 'https://via.placeholder.com/150/000000/FFFFFF/?text=News'
            }));

            setNews([...news, ...moreNews]); // Додаємо нові новини до існуючих
            setLoadingMore(false);
        }, 1500);
    };

    // Компонент однієї новини в списку
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.newsCard}
            // Переходимо на екран деталей і передаємо об'єкт новини
            onPress={() => navigation.navigate('Details', { newsItem: item })}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                {/* numberOfLines обмежує текст до 2 рядків, додаючи три крапки */}
                <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    // Допоміжні компоненти для FlatList
    const renderSeparator = () => <View style={styles.separator} />;
    const renderHeader = () => <Text style={styles.headerTitle}>Стрічка новин</Text>;
    const renderFooter = () => {
        if (!loadingMore) return <View style={{ height: 20 }} />;
        return <ActivityIndicator size="large" color="#0000ff" style={{ margin: 20 }} />;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={news}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}

                // Візуальні компоненти згідно методички
                ItemSeparatorComponent={renderSeparator}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}

                // Властивості Pull-to-Refresh
                refreshing={refreshing}
                onRefresh={handleRefresh}

                // Властивості Infinite Scroll
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5} // Спрацьовує, коли залишилось 50% екрану до кінця

                // Оптимізації для великих списків
                initialNumToRender={10}
                maxToRenderPerBatch={5}
                windowSize={5}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    headerTitle: { fontSize: 24, fontWeight: 'bold', margin: 15, color: '#333' },
    newsCard: { flexDirection: 'row', backgroundColor: '#fff', padding: 15 },
    image: { width: 80, height: 80, borderRadius: 8, marginRight: 15 },
    textContainer: { flex: 1, justifyContent: 'center' },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#000' },
    description: { fontSize: 14, color: '#666', lineHeight: 20 },
    separator: { height: 1, backgroundColor: '#e0e0e0', marginLeft: 110 },
});