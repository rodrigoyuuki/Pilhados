import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS
} from 'react-native-reanimated';

function Header({ onMenuPress }) {
    const router = useRouter();
    return (
        <View style={styles.header}>
            <View style={styles.headerTopRow}>
                <TouchableOpacity onPress={onMenuPress}>
                    <Ionicons name="menu" size={40} color="#e3ff92" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <AntDesign name="home" size={40} margin={5} color="#e3ff92" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function DrawerMenu({ isVisible, onClose, setShouldRenderDrawer }) {
    const router = useRouter();
    const drawerX = useSharedValue(-300);

    useEffect(() => {
        if (isVisible) {
            drawerX.value = withTiming(0, { duration: 300 });
        } else {
            drawerX.value = withTiming(-300, { duration: 300 }, (isFinished) => {
                if (isFinished) {
                    runOnJS(setShouldRenderDrawer)(false);
                }
            });
        }
    }, [isVisible]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: drawerX.value }],
        };
    });

    return (
        <View style={styles.drawerContainer}>
            <TouchableOpacity
                style={styles.drawerOverlay}
                onPress={onClose}
                activeOpacity={1}
            />
            <Animated.View style={[styles.drawerContent, animatedStyle]}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close" size={30} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('sobrenos')}>
                    <Text style={styles.drawerItemText}>Sobre nós</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('configuracoes')}>
                    <Text style={styles.drawerItemText}>Configurações</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('suporte')}>
                    <Text style={styles.drawerItemText}>Fale conosco</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

export default function ProfileScreen() {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);
    const [image, setImage] = useState(null);
    const [userName, setUserName] = useState('Nome da instituição');
    const [personalData, setPersonalData] = useState({
        cnpj: '12.345.678/0001-46',
        cpf: '123.456.789-00',
        email: 'exemplo@email.com',
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
        <SafeAreaView style={styles.container}>
            <Header onMenuPress={toggleDrawer} />

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
                    <Text style={styles.label}>CNPJ:</Text>
                    <TextInput
                        style={styles.input}
                        value={personalData.cnpj}
                        editable={false}
                    />
                    <Text style={styles.label}>CPF:</Text>
                    <TextInput
                        style={styles.input}
                        value={personalData.cpf}
                        editable={false}
                    />
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={personalData.email}
                        editable={false}
                    />
                </View>

                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
            </ScrollView>

            {shouldRenderDrawer && (
                <DrawerMenu
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
        backgroundColor: '#f8ffe3',
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 40,
        backgroundColor: '#197815',
        borderBottomWidth: 1,
        borderBottomColor: '#f5ffd9',
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
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
