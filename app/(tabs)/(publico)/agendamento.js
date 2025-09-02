import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

function Header() {
    const router = useRouter();
    return (
        <View style={styles.header}>
            <View style={styles.headerTopRow}>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="chevron-circle-left" size={40} margin={5} color="#148311" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('perfil')}>
                    <Ionicons name="person-circle" size={40} color="#148311" />
                </TouchableOpacity>
            </View>
            <Text style={styles.headerTitle}>Agendamento</Text>
        </View>
    );
}

function CalendarCard({ selectedDate, setSelectedDate }) {
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const dates = [
        null, null, null, null, null, 1, 2, 3,
        4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17,
        18, 19, 20, 21, 22, 23, 24,
        25, 26, 27, 28, 29, 30, 31
    ];

    return (
        <View style={styles.calendarContainer}>
            <View style={styles.daysOfWeekContainer}>
                {daysOfWeek.map((day, index) => (
                    <Text key={index} style={styles.dayOfWeekText}>{day}</Text>
                ))}
            </View>
            <View style={styles.datesGrid}>
                {dates.map((date, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.dateCell,
                            date && date === selectedDate && styles.selectedDateCell,
                        ]}
                        onPress={() => date && setSelectedDate(date)}
                        disabled={!date}
                    >
                        <Text style={date && date === selectedDate ? styles.selectedDateText : styles.dateText}>
                            {date}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

export default function Agendamento() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.infoCard}>
                    <Text style={styles.infoText}>Para começar seu agendamento, selecione a data em que deseja a coleta.</Text>
                </View>
                <CalendarCard selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <TouchableOpacity
                    style={[styles.proceedButton, !selectedDate && styles.disabledButton]}
                    onPress={() => router.push('hora')}
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
        marginTop: 30
    },
    headerTitle: {
        fontSize: 22,
        color: '#148311',
        fontWeight: 'bold',
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
        fontSize: 16,
        color: '#148311',
        textAlign: 'center',
    },
    calendarContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 25,
        marginBottom: 20,
        borderWidth: 1.5,
        borderColor: '#148311',
    },
    daysOfWeekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#148311',
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 15,
    },
    dayOfWeekText: {
        color: '#f8ffe3',
        fontWeight: 'bold',
        fontSize: 16,
    },
    datesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    dateCell: {
        width: '14%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 50,
    },
    selectedDateCell: {
        backgroundColor: '#edffb9',
        borderWidth: 1.5,
        borderColor: '#4ca444',
    },
    dateText: {
        fontSize: 16,
        color: '#4ca444',
    },
    selectedDateText: {
        fontSize: 14,
        color: '#148311',
        fontWeight: 'bold',
    },
    emptyDateText: {
        fontSize: 14,
        color: 'transparent',
    },
    proceedButton: {
        width: '80%',
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
        fontSize: 18,
        fontWeight: 'bold',
    },
});
