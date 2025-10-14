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
import Drawer from '../../../components/drawer';
import TabBar from '../../../components/tabBar';

function Header({ onMenuPress }) {
    const router = useRouter();
    const { noticia } = router.params;

    if (!noticia) {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'white' }}>Opção não encontrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.header}>
            <View style={styles.headerTopRow}>
                <TouchableOpacity onPress={onMenuPress}>
                    <Ionicons name="menu" size={40} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('perfil')}>
                    <Ionicons name="person-circle" size={40} color="#fff" />
                </TouchableOpacity>
            </View>
            <Text style={styles.headerTitle}>Olá, bem vindo ao PILHADOS!</Text>
        </View>
    );
}

function ServiceCard() {
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

export default function Inicio() {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);

    const toggleDrawer = () => {
        if (!isDrawerVisible) {
            setShouldRenderDrawer(true);
        }
        setIsDrawerVisible(!isDrawerVisible);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header onMenuPress={toggleDrawer} />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <ServiceCard />

                <View style={styles.newsCard}>
                    <Text style={styles.newsTitle}>{noticia.title}</Text>
                    <Text style={styles.newsContent}>{noticia.content}</Text>

                    <TouchableOpacity style={styles.readMoreButton} onPress={() => router.push('noticia')}>
                        <Text style={styles.readMoreText}>Ler mais</Text>
                        <Ionicons name="add-circle" size={20} color="#f8ffe3" style={styles.readMoreIcon} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <TabBar />
            {shouldRenderDrawer && (
                <Drawer
                    isVisible={isDrawerVisible}
                    onClose={toggleDrawer}
                    setShouldRenderDrawer={setShouldRenderDrawer}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 40,
        backgroundColor: '#148311',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 16,
        color: '#fff',
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 100,
    },
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
    newsCard: {
        width: '90%',
        backgroundColor: '#edffb9',
        borderRadius: 20,
        padding: 25,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4ca444',
        marginBottom: 10,
    },
    newsContent: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
    },
    readMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4ca444',
        paddingVertical: 10,
        borderRadius: 10,
    },
    readMoreText: {
        color: '#f8ffe3',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
    },
    readMoreIcon: {
        marginTop: 2,
    },
    partnerCard: {
        width: '90%',
        backgroundColor: '#d8f0d8',
        borderRadius: 20,
        padding: 25,
    },
    partnerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#148311',
        marginBottom: 10,
    },
    partnerContent: {
        fontSize: 14,
        color: '#555',
    },
});
