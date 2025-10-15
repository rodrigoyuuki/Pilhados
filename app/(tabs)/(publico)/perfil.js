import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import Drawer from '../../../components/drawer';
import HeaderPerfil from '../../../components/headerPerfil';

export default function ProfileScreen() {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);
    const [image, setImage] = useState(null);
    const [userName, setUserName] = useState('Nome do usuário');
    const [personalData, setPersonalData] = useState({
        name: 'Claudia Almeida Ferreira',
        date: '22/08/2007',
        email: 'exemplo@email.com',
        password: '*******',
    });

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
                <Text style={styles.userName}>{userName}</Text>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Dados pessoais</Text>
                    <Text style={styles.label}>Nome:</Text>
                    <TextInput
                        style={styles.input}
                        value={personalData.name}
                        editable={false}
                    />
                    <Text style={styles.label}>Data de nascimento:</Text>
                    <TextInput
                        style={styles.input}
                        value={personalData.date}
                        editable={false}
                    />
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={personalData.email}
                        editable={false}
                    />
                    <Text style={styles.label}>Senha:</Text>
                    <TextInput
                        style={styles.input}
                        value={personalData.password}
                        secureTextEntry={true}
                        editable={false}
                    />
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
    input: {
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
    drawerContainer: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        zIndex: 10,
    },
    drawerOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    drawerContent: {
        width: '70%',
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#4ca444',
        position: 'absolute',
        left: 0,
        height: '100%',
    },
    drawerItem: {
        paddingVertical: 15,
    },
    drawerItemText: {
        fontSize: 17,
        color: '#f8ffe3',
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        padding: 10,
    },
    label: {
        fontSize: 14,
        color: '#b8bfa6',
        marginBottom: 4,
    },
});
