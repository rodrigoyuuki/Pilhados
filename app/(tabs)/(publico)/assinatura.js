import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

// Obtém a largura da tela para cálculos de alinhamento
const { width } = Dimensions.get('window');

export default function Sobrenos() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    const benefits = [
        'Agendamento fixo;',
        'Praticidade;',
        'Organização e prevenção de acúmulo;',
        'Pensado para condomínios e empresas.',
    ];

    const renderBenefits = () => (
        <View style={styles.topics}>
            {benefits.map((benefit, index) => (
                // O contêiner de cada item (pointItem) garante o ícone e o texto lado a lado.
                <View key={index} style={styles.pointItem}>
                    {/* Ícone menor, cor do checkmark mais clara */}
                    <Ionicons name="checkmark-circle" size={18} color="#6ac259" /> 
                    
                    {/* O texto é o estilo que se parece com o corpo do texto na imagem */}
                    <Text style={styles.benefitText}>{benefit}</Text>
                </View>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            {/* O header é simplificado e centralizado como na imagem */}
            <View style={styles.header}>
                {/* O título 'Mensal' da imagem é o texto principal, não no Header */}
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                
                {/* 1. Título 'Mensal' */}
                <Text style={styles.mainTitle}>Mensal</Text>

                {/* 2. Bloco de Preço */}
                <View style={styles.priceContainer}>
                    <Text style={styles.currencySymbol}>R$</Text>
                    <Text style={styles.price}>0,00</Text>
                </View>
                <Text style={styles.perMonth}>
                    Por mês
                </Text>

                {/* 3. Texto de Benefícios */}
                <Text style={styles.text}>
                    Possua nosso <Text style={styles.boldText}>plano mensal</Text> e
                    tenha acesso a diversos <Text style={styles.boldText}>benefícios</Text>, como:
                </Text>
                {renderBenefits()}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buyButton}>
                        <Text style={styles.buyButtonText}>Comprar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('inicio')}>
                        <Text style={styles.noInterestText}>Não tenho interesse</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 50, 
        paddingTop: 30,
    },
    scrollViewContent: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 30,
        color: '#4a4a4a',
        fontFamily: 'PoppinsBold',
        marginBottom: 30,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start', 
    },
    currencySymbol: {
        fontSize: 18,
        fontFamily: 'PoppinsBold',
        color: '#148311',
        marginRight: 2,
        alignSelf: 'flex-start',
        marginTop: 5,
    },
    price: {
        fontSize: 45,
        fontFamily: 'PoppinsBold',
        color: '#148311'
    },
    perMonth: {
        fontSize: 15,
        fontFamily: 'PoppinsRegular', 
        color: '#737373',
        marginBottom: 30,
    },
    text: {
        fontSize: 15,
        fontFamily: 'PoppinsRegular',
        color: '#4a4a4a',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 20,
    },
    boldText: {
        fontFamily: 'PoppinsBold',
    },
    topics: {
        width: width * 0.7, 
        alignItems: 'flex-start', 
        marginBottom: 60,
    },
    pointItem: {
        flexDirection: 'row',
        alignItems: 'center', 
        marginBottom: 10, 
    },
    benefitText: { 
        fontSize: 15,
        fontFamily: 'PoppinsRegular',
        color: '#4a4a4a',
        marginLeft: 10,
        flexShrink: 1,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    buyButton: {
        width: '60%',
        height: 50,
        backgroundColor: '#148311',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'PoppinsBold',
        textAlign: 'center',
    },
    noInterestText: {
        color: '#737373',
        fontSize: 14,
        fontFamily: 'PoppinsRegular',
        textDecorationLine: 'underline',
    },
});