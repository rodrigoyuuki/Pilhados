import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {Ionicons, Feather} from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HeaderInicio({onMenuPress}) {
    const router = useRouter();
    return (
        <View style={styles.header}>
            <View style={styles.headerTopRow}>
                <TouchableOpacity onPress={onMenuPress}>
                    <Feather name="menu" size={35} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('perfil')}>
                    <Ionicons name="person-circle" size={40} color="#fff" />
                </TouchableOpacity>
            </View>
            <Text style={styles.headerTitle}>Olá, bem vindo ao PILHADOS!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 40,
        paddingBottom: 30,
        paddingHorizontal: 35,
        backgroundColor: '#148311',
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'PoppinsRegular'
    },
})