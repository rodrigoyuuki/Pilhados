import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import CustomModal from '../../../components/alerts';
import Drawer from '../../../components/drawer';
import TabBar from '../../../components/tabBarInst';

function Header({ onMenuPress }) {
    const router = useRouter();
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

function ServiceCard({ onPress }) {
    return (
        <View style={styles.serviceCard}>
            <Text style={styles.serviceText}>Agende sua coleta aqui!</Text>
            <TouchableOpacity
                style={styles.serviceButton}
                onPress={onPress}>
                <Text style={styles.serviceButtonText}>Contratar serviço</Text>
            </TouchableOpacity>
        </View>
    );
}

function ColetaCard({ data, material, horario, responsavel, descricao }) {
    return (
        <View style={styles.coletaCard}>
            <Text style={styles.coletaHeader}>{data}</Text>
            <View style={styles.coletaInfo}>
                <Text style={styles.coletaLabel}>Material:</Text>
                <Text style={styles.coletaText}>{material}</Text>
            </View>
            <View style={styles.coletaInfo}>
                <Text style={styles.coletaLabel}>Data:</Text>
                <Text style={styles.coletaText}>{data}</Text>
            </View>
            <View style={styles.coletaInfo}>
                <Text style={styles.coletaLabel}>Horário:</Text>
                <Text style={styles.coletaText}>{horario}</Text>
            </View>
            <View style={styles.coletaInfo}>
                <Text style={styles.coletaLabel}>Responsável:</Text>
                <Text style={styles.coletaText}>{responsavel}</Text>
            </View>
            <Text style={styles.coletaDescriptionLabel}>Descrição:</Text>
            <Text style={styles.coletaDescriptionText}>{descricao}</Text>
        </View>
    );
}

export default function inicioInst() {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState(null);

    const toggleDrawer = () => {
        if (!isDrawerVisible) {
            setShouldRenderDrawer(true);
        }
        setIsDrawerVisible(!isDrawerVisible);
    };

    const handlePressAgendar = () => {
        setModalVisible(true);
        setMessage("Aguardando agendamento...");
    };

    return (
        <SafeAreaView style={styles.container}>
            <CustomModal
                visible={modalVisible}
                message={message}
                onClose={() => setModalVisible(false)}
            />
            <Header onMenuPress={toggleDrawer} />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <ServiceCard onPress={handlePressAgendar} />
                <Text style={styles.coletaTitle}>COLETAS ANTERIORES</Text>
                <ColetaCard
                    data="08 de agosto"
                    material="pilhas e baterias"
                    horario="09:16"
                    responsavel="Rafael Prado"
                    descricao="coleta realizada com o objetivo de remover pilhas e baterias usadas e quebradas."
                />
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
        paddingBottom: 130,
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
    coletaTitle: {
        fontSize: 20,
        color: '#0e670b',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingLeft: 30,
        paddingBottom: 20,
    },
    coletaCard: {
        width: '90%',
        backgroundColor: '#f8ffe3',
        borderRadius: 20,
        padding: 25,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    coletaHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#148311',
        marginBottom: 15,
        textAlign: 'center',
        fontStyle: 'italic'
    },
    coletaInfo: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    coletaLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
        marginRight: 5,
    },
    coletaText: {
        fontSize: 16,
        color: '#555',
    },
    coletaDescriptionLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
        marginTop: 15,
        marginBottom: 5,
    },
    coletaDescriptionText: {
        fontSize: 16,
        color: '#555',
    },
});