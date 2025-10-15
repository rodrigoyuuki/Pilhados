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
import { useLocalSearchParams } from 'expo-router';

export default function App() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const handleGoBack = () => {
        router.back();
    };

    let sectionText = [];
    let sectionTitle = [];

    try {
        sectionText = JSON.parse(params.sectionText);
        sectionTitle = JSON.parse(params.sectionTitle);
    } catch {
        sectionText = [params.sectionText];
        sectionTitle = [params.sectionTitle];
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.cardContainer}>
                    <TouchableOpacity
                        onPress={handleGoBack}
                        style={styles.backButton}>
                        <FontAwesome name="chevron-circle-left" size={33} margin={5} color="#f8ffe3" />
                    </TouchableOpacity>

                    <Text style={styles.cardTitle}>{params.title}</Text>
                    <View style={styles.contentArea}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: params.image }} style={styles.cardImage} />
                        </View>

                        <Text style={styles.sectionTitle}>{sectionTitle[0]}</Text>
                        <View style={styles.mainContent}>
                            <Text style={styles.textContent}>{sectionText[0]}</Text>
                        </View>
                    </View>

                    <View style={styles.dotNav}>
                        <View style={[styles.dot, styles.activeDot]}></View>
                        <View style={styles.dot}></View>
                        <View style={styles.dot}></View>
                        <View style={styles.dot}></View>
                    </View>
                </View>
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
    /*imageCaption: {
        fontSize: 12,
        color: '#f8ffe3',
        marginTop: 8,
        textAlign: 'center',
    },*/
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
