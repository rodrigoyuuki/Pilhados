import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function TabBar(){

        const router = useRouter();
        return (
            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabItem} onPress={() => router.push('inicio')}>
                    <Ionicons name="home" size={27} color="#e3ff92" />
                    <Text style={styles.tabText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="bulb-outline" size={27} color="#e3ff92" />
                    <Text style={styles.tabText}>Dicas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => router.push('agendamento')}>
                    <Ionicons name="calendar-outline" size={27} color="#e3ff92" />
                    <Text style={styles.tabText}>Calendário</Text>
                </TouchableOpacity>
            </View>
        );
}

const styles = StyleSheet.create({
     tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 120,
        backgroundColor: '#148311',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingLeft: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '40'
    },
    tabText: {
        fontSize: 12,
        color: '#e3ff92',
        marginTop: 5,
    },
})