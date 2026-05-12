import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawer(props) {
    return (
        <DrawerContentScrollView {...props}>
            {/* Шапка бокового меню з вашими даними */}
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>Богдан Вигівський</Text>
                <Text style={styles.group}>Група: ЗІПЗ-22-1</Text>
            </View>

            {/* Список пунктів навігації (Новини, Контакти) */}
            <View style={styles.menuItems}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        padding: 20,
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#007bff',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212529',
    },
    group: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 4,
    },
    menuItems: {
        paddingHorizontal: 10,
    }
});