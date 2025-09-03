import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Switch
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

export default function Configuracoes() {
    const router = useRouter();
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

    const handleGoBack = () => {
        router.back();
    };

    const handleLogout = () => {
        console.log("Usuário deslogado");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome name="chevron-circle-left" size={33} margin={5} color="#148311" />
                </TouchableOpacity>
                <Text style={styles.title}>Configurações</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notificações</Text>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>Notificações</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#4ca444" }}
                            thumbColor={isNotificationsEnabled ? "#148311" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setIsNotificationsEnabled(previousState => !previousState)}
                            value={isNotificationsEnabled}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Outros</Text>
                    <TouchableOpacity style={styles.item} onPress={() => console.log('Ajuda e suporte')}>
                        <Text style={styles.itemText}>Ajuda e suporte</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => router.push('boasVindas')}>
                        <Text style={styles.itemText}>Sair</Text>
                        <FontAwesome name="sign-out" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#a6a6a6',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        paddingTop: 25,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        paddingTop: 25,
    },
    scrollViewContent: {
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
});
