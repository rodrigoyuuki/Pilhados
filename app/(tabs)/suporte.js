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
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <FontAwesome name="chevron-circle-left" size={33} margin={5} color="#148311" />
                </TouchableOpacity>
                <Text style={styles.title}>Fale conosco</Text>
            </View>

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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#a6a6a6',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        paddingTop: 25,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        paddingTop: 25,
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
