import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabBar(){

        const router = useRouter();
        return (
            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabItem} onPress={() => router.push('inicio')}>
                    <Ionicons name="home" size={27} color="#fff" />
                    <Text style={styles.tabText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => router.push('dicas')}>
                    <Ionicons name="bulb-outline" size={27} color="#fff" />
                    <Text style={styles.tabText}>Dicas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => router.push('historico')}>
                    <AntDesign name="clock-circle" size={24} color="#fff" />
                    <Text style={styles.tabText}>Histórico</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => router.push('agendamento')}>
                    <Ionicons name="calendar-outline" size={27} color="#fff" />
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
        fontSize: 10,
        color: '#fff',
        marginTop: 5,
        fontFamily: 'PoppinsRegular'
    },
})