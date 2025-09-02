import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';


function DiscardDetailCard({ title, imageSource, imageCaption, content }) {
    const router = useRouter();
    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => router.back('')} style={styles.backButton}>
                <FontAwesome name="chevron-circle-left" size={33} margin={5} color="#f8ffe3" />
            </TouchableOpacity>

            <Text style={styles.cardTitle}>{title}</Text>

            <View style={styles.contentArea}>
                <View style={styles.imageContainer}>
                    <Image source={imageSource} style={styles.cardImage} />
                    <Text style={styles.imageCaption}>{imageCaption}</Text>
                </View>

                <View style={styles.textContent}>
                    <Text style={styles.sectionTitle}>1. Guarde as pilhas usadas em um recipiente</Text>
                    <Text style={styles.mainContent}>
                        Não misture as pilhas usadas com o lixo comum. O ideal é guardá-las em um recipiente de plástico resistente com tampa, como um pote de sorvete, para evitar vazamentos e contato com outros materiais. Mantenha-as em um local fresco e seco.
                    </Text>
                </View>
            </View>

            <View style={styles.dotNav}>
                <View style={[styles.dot, styles.activeDot]}></View>
                <View style={styles.dot}></View>
                <View style={styles.dot}></View>
                <View style={styles.dot}></View>
            </View>
        </View>
    );
}

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <DiscardDetailCard
                    title="Descarte de pilhas"
                    imageSource={{ uri: 'https://autossustentavel.com/wp-content/uploads/2018/11/battery-1930833_1920-Copia-1.jpg' }}
                    content="Não misture as pilhas usadas com o lixo comum. O ideal é guardá-las em um recipiente de plástico resistente com tampa, como um pote de sorvete, para evitar vazamentos e contato com outros materiais. Mantenha-as em um local fresco e seco."
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2ffcb',
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingVertical: 80,
    },
    cardContainer: {
        width: '90%',
        backgroundColor: '#0e670b',
        borderRadius: 32,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingVertical: 32,
        paddingHorizontal: 24,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 1,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f8ffe3',
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 24,
    },
    contentArea: {
        alignItems: 'center',
        marginBottom: 16,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 16,
        width: '100%',
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderRadius: 16,
    },
    imageCaption: {
        fontSize: 12,
        color: '#f8ffe3',
        marginTop: 8,
        textAlign: 'center',
    },
    textContent: {
        width: '100%',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#f8ffe3',
        marginBottom: 8,
    },
    mainContent: {
        fontSize: 14,
        lineHeight: 20,
        color: '#f8ffe3',
        textAlign: 'center',
        textAlign: 'justify'
    },
    dotNav: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 16,
    },
    dot: {
        width: 12,
        height: 12,
        backgroundColor: '#edffb9',
        borderRadius: 6,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#9ccc60',
    },
});
