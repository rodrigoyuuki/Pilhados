import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Switch
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Configuracoes() {
    const router = useRouter();
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

    const handleGoBack = () => {
        router.back();
    };

    const handleLogout = () => {
        console.log("Usuário deslogado");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleGoBack}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.titleView}>
                    <Text style={styles.title}>Configurações</Text>
                </View>

                <View style={{ width: 45 }}></View>
            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: '#a6a6a6' }}></View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Outros</Text>
                    <TouchableOpacity onPress={() =>  router.push('suporte')}>
                        <Text style={styles.itemText}>Ajuda e suporte</Text>
                    </TouchableOpacity>

                    <View style={{ height: 1, width: '100%', backgroundColor: '#a6a6a6', marginVertical: 15 }}></View>

                    <TouchableOpacity style={styles.logOut} onPress={() => router.push('boasVindas')}>
                        <Text style={styles.itemText}>Sair</Text>
                        <FontAwesome style={{marginLeft: 10}} name="sign-out" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        width: '100%',
        height: 115,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 30,
    },
    titleView: {
        alignSelf: 'center',
        marginHorizontal: 'auto',
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'PoppinsRegular',
    },
    backButton: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#148311',
        borderRadius: 50,
        alignSelf: 'flex-start',
    },
    scrollViewContent: {
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        fontFamily: 'PoppinsBold',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
    },
    itemText: {
        fontSize: 15,
        color: '#333',
        fontFamily: 'PoppinsRegular',
    },
    logOut: {
        flexDirection: 'row'
    }
});
