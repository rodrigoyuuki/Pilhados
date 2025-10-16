import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function ServiceCard() {
    const router = useRouter();
    return (
        <View style={styles.serviceCard}>
            <Text style={styles.serviceText}>Agende sua coleta aqui!</Text>
            <TouchableOpacity style={styles.serviceButton} onPress={() => router.push('agendamento')}>
                <Text style={styles.serviceButtonText}>Contratar serviço</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    serviceCard: {
        width: '70%',
        backgroundColor: '#f8ffe3',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    serviceText: {
        fontSize: 13,
        color: '#148311',
        marginBottom: 15,
        fontFamily: 'PoppinsRegular'
    },
    serviceButton: {
        backgroundColor: '#148311',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 13,
    },
    serviceButtonText: {
        color: '#f8ffe3',
        fontSize: 13,
        fontFamily: 'PoppinsRegular'
    },
})