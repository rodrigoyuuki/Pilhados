import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import Drawer from '../../../components/drawer';
import HeaderPerfil from '../../../components/headerPerfil';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import UpdatePerfil from '../../../components/updatePerfil';
import UpdateName from '../../../components/updateName';

export default function ProfileScreen() {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);
    const [image, setImage] = useState(null);
    const [uptadePerfilVisible, setUptadePerfilVisible] = useState(false);
    const [updateNameVisible, setUpdateNameVisible] = useState(false);


    const auth = getAuth();
    const user = auth.currentUser;
    const navigation = useNavigation();

    const [personalData, setPersonalData] = useState({
        name: '',
        email: '',
        birthDate: '',
    });
    const fetchUser = async () => {
        if (user) {
            try {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setPersonalData({
                        name: data.name || '',
                        email: data.email || user.email || '',
                        birthDate: data.birthDate || '',
                    });
                } else {
                    console.log('Documento não encontrado!');
                }
            } catch (error) {
                console.log('Erro ao buscar nome:', error);
            }
        }
    };

    useEffect(() => {
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

    const handleEditPress = () => {
        if (!user) {
            Alert.alert('Erro', 'Usuário não autenticado.');
            return;
        }
        navigation.navigate('EditProfileScreen', {
            initialData: personalData,
            userId: user.uid,
        });
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
                <Text style={styles.userName}>{personalData.name}</Text>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Dados pessoais</Text>
                    <Text style={styles.label}>Nome:</Text>
                    <Text style={styles.information}>{personalData.name}</Text>

                    <Text style={styles.label}>Data de nascimento:</Text>
                    <Text style={styles.information}>{personalData.birthDate}</Text>

                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.information}>{personalData.email}</Text>
                </View>

                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setUptadePerfilVisible(true)}>
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

            <UpdatePerfil
                visible={uptadePerfilVisible}
                onClose={() => setUptadePerfilVisible(false)}
                onEditName={() => {
                    setUptadePerfilVisible(false); 
                    setUpdateNameVisible(true); 
                }}
            />

            <UpdateName
                visible={updateNameVisible}
                onClose={() => setUpdateNameVisible(false)}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8ffe3',
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
    information: {
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
    label: {
        fontSize: 14,
        color: '#b8bfa6',
        marginBottom: 4,
    },
});
