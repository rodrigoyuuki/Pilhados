import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useLocalSearchParams } from 'expo-router';

export default function NewsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    //É AQUI QUE EU PUXO AS INFORMAÇÕES DE INÍCIO, SE QUISER EXIBIR TEM QUE USAR "params" AGORA, NÃO NOTÍCIA

    const handleGoBack = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.newsDetailCard}>
                    <TouchableOpacity
                        onPress={handleGoBack}
                        style={styles.backButton}>
                        <FontAwesome name="chevron-circle-left" size={40} margin={5} color="#148311" />
                    </TouchableOpacity>

                    <Text style={styles.newsTitle}>{params.title}</Text>
                    <Text style={styles.newsContent}>{params.summary}</Text>

                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: params.imageUri }}
                            style={styles.newsImage}
                            resizeMode="cover"
                        />
                    </View>

                    <Text style={styles.dateText}>{params.createdAt}</Text>
                    <Text style={styles.fullContent}>{params.content}</Text>
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
    scrollViewContent: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
    },
    newsDetailCard: {
        width: '90%',
        backgroundColor: '#f8ffe3',
        borderRadius: 20,
        padding: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingTop: 50,
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 1,
    },
    newsTitle: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#148311',
        marginBottom: 10,
        marginTop: 15,
    },
    newsContent: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    newsImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    /*imageCaption: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
        textAlign: 'center',
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 15,
    },
    authorText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#148311',
        marginLeft: 10,
    },*/
    dateText: {
        fontSize: 12,
        color: '#888',
        marginLeft: 10,
    },
    fullContent: {
        fontSize: 14,
        lineHeight: 20,
        color: '#333',
    },
});
