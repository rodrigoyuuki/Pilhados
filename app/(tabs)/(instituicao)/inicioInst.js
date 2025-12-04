import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabBar from '../../../components/tabBarInst';
import HeaderInst from '../../../components/headerInst';
import Drawer from '../../../components/drawerInst';
import ServiceCard from '../../../components/serviceCard';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebaseConfig";

function Header({ onMenuPress }) {
    return <HeaderInst onMenuPress={onMenuPress} />;
}

function ColetaCard({ ag }) {
    return (
        <View style={styles.coletaCard}>
            <Text style={styles.coletaHeader}>Coleta dia {ag.data}</Text>

            <View style={styles.coletaInfo}>
                <Text style={styles.coletaLabel}>Material:</Text>
                <Text style={styles.coletaText}>{ag.residueType}</Text>
            </View>

            <View style={styles.coletaInfo}>
                <Text style={styles.coletaLabel}>Horário:</Text>
                <Text style={styles.coletaText}>{ag.horario}</Text>
            </View>

            <View style={styles.coletaInfo}>
                <Text style={styles.coletaLabel}>Município:</Text>
                <Text style={styles.coletaText}>{ag.municipio}</Text>
            </View>

            <View style={styles.coletaInfo}>
                <Text style={styles.coletaLabel}>Rua:</Text>
                <Text style={styles.coletaText}>
                    {ag.rua} <Text style={{ fontWeight: 'bold' }}>Nº</Text> {ag.numero}
                </Text>
            </View>

            <View style={styles.coletaInfo}>
                <Text style={styles.coletaLabel}>Quantidade:</Text>
                <Text style={styles.coletaText}>{ag.quantity}</Text>
            </View>

            {ag.descricao && (
                <>
                    <Text style={styles.coletaDescriptionLabel}>Descrição:</Text>
                    <Text style={styles.coletaDescriptionText}>{ag.descricao}</Text>
                </>
            )}
        </View>
    );
}

export default function inicioInst() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);

    useEffect(() => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        const q = query(
            collection(db, "agendamentos"),
            where("userId", "==", uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const lista = [];
            snapshot.forEach((doc) => lista.push({ id: doc.id, ...doc.data() }));
            setAgendamentos(lista);
        });

        return () => unsubscribe();
    }, []);

    const toggleDrawer = () => {
        if (!isDrawerVisible) setShouldRenderDrawer(true);
        setIsDrawerVisible(!isDrawerVisible);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header onMenuPress={toggleDrawer} />

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <ServiceCard />

                <Text style={styles.coletaTitle}>COLETAS ANTERIORES</Text>

                {agendamentos.map((ag) => (
                    <ColetaCard key={ag.id} ag={ag} />
                ))}

                {agendamentos.length === 0 && (
                    <Text style={{ textAlign: "center", marginTop: 30, color: "#666" }}>
                        Nenhuma agendamento realizado.
                    </Text>
                )}
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
        backgroundColor: '#148311'
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 130,
        backgroundColor: '#f5f5f5',
        height: '100%'
    },
    coletaTitle: {
        fontSize: 19,
        color: '#0e670b',
        alignSelf: 'flex-start',
        paddingLeft: 30,
        paddingBottom: 20,
        fontFamily: 'PoppinsSemiBoldItalic'
    },
    coletaCard: {
        width: '90%',
        backgroundColor: '#f8ffe3',
        borderRadius: 20,
        padding: 25,
        marginBottom: 20,
        elevation: 3,
    },
    coletaHeader: {
        fontSize: 18,
        color: '#148311',
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'PoppinsSemiBoldItalic'
    },
    coletaInfo: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    coletaLabel: {
        fontSize: 14,
        color: '#555555',
        marginRight: 5,
        fontFamily: 'PoppinsBold'
    },
    coletaText: {
        fontSize: 16,
        color: '#555',
    },
    coletaDescriptionLabel: {
        fontSize: 15,
        color: '#333',
        marginTop: 15,
        marginBottom: 5,
        fontFamily: 'PoppinsBold'
    },
    coletaDescriptionText: {
        fontSize: 15,
        color: '#555',
        fontFamily: 'PoppinsRegular'
    }
});