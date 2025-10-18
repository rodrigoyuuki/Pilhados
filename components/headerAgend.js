import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HeaderAgend() {
    const router = useRouter();
    return (
        <View style={styles.header}>
            <View style={styles.headerTopRow}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
    headerTopRow: {
        width: '100%',
        marginBottom: 10,
        marginTop: 30,
    },
    backButton: {
        backgroundColor: '#148311',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 33,
        height: 33
    },
})