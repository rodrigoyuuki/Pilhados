import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Drawer from '../../../components/drawer';
import TabBar from '../../../components/tabBar';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import {Ionicons, Feather, Entypo} from '@expo/vector-icons';

export default function Historico() {
    const router = useRouter();

    const [listaNoticias, setListaNoticias] = useState([]);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);

    function infoNoticias(doc) {
        const data = doc.data();
        return {
            id: doc.id,
            content: data.content,
            createdAt: data.createdAt,
            imageUri: data.imageUri,
            summary: data.summary,
            title: data.title,
        };
    }

    async function getDados() {
        const noticias = [];
        try {
            const docRef = collection(db, "noticias");
            const snapshot = await getDocs(docRef);

            snapshot.forEach((doc) => {
                const noticia = infoNoticias(doc);
                noticias.push(noticia);
            });
            setListaNoticias(noticias);
        } catch (err) {
            console.error("Erro ao carregar notícias:", err);
        }
    }
    useEffect(() => {
        getDados();
    }, []);

    const toggleDrawer = () => {
        if (!isDrawerVisible) {
            setShouldRenderDrawer(true);
        }
        setIsDrawerVisible(!isDrawerVisible);
    };

    return (
        <SafeAreaView style={styles.container}>
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

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {listaNoticias.map((noticia) => (
                    <View key={noticia.id} style={styles.newsCard}>
                        <Text style={styles.newsTitle}>{noticia.title}</Text>
                        <Text style={styles.newsContent}>{noticia.summary}</Text>
                        <TouchableOpacity
                            style={styles.readMoreButton}
                            onPress={() => router.push({
                                pathname: '/noticia',
                                params: {
                                    id: noticia.id,
                                    title: noticia.title,
                                    content: noticia.content,
                                    imageUri: noticia.imageUri,
                                    summary: noticia.summary,
                                    createdAt: noticia.createdAt
                                }
                            })}>
                            <Text style={styles.readMoreText}>Ler mais</Text>
                            <Entypo name="plus" size={24} color="#f8ffe3" />
                        </TouchableOpacity>
                    </View>
                ))}
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
    scrollViewContent: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 150,
    },
    newsCard: {
        width: '80%',
        backgroundColor: '#edffb9',
        padding: 25,
        marginBottom: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    newsTitle: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#4ca444',
        marginBottom: 10,
        textAlign: 'center'
    },
    newsContent: {
        fontSize: 13,
        color: '#555',
        marginBottom: 20,
        textAlign: 'justifye'
    },
    readMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4ca444',
        paddingVertical: 13,
        borderRadius: 15,
    },
    readMoreText: {
        color: '#f8ffe3',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
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
    headerTitle: {
        fontSize: 16,
        color: '#fff',
    },
});
