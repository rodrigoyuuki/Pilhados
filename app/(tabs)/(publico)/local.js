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
import { useRouter } from 'expo-router';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';
import { useLocalSearchParams } from 'expo-router';
import CustomDropdown from '../../../components/CustomDropdown';
import RadioButton from '../../../components/RadioButton';
import { Picker } from '@react-native-picker/picker';

const screenWidth = Dimensions.get('window').width;

function Header({ onMenuPress }) {
    const router = useRouter();
    return (
        <View style={styles.header}>
            <View style={styles.headerTopRow}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('perfil')}>
                    <Ionicons name="person-circle" size={40} color="#148311" />
                </TouchableOpacity>
            </View>
            <Text style={styles.headerTitle}>Agendamento</Text>
        </View>
    );
}

function SchedulingForm({
    municipio, setMunicipio,
    cep, setCep,
    rua, setRua,
    numero, setNumero,
    residueType, setResidueType,
    quantity, setQuantity,
    tipoUsuario, setTipoUsuario
}) {
    return (
        <View style={styles.formContainer}>
            <Text style={styles.formSectionTitle}>
                Informe o local da coleta.
            </Text>
            <CustomDropdown
                label="Município"
                value={municipio}
                options={["Taboão da Serra", "São Paulo", "Embu das Artes"]}
                onSelect={setMunicipio}
            />
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
            <CustomDropdown
                label="Selecione o tipo"
                value={residueType}
                options={["Pilha", "Celular", "Notebook", "Computador", "Tablet"]}
                onSelect={setResidueType}
            />

            <CustomDropdown
                label="Selecione a quantidade"
                value={quantity}
                options={["100g", "200g", "500g", "1kg", "2kg"]}
                onSelect={setQuantity}
            />

            <View style={{ marginTop: 20, width: "100%" }}>
                <Text style={{ marginBottom: 10, fontFamily: "PoppinsRegular", color: "#555" }}>
                    Selecione o tipo de usuário:
                </Text>

                <RadioButton
                    label="Instituição"
                    selected={tipoUsuario === "instituicao"}
                    onPress={() => setTipoUsuario("instituicao")}
                />

                <RadioButton
                    label="Usuário comum"
                    selected={tipoUsuario === "comum"}
                    onPress={() => setTipoUsuario("comum")}
                />

                <RadioButton
                    label="Assinante"
                    selected={tipoUsuario === "assinante"}
                    onPress={() => setTipoUsuario("assinante")}
                />
            </View>

        </View>
    );
}

export default function AgendamentoLocal() {
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [residueType, setResidueType] = useState("Selecione o tipo");
    const [quantity, setQuantity] = useState("Selecione a quantidade");

    const { data, horario } = useLocalSearchParams();
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
                        <SchedulingForm
                            municipio={municipio}
                            setMunicipio={setMunicipio}
                            cep={cep}
                            setCep={setCep}
                            rua={rua}
                            setRua={setRua}
                            numero={numero}
                            setNumero={setNumero}
                            residueType={residueType}
                            setResidueType={setResidueType}
                            quantity={quantity}
                            setQuantity={setQuantity}
                            tipoUsuario={tipoUsuario}
                            setTipoUsuario={setTipoUsuario}
                        />

                        <TouchableOpacity
                            style={styles.proceedButton}
                            onPress={() => {
                                if (tipoUsuario === "comum") {
                                    router.push({
                                        pathname: "valorFinal",
                                        params: {
                                            data,
                                            horario,
                                            municipio,
                                            cep,
                                            rua,
                                            numero,
                                            residueType,
                                            quantity,
                                            tipoUsuario
                                        }
                                    });
                                } else {
                                    router.push({
                                        pathname: "concluido",
                                        params: {
                                            data,
                                            horario,
                                            municipio,
                                            cep,
                                            rua,
                                            numero,
                                            residueType,
                                            quantity,
                                            tipoUsuario
                                        }
                                    });
                                }
                            }}
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
        fontSize: 20,
        color: '#148311',
        fontFamily: 'PoppinsBold'
    },
    backButton: {
        backgroundColor: '#148311',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 33,
        height: 33
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
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'PoppinsRegular'
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
        fontSize: 14,
        fontFamily: 'PoppinsRegular'
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#148311',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontFamily: 'PoppinsRegular',
        fontSize: 14,
    },
    inputSmall: {
        width: '40%',
        height: 50,
        borderColor: '#148311',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontFamily: 'PoppinsRegular',
        fontSize: 14,
    },
    proceedButton: {
        width: '60%',
        height: 50,
        backgroundColor: '#148311',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    proceedButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'PoppinsRegular'
    },
});