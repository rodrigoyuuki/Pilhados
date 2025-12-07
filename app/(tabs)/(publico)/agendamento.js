import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderAgend from '../../../components/headerAgend';
import Calendar from '../../../components/calendar';

export default function Agendamento() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <SafeAreaView style={styles.container}>
            <HeaderAgend />
            <Text style={styles.headerTitle}>Agendamento</Text>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.infoCard}>
                    <Text style={styles.infoText}>Para começar seu agendamento, selecione a data em que deseja a coleta.</Text>
                </View>
                <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <TouchableOpacity
                    style={[styles.proceedButton, !selectedDate && styles.disabledButton]}
                    onPress={() =>
                        router.push({
                            pathname: "hora",
                            params: {
                                data: selectedDate.toLocaleDateString("pt-BR")
                            }
                        })
                    }
                    disabled={!selectedDate}
                >
                    <Text style={styles.proceedButtonText}>Prosseguir</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 20,
        color: '#148311',
        fontFamily: 'PoppinsBold',
        alignSelf: 'center',
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 100,
    },
    infoCard: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 15,
        color: '#148311',
        textAlign: 'center',
        fontFamily: 'PoppinsRegular'
    },
    proceedButton: {
        width: '60%',
        height: 50,
        backgroundColor: '#148311',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    disabledButton: {
        backgroundColor: '#a8a8a8',
    },
    proceedButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'PoppinsRegular'
    },
});
