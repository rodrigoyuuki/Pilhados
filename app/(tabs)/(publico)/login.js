import React, { useState } from 'react';

import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from 'react-native';
import { auth } from '../../../firebase/firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import CustomModal from '../../../components/alerts';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';


export default function Login() {
    const router = useRouter();
    const [passHide, setPassHide] = useState(true);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function esqueciSenha() {
        setErrorMessage("Em produção!");
        setErrorModalVisible(true);
    }

    function handleSignIn() {
        if (!validateForms()) {
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const currentUser = userCredential.user;
                setUser({
                    email: currentUser.email,
                    uid: currentUser.uid,
                });
                router.push('inicio');
            })

            .catch((err) => {
                console.log(err.code);
                if (err.code === "auth/invalid-email") {
                    setErrorMessage("Email ou senha inválidos!");
                    setErrorModalVisible(true);
                }

                else if (err.code === "auth/missing-password") {
                    setErrorMessage("A senha é obrigatória!");
                    setErrorModalVisible(true);
                }

                else if (err.code === "auth/invalid-credential") {
                    setErrorMessage("Email ou senha inválidos!");
                    setErrorModalVisible(true);
                }

                else if (err.code === "auth/user-not-found") {
                    setErrorMessage("Usuário não encontrado!");
                    setErrorModalVisible(true);
                }

                else {
                    setErrorMessage("Erro ao tentar fazer login! Tente novamente.");
                    setErrorModalVisible(true);
                }

            });

    }

    function validateForms() {
        if (!email.trim()) {
            setErrorMessage("Digite seu email!");
            setErrorModalVisible(true);
            return false;
        } else if (password.length === 0) {
            setErrorMessage("A senha é obrigatória!");
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
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <CustomModal
                        visible={errorModalVisible}
                        message={errorMessage}
                        onClose={() => setErrorModalVisible(false)}

                    />
                    <View style={styles.content}>
                        <Image
                            source={require('../../../assets/images/logo.png')}
                            style={styles.logo}
                        />
                        <Text style={styles.loginTitle}>Login</Text>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={'#888'}
                            style={styles.input}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <View style={styles.passwordContainer}>
                            <TextInput
                                placeholder="Senha"
                                placeholderTextColor={'#888'}
                                style={styles.passwordInput}
                                autoCapitalize="none"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={passHide}
                            />
                            <TouchableOpacity onPress={() => setPassHide(!passHide)}>
                                <Ionicons name={passHide ? 'eye-off-outline' : 'eye-outline'} size={24} color="#888" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.forgotPasswordButton}
                            onPress={esqueciSenha}>
                            <Text style={styles.linkText}>Esqueceu sua senha?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => handleSignIn('inicio')}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Não tem conta?</Text>
                        <TouchableOpacity onPress={() => router.push("cadastro")}>
                            <Text style={styles.registerLink}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    content: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    loginTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: '#a6a6a6',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        height: 50,
        borderColor: '#a6a6a6',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    passwordInput: {
        flex: 1,
        height: '100%',
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginRight: '40%',
        marginBottom: 30,
    },
    linkText: {
        color: '#555555',
    },
    loginButton: {
        width: '50%',
        height: 50,
        backgroundColor: '#148311',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    registerText: {
        color: '#555555',
        marginRight: 5,
    },
    registerLink: {
        color: '#148311',
        textDecorationLine: 'underline',
    },
});