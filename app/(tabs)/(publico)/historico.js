import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Drawer from '../../../components/drawer';
import TabBar from '../../../components/tabBar';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { auth } from "../../../firebase/firebaseConfig";
import { Feather, Ionicons } from '@expo/vector-icons';

export default function Historico() {
    const router = useRouter();

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
            snapshot.forEach((doc) => {
                lista.push({ id: doc.id, ...doc.data() });
            });
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

            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.headerTopRow}>
                    <TouchableOpacity onPress={toggleDrawer}>
                        <Feather name="menu" size={35} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('perfil')}>
                        <Ionicons name="person-circle" size={40} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* CONTEÚDO */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {agendamentos.map((ag) => (
                    <View key={ag.id} style={styles.card}>
                        <Text style={styles.title}>Coleta dia {ag.data}</Text>

                        <Text style={styles.item}>
                            <Text style={{ fontWeight: 'bold' }}>Material:</Text> {ag.residueType}
                        </Text>
                        <Text style={styles.item}>
                            <Text style={{ fontWeight: 'bold' }}>Data: dia</Text> {ag.data}
                        </Text>
                        <Text style={styles.item}>
                            <Text style={{ fontWeight: 'bold' }}>Horário: </Text> {ag.horario}
                        </Text>
                        <Text style={styles.item}>
                            <Text style={{ fontWeight: 'bold' }}>Município: </Text> {ag.municipio}
                        </Text>
                        <Text style={styles.item}>
                            <Text style={{ fontWeight: 'bold' }}>Rua:</Text> {ag.rua},
                            <Text style={{ fontWeight: 'bold' }}> Nº:</Text> {ag.numero}
                        </Text>
                        <Text style={styles.item}>
                            <Text style={{ fontWeight: 'bold' }}>Quantidade: </Text> {ag.quantity}
                        </Text>
                    </View>
                ))}

                {agendamentos.length === 0 && (
                    <Text style={{ textAlign: "center", marginTop: 40, color: '#666' }}>
                        Nenhum agendamento realizado.
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
        paddingBottom: 150,
        backgroundColor: '#f5f5f5',
    },
    card: {
        width: "85%",
        backgroundColor: "#f8ffe3",
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        color: "#4ca444",
        marginBottom: 10,
        fontFamily: 'PoppinsSemiBoldItalic',
        textAlign: "center",
    },
    item: {
        fontSize: 14,
        color: "#555555",
        marginBottom: 5,
    },
    header: {
        paddingTop: 40,
        paddingBottom: 40,
        paddingHorizontal: 35,
        backgroundColor: '#148311',
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
});