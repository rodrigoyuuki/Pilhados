import React, { useState, useEffect, useRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function App() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const scrollViewRef = useRef(null);
    const [indexAtual, setIndexAtual] = useState(0);
    const telaWidth = Dimensions.get('window').width;

    const cardContainerWidth = telaWidth * 0.9;
    const paddingCardContainer = 24 * 2;
    const cardInnerWidth = cardContainerWidth - paddingCardContainer;

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

    const handleScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / cardInnerWidth);
        setIndexAtual(index);
    };

    const handleDotPress = (index) => {
        scrollViewRef.current?.scrollTo({ x: index * cardInnerWidth, animated: true });
        setIndexAtual(index);
    };

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <TouchableOpacity
                    onPress={handleGoBack}
                    style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#0e670b" />
                </TouchableOpacity>

                <Text style={styles.cardTitle}>{params.title}</Text>
                <View style={styles.contentArea}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: params.image }} style={styles.cardImage} />
                    </View>

                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        contentContainerStyle={{ alignItems: 'flex-start' }}
                    >
                        {sectionTitle.map((title, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        width: cardInnerWidth,
                                        paddingVertical: 10,
                                        paddingHorizontal: 20
                                    }} >
                                    <Text style={styles.sectionTitle}>{title}</Text>
                                    <Text style={styles.textContent}>{sectionText[index]}</Text>
                                </View>
                            );
                        })}
                    </ScrollView>

                    <View style={styles.dotNav}>
                        {sectionTitle.map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.dot, indexAtual === index && styles.activeDot]}
                                onPress={() => handleDotPress(index)}
                            />
                        ))}
                    </View>
                </View>
            </View >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2ffcb',
        alignItems: 'center',
        paddingVertical: 80,
    },
    cardContainer: {
        width: '90%',
        backgroundColor: '#0e670b',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingVertical: 30,
        paddingHorizontal: 24,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: '#f8ffe3',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 33,
        height: 33
    },
    cardTitle: {
        fontSize: 20,
        color: '#f8ffe3',
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 16,
        fontFamily: 'PoppinsBold',
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
    textContent: {
        width: '100%',
        textAlign: 'justify',
        color: '#f8ffe3',
        fontSize: 12,
        fontFamily: 'PoppinsRegular'
    },
    sectionTitle: {
        fontSize: 18,
        color: '#f8ffe3',
        marginBottom: 8,
        fontFamily: 'PoppinsItalic',
    },
    dotNav: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: '#f8ffe3',
        borderRadius: 6,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#9ccc60',
    },
});