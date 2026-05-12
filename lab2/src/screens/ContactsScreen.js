import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { CONTACTS_DATA } from '../data/dummyData';

export default function ContactsScreen() {
    // Рендер одного рядка (імені)
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
        </View>
    );

    // Рендер заголовка секції (літери алфавіту)
    const renderSectionHeader = ({ section: { title } }) => (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    );

    // НОВЕ: Компонент-розділювач між контактами
    const renderSeparator = () => <View style={styles.separator} />;

    return (
        <View style={styles.container}>
            <SectionList
                sections={CONTACTS_DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                // НОВЕ: Підключаємо розділювач згідно з методичкою
                ItemSeparatorComponent={renderSeparator}
                stickySectionHeadersEnabled={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    headerContainer: { backgroundColor: '#e0e0e0', paddingVertical: 8, paddingHorizontal: 15 },
    headerText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    // Прибрали borderBottom, бо тепер є окремий розділювач
    itemContainer: { padding: 15 },
    itemText: { fontSize: 16, color: '#000' },
    // НОВЕ: Стиль для розділювача
    separator: { height: 1, backgroundColor: '#f0f0f0', marginLeft: 15 },
});