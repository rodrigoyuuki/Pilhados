import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    TextInput,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;

function Header({ onMenuPress }) {
    const router = useRouter();
    return (
        <View style={styles.header}>
            <View style={styles.headerTopRow}>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="chevron-circle-left" size={40} margin={5} color="#148311" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('perfil')}>
                    <Ionicons name="person-circle" size={40} color="#148311" />
                </TouchableOpacity>
            </View>
            <Text style={styles.headerTitle}>Agendamento</Text>
        </View>
    );
}

function SchedulingForm() {
    const [municipio, setMunicipio] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [residueType, setResidueType] = useState('Pilha');
    const [quantity, setQuantity] = useState('Quantidade');

    return (
        <View style={styles.formContainer}>
            <Text style={styles.formSectionTitle}>
                Informe o local da coleta.
            </Text>
            <TouchableOpacity style={styles.dropdownButton}>
                <Text style={styles.dropdownText}>Município</Text>
                <Ionicons name="chevron-down" size={20} color="#fff" />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Informe seu CEP"
                placeholderTextColor="#A0A0A0"
                value={cep}
                onChangeText={setCep}
            />
            <TextInput
                style={styles.input}
                placeholder="Informe sua Rua"
                placeholderTextColor="#A0A0A0"
                value={rua}
                onChangeText={setRua}
            />
            <TextInput
                style={styles.inputSmall}
                placeholder="Número"
                placeholderTextColor="#A0A0A0"
                value={numero}
                onChangeText={setNumero}
            />

            <Text style={styles.formSectionTitle}>
                Informe o tipo e quantidade de resíduos.
            </Text>
            <TouchableOpacity style={styles.dropdownButton}>
                <Text style={styles.dropdownText}>{residueType}</Text>
                <Ionicons name="chevron-down" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownButton}>
                <Text style={styles.dropdownText}>{quantity}</Text>
                <Ionicons name="chevron-down" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

export default function AgendamentoLocal() {
    const router = useRouter();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);
    const positionX = useSharedValue(screenWidth);

    useEffect(() => {
        positionX.value = withTiming(0, { duration: 300 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: positionX.value }],
        };
    });

    const toggleDrawer = () => {
        if (!isDrawerVisible) {
            setShouldRenderDrawer(true);
        }
        setIsDrawerVisible(!isDrawerVisible);
    };

    const handleProceed = () => {
        positionX.value = withTiming(-screenWidth, { duration: 300 }, (isFinished) => {
            if (isFinished) {
                runOnJS(router.push)('agendamentoData');
            }
        });
    };

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <SafeAreaView style={{ flex: 1 }}>
                <Header onMenuPress={toggleDrawer} />
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.content}>
                        <SchedulingForm />
                        <TouchableOpacity
                            style={styles.proceedButton}
                            onPress={() => router.push('valorfinal')}
                        >
                            <Text style={styles.proceedButtonText}>Prosseguir</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {shouldRenderDrawer && (
                    <DrawerMenu
                        isVisible={isDrawerVisible}
                        onClose={toggleDrawer}
                        setShouldRenderDrawer={setShouldRenderDrawer}
                    />
                )}
            </SafeAreaView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 0,
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
        marginTop: 30,
    },
    headerTitle: {
        fontSize: 22,
        color: '#148311',
        fontWeight: 'bold',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    content: {
        width: '100%',
        alignItems: 'center',
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    formSectionTitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
        textAlign: 'center',
    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#148311',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    dropdownText: {
        color: '#fff',
        fontSize: 16,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#148311',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    inputSmall: {
        width: '40%',
        height: 50,
        borderColor: '#148311',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    proceedButton: {
        width: '80%',
        height: 50,
        backgroundColor: '#148311',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    proceedButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
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
});
