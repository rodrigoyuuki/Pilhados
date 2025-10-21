import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useLocalSearchParams } from 'expo-router';

export default function NewsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

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
                        <Ionicons name="chevron-back" size={24} color="#fff" />
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
        top: 16,
        left: 16,
        backgroundColor: '#0e670b',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 33,
        height: 33
    },
    newsTitle: {
        fontSize: 17,
        color: '#148311',
        marginBottom: 10,
        marginTop: 15,
        fontFamily: 'PoppinsSemiBoldItalic',
        textAlign: 'center',
    },
    newsContent: {
        fontSize: 13,
        color: '#333',
        marginBottom: 20,
        fontFamily: 'PoppinsRegular',
        textAlign: 'justify',
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
    dateText: {
        fontSize: 12,
        color: '#888',
        marginLeft: 10,
        fontFamily: 'PoppinsRegular'
    },
    fullContent: {
        fontSize: 13,
        lineHeight: 20,
        color: '#333',
        fontFamily: 'PoppinsRegular',
        textAlign: 'justify',
    },
});
