import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Linking,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const objetivos = [
    "Promover a responsabilidade ambiental e incentivar o descarte correto de materiais eletrônicos.",
    "Contribuir para a preservação do meio ambiente.",
    "Promover uma cultura de consciência ecológica dentro das organizações.",
    "Ajudar a construir um futuro mais limpo, tecnológico e responsável.",
];

export default function Sobrenos() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    const handleLinkPress = async () => {
        const url = 'https://www.google.com/search?q=artigo+científico+sobre+lixo+eletrônico';
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            console.error(`Não foi possível abrir o link: ${url}`);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleGoBack}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.titleView}>
                    <Text style={styles.title}>Sobre nós</Text>
                </View>

                <View style={{ width: 45 }}></View>
            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: '#a6a6a6' }}></View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View>
                    <Text style={styles.subTitle}>Nosso propósito</Text>
                    <Text style={styles.paragraph}>
                        Queremos facilitar o agendamento de coletas seletivas de lixo eletrônico,
                        conectando empresas públicas e privadas a soluções sustentáveis de descarte.
                    </Text>

                    <Text style={styles.subTitle}>Origem e criação</Text>
                    <Text style={styles.paragraph}>
                        Desenvolvido por quatro estudantes do curso de Desenvolvimento de Sistemas da ETEC
                        de Taboão da Serra, a ideia surgiu da preocupação com o impacto ambiental do descarte
                        inadequado de resíduos eletrônicos.
                    </Text>

                    <Text style={styles.subTitle}>Visão e tecnologia</Text>
                    <Text style={styles.paragraph}>
                        Acreditamos que a tecnologia deve ser uma aliada da sustentabilidade, por isso,
                        criamos uma plataforma prática, intuitiva e eficiente.
                    </Text>

                    <Text style={styles.subTitle}>Nossos objetivos</Text>
                    <View style={styles.listContainer}>
                        {objetivos.map((objetivo, index) => (
                            <Text key={index} style={styles.listItem}>
                                {`\u2022 ${objetivo}`}
                            </Text>
                        ))}
                    </View>

                    <Text style={styles.subTitle}>Quer saber mais?</Text>
                    <Text style={styles.linkText} onPress={handleLinkPress}>
                        Acesse nosso{' '}
                        <Text style={styles.link}>
                            artigo científico sobre lixo eletrônico
                        </Text>
                        {' '}e conheça mais sobre o projeto.
                    </Text>
                </View>
            </ScrollView>
        </View>
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
        color: '#000',
        fontFamily: 'PoppinsBold',
    },
    subTitle: {
        backgroundColor: '#148311',
        fontFamily: 'PoppinsBold',
        fontSize: 18,
        padding: 10,
        paddingLeft: 18,
        borderRadius: 15,
        marginLeft: 10,
        marginBottom: 15,
        color: '#fff',
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
    },
    paragraph: {
        fontSize: 13,
        lineHeight: 22,
        textAlign: 'justify',
        color: '#333',
        marginBottom: 15,
        marginRight: 15,
        marginLeft: 15,
        fontFamily: 'PoppinsRegular',
    },
    listContainer: {
        marginBottom: 15,
        marginHorizontal: 15,
    },
    listItem: {
        fontSize: 13,
        lineHeight: 22,
        color: '#333',
        fontFamily: 'PoppinsRegular',
        marginBottom: 8,
        marginLeft: '10',
        textAlign: 'justify',
    },
    linkText: {
        fontSize: 13,
        lineHeight: 24,
        color: '#333',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 30,
        fontFamily: 'PoppinsRegular',
    },
    link: {
        color: '#148311',
        textDecorationLine: 'underline',
    },
});