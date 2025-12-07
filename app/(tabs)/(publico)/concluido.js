import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';
import { useLocalSearchParams } from "expo-router";
import { db, auth } from '../../../firebase/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const screenWidth = Dimensions.get('window').width;

export default function Concluido() {
    const {
        data,
        horario,
        municipio,
        cep,
        rua,
        numero,
        residueType,
        quantity,
        tipoUsuario
    } = useLocalSearchParams();
    const router = useRouter();
    const positionX = useSharedValue(screenWidth);

    useEffect(() => {
        positionX.value = withTiming(0, { duration: 300 });

        salvarAgendamento();
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

    const salvarAgendamento = async () => {
        try {
            await addDoc(collection(db, "agendamentos"), {
                data,
                horario,
                municipio,
                cep,
                rua,
                numero,
                residueType,
                quantity,
                tipoUsuario,
                criadoEm: Timestamp.now(),
                userId: auth.currentUser ? auth.currentUser.uid : null
            });

            console.log("Agendamento salvo com sucesso!");
        } catch (error) {
            console.log("Erro ao salvar no Firestore:", error);
        }
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
                        onPress={() => {
                            if (tipoUsuario === "comum") {
                                router.replace("inicio");
                            } else {
                                router.replace("inicioInst");
                            }
                        }}
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
        fontSize: 22,
        textAlign: 'center',
        color: '#555555',
        marginBottom: 50,
        fontFamily: 'PoppinsBold'
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
        fontSize: 16,
        marginLeft: 10,
        fontFamily: 'PoppinsRegular'
    },
    homeButton: {
        width: '70%',
        height: 50,
        backgroundColor: '#148311',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'PoppinsRegular'
    },
});