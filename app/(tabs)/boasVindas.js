import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function boasvindas() {
    const router = useRouter();

    function handleNavigation(screen) {
        if (screen === 'inicio') {
            router.push('inicio');
        } else if (screen === 'servicos-privados') {
            router.push('servicos-privados');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.welcomeText}>Bem vindo(a)!</Text>

                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                />

                <Text style={styles.optionText}>Selecione uma opção:</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('login')}>
                    <Ionicons name="earth" size={24} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Serviços públicos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('/(instituicao)/loginInst')}>
                    <Ionicons name="business" size={24} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Serviços privados</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 50,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 50,
    },
    optionText: {
        fontSize: 18,
        color: '#555',
        marginBottom: 20,
    },
    button: {
        width: '85%',
        height: 80,
        backgroundColor: '#148311',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    icon: {
        marginRight: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});
