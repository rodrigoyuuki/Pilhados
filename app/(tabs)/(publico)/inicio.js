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
import ServiceCard from '../../../components/serviceCard';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import HeaderInicio from '../../../components/headerInicio';
import Entypo from '@expo/vector-icons/Entypo';

export default function Inicio() {
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
            <HeaderInicio onMenuPress={toggleDrawer} />

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <ServiceCard />
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
        backgroundColor: '#148311'
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 150,
        backgroundColor: '#f5f5f5',
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
        fontSize: 15,
        color: '#4ca444',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'PoppinsSemiBoldItalic'
    },
    newsContent: {
        fontSize: 12,
        color: '#555',
        marginBottom: 20,
        textAlign: 'justify',
        fontFamily: 'PoppinsRegular'
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
        fontSize: 15,
        marginRight: 5,
        fontFamily: 'PoppinsRegular'
    },
});
