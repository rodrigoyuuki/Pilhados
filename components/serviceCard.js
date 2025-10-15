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

export default function ServiceCard() {
    const router = useRouter();
    return (
        <View style={styles.serviceCard}>
            <Text style={styles.serviceText}>Agende sua coleta aqui!</Text>
            <TouchableOpacity style={styles.serviceButton} onPress={() => router.push('agendamento')}>
                <Text style={styles.serviceButtonText}>Contratar serviço</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    serviceCard: {
        width: '90%',
        backgroundColor: '#f8ffe3',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    serviceText: {
        fontSize: 18,
        color: '#148311',
        marginBottom: 15,
    },
    serviceButton: {
        backgroundColor: '#148311',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 10,
    },
    serviceButtonText: {
        color: '#f8ffe3',
        fontWeight: 'bold',
        fontSize: 16,
    },
})