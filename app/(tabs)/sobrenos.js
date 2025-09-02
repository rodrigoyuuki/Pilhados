import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Linking,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

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
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <FontAwesome name="chevron-circle-left" size={40} margin={5} color="#148311" />
                </TouchableOpacity>
                <Text style={styles.title}>Sobre nós</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View>
                    <Text style={styles.paragraph}>
                        O Pilhados é um aplicativo desenvolvido com o propósito de
                        facilitar o agendamento de coletas seletivas de lixo eletrônico,
                        conectando empresas públicas e privadas a soluções
                        sustentáveis de descarte.
                    </Text>
                    <Text style={styles.paragraph}>
                        Criado por quatro estudantes do curso de Desenvolvimento de
                        Sistemas da ETEC de Taboão da Serra, o Pilhados nasceu da
                        preocupação com o impacto ambiental causado pelo descarte
                        inadequado de resíduos eletrônicos — como pilhas, baterias,
                        celulares, computadores e outros equipamentos que fazem parte
                        do nosso dia a dia.
                    </Text>
                    <Text style={styles.paragraph}>
                        Acreditamos que a tecnologia pode (e deve) ser uma aliada da
                        sustentabilidade. Por isso, desenvolvemos uma plataforma
                        prática, intuitiva e eficiente, que promove a
                        responsabilidade ambiental e incentiva o descarte correto
                        desses materiais.
                    </Text>
                    <Text style={styles.paragraph}>
                        Nosso objetivo é contribuir para a preservação do meio
                        ambiente, promovendo uma cultura de consciência ecológica
                        dentro das organizações e ajudando a construir um futuro
                        mais limpo, tecnológico e responsável.
                    </Text>
                    <Text style={styles.paragraph}>
                        Seja público ou privado, pequeno ou grande — com o Pilhados,
                        sua empresa pode fazer parte da mudança.
                    </Text>
                    <Text style={styles.linkText} onPress={handleLinkPress}>
                        Acesse nosso{' '}
                        <Text style={styles.link}>
                            artigo científico sobre lixo eletrônico
                        </Text>
                    </Text>
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
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        marginBottom: 15,
        marginRight: 15,
        marginLeft: 15,
    },
    linkText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 30,
    },
    link: {
        color: '#148311',
        textDecorationLine: 'underline',
    },
});
