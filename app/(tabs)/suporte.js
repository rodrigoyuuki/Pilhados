import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Linking
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function Faleconosco() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    const handleLinkPress = (url) => {
        Linking.openURL(url).catch(err => console.error("Não foi possível abrir o link: ", err));
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
                    <Text style={styles.title}>Ajuda e suporte</Text>
                </View>

                <View style={{ width: 45 }}></View>
            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: '#a6a6a6' }}></View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.content}>
                    <Text style={styles.introText}>
                        Dúvidas, sugestões ou reclamações? Contate-nos nas redes sociais, email ou telefone.
                    </Text>

                    <TouchableOpacity style={styles.contactItem} onPress={() => handleLinkPress('https://www.instagram.com/pilhados.app')}>
                        <FontAwesome name="instagram" size={24} color="#333" />
                        <Text style={styles.contactText}>@pilhados.app</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.contactItem} onPress={() => handleLinkPress('mailto:pilhadosea@gmail.com')}>
                        <FontAwesome name="envelope" size={20} color="#333" />
                        <Text style={styles.contactText}>pilhadosea@gmail.com</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.contactItem} onPress={() => handleLinkPress('tel:+5511977444125')}>
                        <FontAwesome name="phone" size={20} color="#333" />
                        <Text style={styles.contactText}>+55 (11) 97744-4125</Text>
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
        fontSize: 22,
        color: 'black',
        fontFamily: 'Poppins ExtraBold',
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
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    content: {
        width: '100%',
        maxWidth: 600,
        paddingHorizontal: 15,
    },
    introText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    contactText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 15,
    },
});
