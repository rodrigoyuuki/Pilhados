import React, { useState, useEffect } from "react";
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Image
} from 'react-native';

import { useRouter } from 'expo-router';

import { auth, db } from "../../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import CustomModal from '../../../components/alerts';
import Ionicons from '@expo/vector-icons/Ionicons';
import LoadingModal from '../../../components/loading'

export default function SignUp() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [passHide, setPassHide] = useState(true);
    const [passHide2, setPassHide2] = useState(true);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (usuario) => {
            if (usuario) {
                setUser({
                    email: usuario.email,
                    uid: usuario.uid,
                });
            }
        });
        return unsub;
    }, []);

    async function handleCreateUser() {
        setLoading(true);
        if (!validateForms()) {
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const currentUser = userCredential.user;
            await updateProfile(currentUser, { displayName: name });
            await setDoc(doc(db, "users", currentUser.uid), {
                name: name,
                email: email,
                birthDate: birthDate
            });
            setUser({
                email: currentUser.email,
                uid: currentUser.uid,
            });

            router.push("teste");
        } catch (err) {
            console.log("Error code: ", err.code);
            console.log("Error message: ", err.message);
            if (err.code == "auth/invalid-email") {
                setErrorMessage("Email inválido!");
                setErrorModalVisible(true);
            }
            else if (err.code == "auth/missing-password") {
                setErrorMessage("A senha é obrigatória!");
                setErrorModalVisible(true);
            }
            else if (err.code == "auth/email-already-in-use") {
                setErrorMessage("Esse e-mail já está sendo usado!");
                setErrorModalVisible(true);
            }
            else {
                setErrorMessage("Erro ao criar conta! Tente novamente mais tarde.");
                setErrorModalVisible(true);
            }
        } finally {
            setLoading(false);
        }
    }

    function validateForms() {
        if (!name.trim()) {
            setErrorMessage("Digite seu nome!");
            setErrorModalVisible(true);
            return false;
        } else if (!birthDate.trim()) {
            setErrorMessage("Digite sua data de nascimento!");
            setErrorModalVisible(true);
            return false;
        } else if (!email.trim()) {
            setErrorMessage("Digite seu email!");
            setErrorModalVisible(true);
            return false;
        } else if (password.length === 0) {
            setErrorMessage("A senha é obrigatória!");
            setErrorModalVisible(true);
            return false;
        } else if (password.length < 8) {
            setErrorMessage("A senha deve ter pelo menos 8 caracteres!");
            setErrorModalVisible(true);
            return false;
        } else if (!email.includes("@") || !email.includes(".")) {
            setErrorMessage("Email inválido!");
            setErrorModalVisible(true);
            return false;
        } else if (password !== confirmPassword) {
            setErrorMessage("As senhas não coincidem!");
            setErrorModalVisible(true);
            return false;
        }

        return true;
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}>
                <LoadingModal visible={loading} message="Criando sua conta..." />
                <ScrollView contentContainerStyle={styles.scrollView}>

                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require('../../../assets/images/logo.png')}
                                style={styles.logo}
                            />
                        </View>
                    </View>

                    <View style={styles.signUpContent}>
                        <CustomModal
                            visible={errorModalVisible}
                            message={errorMessage}
                            onClose={() => setErrorModalVisible(false)}
                        />

                        <View style={styles.signUpTextContainer}>
                            <Text style={styles.signUpText}>Cadastro</Text>
                        </View>

                        <TextInput
                            placeholder="Nome"
                            style={styles.input}
                            keyboardType="default"
                            placeholderTextColor={'#999'}
                            value={name}
                            onChangeText={setName}
                        />

                        <TextInput
                            placeholder="Data de nascimento"
                            style={styles.input}
                            keyboardType="default"
                            placeholderTextColor={'#999'}
                            value={birthDate}
                            onChangeText={setBirthDate}
                        />

                        <TextInput
                            placeholder="Email"
                            style={styles.input}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholderTextColor={'#999'}
                            value={email}
                            onChangeText={setEmail}
                        />

                        <View style={styles.senhaContainer}>
                            <TextInput
                                placeholder="Senha"
                                style={styles.senhaInput}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor={'#999'}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={passHide}
                            />
                            <TouchableOpacity style={styles.icon}
                                onPress={() => setPassHide(!passHide)}>
                                <Ionicons name={passHide ? 'eye-outline' : 'eye-off-outline'} size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.senhaContainer}>
                            <TextInput
                                placeholder="Confirmar senha"
                                style={styles.senhaInput}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor={'#999'}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={passHide2}
                            />
                            <TouchableOpacity style={styles.icon}
                                onPress={() => setPassHide2(!passHide2)}>
                                <Ionicons name={passHide2 ? 'eye-outline' : 'eye-off-outline'} size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleCreateUser}
                            disabled={loading}
                        >
                            <Text style={styles.submitText}>Cadastrar</Text>
                        </TouchableOpacity>

                        <View style={styles.loginTextContainer}>
                            <Text style={styles.loginText}>Já tem conta?</Text>
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={() => router.push("inicio")}
                            >
                                <Text style={styles.loginButtonText}>Acesse aqui!</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        alignItems: 'center',
    },
    logoContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50'
    },
    logo: {
        width: '90',
        height: '90',
        resizeMode: 'contain',
    },
    signUpContent: {
        width: '80%',
        alignSelf: 'center',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    signUpTextContainer: {
        marginBottom: 20,
    },
    signUpText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#555555',
        paddingBottom: 20,
    },
    input: {
        width: '90%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingLeft: 20,
        marginBottom: 20,
        borderColor: '#a6a6a6',
        borderWidth: 1,
    },
    senhaContainer: {
        width: '90%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderColor: '#a6a6a6',
        borderWidth: 1,
    },
    senhaInput: {
        flex: 1,
        fontSize: 16,
    },
    icon: {
        paddingHorizontal: 5,
    },
    submitButton: {
        width: '70%',
        height: 50,
        backgroundColor: '#148311',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    submitText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18,
    },
    loginTextContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
    },
    loginText: {
        fontSize: 14,
        color: '#555555',
    },
    loginButton: {
        marginLeft: 5,
    },
    loginButtonText: {
        fontSize: 14,
        color: '#148311',
        textDecorationLine: 'underline',
    },
});