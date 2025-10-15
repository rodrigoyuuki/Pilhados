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
            <View style={{height: 1, width: '100%', backgroundColor: '#a6a6a6'}}></View>

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
    },
    paragraph: {
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'justify',
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
