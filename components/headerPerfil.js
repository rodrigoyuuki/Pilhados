import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HeaderPerfil({ onMenuPress }) {
    const router = useRouter();
    return (
        <View style={styles.header}>
            <View style={styles.headerTopRow}>
                <TouchableOpacity onPress={onMenuPress}>
                    <Feather name="menu" size={35} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="home" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 40,
        paddingBottom: 40,
        paddingHorizontal: 35,
        backgroundColor: '#148311',
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
})