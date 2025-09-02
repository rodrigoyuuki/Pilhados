import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

function NewsDetailCard({ title, imageSource, imageCaption, author, date, content, coment,  onGoBack }) {
    const router = useRouter();
    return (
        <View style={styles.newsDetailCard}>
            <TouchableOpacity onPress={() => router.back('')} style={styles.backButton}>
                <FontAwesome name="chevron-circle-left" size={33} margin={5} color="#148311" />
            </TouchableOpacity>
            <Text style={styles.newsTitle}>{title}</Text>
            <Text style={styles.newsContent}>{content}</Text>
            {imageSource && (
                <View style={styles.imageContainer}>
                    <Image source={imageSource} style={styles.newsImage} />
                    <Text style={styles.imageCaption}>{imageCaption}</Text>
                </View>
            )}
            <View style={styles.authorContainer}>
                <Ionicons name="person-circle" size={30} color="#148311" />
                <View>
                    <Text style={styles.authorText}>{author}</Text>
                    <Text style={styles.dateText}>{date}</Text>
                </View>
            </View>
            <Text style={styles.fullContent}>{coment}</Text>
        </View>
    );
}

export default function NewsScreen() {
    const handleGoBack = () => {
        console.log("Botão de voltar pressionado.");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <NewsDetailCard
                    title="Escola em Taboão da Serra realiza campanha para coleta"
                    content="Durante o mês de agosto, a ETEC de Taboão da Serra realizará uma campanha para coleta de lixo eletrônico. A mobilização foi gerada através de um projeto dos alunos."
                    coment="A Escola Técnica Estadual (ETEC) de Taboão da Serra será o ponto de partida para uma importante iniciativa ambiental neste mês de agosto. Por meio de um projeto idealizado e organizado por seus próprios alunos, a instituição promove uma campanha de coleta de lixo eletrônico, incentivando a comunidade a descartar corretamente equipamentos que não são"
                    imageSource={{ uri: 'https://taboaoemfoco.com.br/wp-content/uploads/2018/03/Predio-da-Etec-Taboao.jpg' }}
                    imageCaption="Fonte: dos próprios autores, 2025"
                    author="Helena Lee"
                    date="08 de agosto de 2025, 09:31"
                    onGoBack={handleGoBack}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
    },
    newsDetailCard: {
        width: '90%',
        backgroundColor: '#f8ffe3',
        borderRadius: 20,
        padding: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingTop: 50,
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 1,
    },
    newsTitle: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#148311',
        marginBottom: 10,
        marginTop: 15,
    },
    newsContent: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    newsImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    imageCaption: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
        textAlign: 'center',
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 15,
    },
    authorText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#148311',
        marginLeft: 10,
    },
    dateText: {
        fontSize: 12,
        color: '#888',
        marginLeft: 10,
    },
    fullContent: {
        fontSize: 14,
        lineHeight: 20,
        color: '#333',
    },
});
