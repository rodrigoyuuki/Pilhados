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
import LoadingModal from '../../../components/loading';
import InputSenha from '../../../components/inputSenha';
import InputText from '../../../components/inputText';

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

    const formatBirthday = (text) => {
        let cleaned = text.replace(/\D/g, '');
        cleaned = cleaned.slice(0, 8);

        if (cleaned.length >= 5) {
            return cleaned.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
        } else if (cleaned.length >= 3) {
            return cleaned.replace(/(\d{2})(\d{1,2})/, '$1/$2');
        } else {
            return cleaned;
        }
    };


    async function handleCreateUser() {
        if (!validateForms()) return;
        setLoading(true);

        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", currentUser.uid), {
                name: name,
                email: email,
                birthDate: birthDate
            });
            setUser({
                email: currentUser.email,
                uid: currentUser.uid,
            });

            router.push("inicio");
        }
        catch (err) {
            console.error("Erro Firebase:", err);
            const messages = {
                "auth/invalid-email": "Email inválido!",
                "auth/missing-password": "A senha é obrigatória!",
                "auth/email-already-in-use": "Esse e-mail já está sendo usado!"
            };
            showError(messages[err.code] || "Erro ao criar conta! Tente novamente mais tarde.");
        }
        finally {
            setLoading(false);
        }
    }

    function validateForms() {

        if (!nomeInst.trim()) return showError("Digite o nome da instituição!");
        if (!email.trim()) return showError("Digite seu email!");
        if (!email.includes("@") || !email.includes(".")) return showError("Email inválido!");
        if (!password) return showError("A senha é obrigatória!");
        if (password.length < 8) return showError("A senha deve ter pelo menos 8 caracteres!");
        if (password !== confirmPassword) return showError("As senhas não coincidem!");

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

                        <InputText
                            placeholder="Nome"
                            value={name}
                            onChangeText={setName}
                        />
                        <InputText
                            placeholder="Data de nascimento"
                            keyboardType="numeric"
                            value={birthDate}
                            onChangeText={(t) => setBirthDate(formatBirthday(t))}
                        />

                        <InputText
                            placeholder="Email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <InputSenha
                            placeholder="Senha"
                            value={password}
                            onChangeText={setPassword}
                        />
                        <InputSenha
                            placeholder="Confirmar senha"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
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
                                onPress={() => router.push("login")}
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
        fontSize: 22,
        color: '#555555',
        fontFamily: 'PoppinsBold',
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
        color: 'white',
        fontSize: 18,
        fontFamily: 'PoppinsRegular',
    },
    loginTextContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
    },
    loginText: {
        color: '#555555',
        fontSize: 13,
        fontFamily: 'PoppinsRegular',
    },
    loginButton: {
        marginLeft: 5,
    },
    loginButtonText: {
        fontSize: 13,
        fontFamily: 'PoppinsRegular',
        color: '#148311',
        textDecorationLine: 'underline',
    },
});