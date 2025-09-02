import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;

export default function Concluido() {
    const router = useRouter();
    const positionX = useSharedValue(screenWidth);

    useEffect(() => {
        positionX.value = withTiming(0, { duration: 300 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: positionX.value }],
        };
    });

    const handleBackToHome = () => {
        positionX.value = withTiming(screenWidth, { duration: 300 }, (isFinished) => {
            if (isFinished) {
                runOnJS(router.push)('/');
            }
        });
    };

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="checkmark-circle" size={150} color="#6ac259" />
                    </View>
                    <Text style={styles.message}>
                        Eba, sua coleta foi agendada com sucesso!
                    </Text>

                    <TouchableOpacity style={styles.printButton}>
                        <Ionicons name="print" size={24} color="#148311" />
                        <Text style={styles.printButtonText}>Via do cliente</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => router.push('inicio')}
                    >
                        <Text style={styles.homeButtonText}>Voltar ao início</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        marginBottom: 30,
    },
    message: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#555555',
        marginBottom: 50,
    },
    printButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#148311',
        borderWidth: 1,
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginBottom: 30,
    },
    printButtonText: {
        color: '#148311',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    homeButton: {
        width: '80%',
        height: 50,
        backgroundColor: '#148311',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
