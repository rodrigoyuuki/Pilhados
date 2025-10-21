import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomModal from '../../../components/alerts';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import Drawer from '../../../components/drawer';
import TabBar from '../../../components/tabBarInst';

const noticiasCollectionRef = collection(db, 'noticias');

function Header({ onMenuPress }) {
    const router = useRouter();
    return (
        <View style={styles.header}>
            <View style={styles.headerTopRow}>
                <TouchableOpacity onPress={onMenuPress}>
                    <Feather name="menu" size={35} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('perfilInst')}>
                    <Ionicons name="person-circle" size={40} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function AddNoticia() {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            setModalVisible(true);
            setMessage("Desculpe, precisamos de permissões da galeria para isso funcionar!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const handleAddNoticia = async () => {
        if (!title || !summary || !content) {
            setModalVisible(true);
            setMessage('Campos incompletos: Por favor, preencha todos os campos antes de publicar.');
            return;
        }
        setIsLoading(true);

        try {
            await addDoc(noticiasCollectionRef, {
                title: title,
                summary: summary,
                content: content,
                imageUri: image,
                createdAt: createdAt,
            });

            setTitle('');
            setSummary('');
            setContent('');
            setImage(null);
            setCreatedAt('');

            setModalVisible(true);
            setMessage('Sucesso! Notícia publicada com sucesso!');

        } catch (error) {
            console.error("Erro ao adicionar notícia: ", error);
            setModalVisible(true);
            setMessage('Houve um erro ao tentar publicar a notícia. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}>
            <CustomModal
                visible={modalVisible}
                message={message}
                onClose={() => setModalVisible(false)}
            />
            <View style={styles.addNoticiaContainer}>
                <TextInput
                    placeholder="Título: "
                    placeholderTextColor={'#9bac6a'}
                    style={styles.inputTitle}
                    value={title}
                    onChangeText={setTitle}
                    autoCapitalize="words"
                />
                <TouchableOpacity
                    onPress={pickImage}
                    style={styles.imageView}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.imagePlaceholder} />
                    ) : (
                        <FontAwesome name="image" size={50} color="#9bac6a" />
                    )}
                </TouchableOpacity>
                <TextInput
                    placeholder="Resuma a matéria (lide): "
                    placeholderTextColor={'#9bac6a'}
                    style={styles.input}
                    value={summary}
                    onChangeText={setSummary}
                    autoCapitalize="sentences"
                />
                <TextInput
                    placeholder="Infome a data de criação: "
                    placeholderTextColor={'#9bac6a'}
                    style={styles.input}
                    value={createdAt}
                    onChangeText={setCreatedAt}
                    multiline
                    autoCapitalize="sentences"
                />
                <TextInput
                    placeholder="Escreva sua matéria aqui "
                    placeholderTextColor={'#9bac6a'}
                    style={styles.input}
                    value={content}
                    onChangeText={setContent}
                    multiline
                    autoCapitalize="sentences"
                />
                <TouchableOpacity
                    style={styles.addNoticiaButton}
                    onPress={handleAddNoticia}
                    disabled={isLoading}>
                    <Text style={styles.addNoticiaButtonText}>
                        {isLoading ? 'Publicando...' : 'Publicar'}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default function Adicionar() {
    const router = useRouter();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);

    const toggleDrawer = () => {
        if (!isDrawerVisible) {
            setShouldRenderDrawer(true);
        }
        setIsDrawerVisible(!isDrawerVisible);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header onMenuPress={toggleDrawer} />
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                <AddNoticia />
            </View>
            <TabBar />
            {shouldRenderDrawer && (
                <Drawer
                    isVisible={isDrawerVisible}
                    onClose={toggleDrawer}
                    setShouldRenderDrawer={setShouldRenderDrawer}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: '#148311',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    coletaTitle: {
        fontSize: 20,
        color: '#0e670b',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingLeft: 30,
        paddingBottom: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 100,
        width: 340,
    },
    addNoticiaContainer: {
        backgroundColor: '#f5ffd9',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 15,
    },
    inputTitle: {
        alignSelf: 'center',
        width: '100%',
        textAlign: 'center',
        fontSize: 17,
        marginBottom: 10,
        fontFamily: 'PoppinsRegular'
    },
    input: {
        width: '100%',
        marginBottom: 10,
        fontSize: 13,
        fontFamily: 'PoppinsRegular'
    },
    imageView: {
        backgroundColor: '#cbe18a',
        height: 150,
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    addNoticiaButton: {
        backgroundColor: '#197815',
        width: 140,
        height: 45,
        alignSelf: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    addNoticiaButtonText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'PoppinsRegular'
    },
});
