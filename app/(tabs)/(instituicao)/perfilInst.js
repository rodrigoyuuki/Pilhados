import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import HeaderPerfil from '../../../components/headerPerfil';
import Drawer from '../../../components/drawerInst';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';

export default function ProfileScreen() {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);
    const [image, setImage] = useState(null);
    const auth = getAuth();
    const user = auth.currentUser;
    const [personalData, setPersonalData] = useState({
        nome: '',
        cnpj: '',
        cpf: '',
        email: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            if (user) {
                try {
                    const docRef = doc(db, 'instituicao', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setPersonalData({
                            nome: data.nome || '',
                            cnpj: data.cnpj || '',
                            cpf: data.cpf || '',
                            email: data.email || '',
                        });
                    } else {
                        console.log('Documento não encontrado!');
                    }
                } catch (error) {
                    console.log('Erro ao buscar nome:', error);
                }
            }
        };
        fetchUser();
    }, []);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const toggleDrawer = () => {
        if (!isDrawerVisible) {
            setShouldRenderDrawer(true);
        }
        setIsDrawerVisible(!isDrawerVisible);
    };

    return (
        <View style={styles.container}>
            <HeaderPerfil onMenuPress={toggleDrawer} />

            <TouchableOpacity
                onPress={pickImage}
                style={styles.profileCircle}>

                {image ? (
                    <Image source={{ uri: image }} style={styles.imagePlaceholder} />
                ) : (
                    <Ionicons name="person" size={70} color="#2e7d32" />
                )}
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.userName}>{personalData.nome}</Text>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Dados pessoais</Text>

                    <Text style={styles.label}>CNPJ:</Text>
                    <Text style={styles.infomation}>{personalData.cnpj}</Text>

                    <Text style={styles.label}>CPF:</Text>
                    <Text style={styles.infomation}>{personalData.cpf}</Text>
                    
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.infomation}>{personalData.email}</Text>
                </View>

                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
            </ScrollView>

            {shouldRenderDrawer && (
                <Drawer
                    isVisible={isDrawerVisible}
                    onClose={toggleDrawer}
                    setShouldRenderDrawer={setShouldRenderDrawer}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#148311',
    },
    profileCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#e3ff92',
        borderWidth: 3,
        borderColor: '#f5ffd9',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 70,
        alignSelf: 'center',
        zIndex: 5,
    },
    scrollView: {
        paddingTop: 80,
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f8ffe3',
        flex: 1
    },
    userName: {
        fontSize: 20,
        color: '#148311',
        marginBottom: 20,
        fontStyle: 'italic',
    },
    card: {
        width: '100%',
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#148311',
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: '#b8bfa6',
        marginBottom: 4,
    },
    infomation: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#148311',
        paddingVertical: 6,
        marginBottom: 20,
        fontSize: 16,
        color: '#148311',
    },
    editButton: {
        backgroundColor: '#148311',
        width: '40%',
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    editButtonText: {
        color: '#f5ffd9',
        fontSize: 16,
        fontWeight: '600',
    },
});