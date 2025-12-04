import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from "expo-router";

function Header() {
    const router = useRouter();
    return (
        <View style={styles.header}>
            <View style={styles.headerTopRow}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('perfil')}>
                    <Ionicons name="person-circle" size={40} color="#148311" />
                </TouchableOpacity>
            </View>
            <Text style={styles.headerTitle}>Valor final</Text>
        </View>
    );
}

function DetailSection({ icon, title, children }) {
    return (
        <View style={styles.detailSection}>
            <View style={styles.detailHeader}>
                <Ionicons name={icon} size={24} color="#148311" />
                <Text style={styles.detailTitle}>{title}</Text>
            </View>
            <View style={styles.detailContent}>
                {children}
            </View>
        </View>
    );
}

export default function AgendamentoFinalizar() {
    const router = useRouter();
    const [selectedPayment, setSelectedPayment] = useState('creditCard');

    const handleFinalize = () => {
        router.push('confirmation');
    };

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

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.content}>

                    <DetailSection icon="location" title="Endereço">
                        <Text style={styles.detailText}>Rua Argentina, 77</Text>
                        <Text style={styles.detailText}>Parque Pinheiros, 06764-390</Text>
                    </DetailSection>

                    <DetailSection icon="time" title="Data e hora">
                        <Text style={styles.detailText}>Data: 22 de agosto de 2025</Text>
                        <Text style={styles.detailText}>Horário: 15:00</Text>
                    </DetailSection>

                    <DetailSection icon="bar-chart" title="Quantidade">
                        <Text style={styles.detailText}>Tipo: Pilhas</Text>
                        <Text style={styles.detailText}>Quantidade: 22 unidades</Text>
                    </DetailSection>

                    <TouchableOpacity style={styles.paymentButton}>
                        <Text style={styles.paymentButtonText}>Opções de pagamento</Text>
                        <Ionicons name="chevron-forward" size={24} color="#148311" />
                    </TouchableOpacity>

                    <View style={styles.paymentOptions}>
                        <TouchableOpacity
                            style={styles.paymentOption}
                            onPress={() => setSelectedPayment('pix')}
                        >
                            <FontAwesome6 name="pix" size={24} color="#01bdae" />
                            <Text style={styles.paymentOptionText}>Pix</Text>
                            <View style={[styles.radio, selectedPayment === 'pix' && styles.radioSelected]}>
                                {selectedPayment === 'pix' && <View style={styles.radioInnerCircle}></View>}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.paymentOption}
                            onPress={() => setSelectedPayment('creditCard')}
                        >
                            <FontAwesome6 name="credit-card-alt" size={24} color="black" />
                            <Text style={styles.paymentOptionText}>Cartão de crédito</Text>
                            <View style={[styles.radio, selectedPayment === 'creditCard' && styles.radioSelected]}>
                                {selectedPayment === 'creditCard' && <View style={styles.radioInnerCircle}></View>}
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.totalValue}>
                        <Text style={styles.totalValueTitle}>Valor final</Text>
                        <Text style={styles.totalValueItem}>Frete: <Text style={styles.totalValuePrice}>R$ 20,00</Text></Text>
                    </View>

                    <TouchableOpacity
                        style={styles.finalizeButton}
                        onPress={() => router.push({
                            pathname: "concluido",
                            params: {
                                data,
                                horario,
                                municipio,
                                cep,
                                rua,
                                numero,
                                residueType,
                                quantity,
                                tipoUsuario
                            }
                        })}
                    >
                        <Text style={styles.finalizeButtonText}>Finalizar</Text>
                    </TouchableOpacity>
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
    header: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 0,
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 20,
        color: '#148311',
        fontFamily: 'PoppinsBold',
    },
    backButton: {
        backgroundColor: '#148311',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 33,
        height: 33
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    content: {
        width: '100%',
        alignItems: 'center',
    },
    detailSection: {
        width: '100%',
        marginBottom: 10,
    },
    detailHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#148311',
    },
    detailContent: {
        paddingLeft: 35,
    },
    detailText: {
        fontSize: 16,
        color: '#555',
    },
    paymentButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderColor: '#148311',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 15,
    },
    paymentButtonText: {
        fontSize: 16,
        color: '#148311',
    },
    paymentOptions: {
        width: '100%',
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    paymentOptionText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#148311',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioSelected: {
        borderColor: '#148311',
        backgroundColor: 'transparent',
    },
    radioInnerCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#148311',
    },
    totalValue: {
        width: '100%',
        marginTop: 30,
        alignItems: 'flex-start',
    },
    totalValueTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#148311',
        marginBottom: 10,
    },
    totalValueItem: {
        fontSize: 16,
        color: '#555',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    totalValuePrice: {
        fontWeight: 'bold',
        color: '#148311',
    },
    finalizeButton: {
        width: '80%',
        height: 50,
        backgroundColor: '#148311',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    finalizeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});