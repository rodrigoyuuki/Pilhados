import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomModal from '../../../components/alerts';
import LoadingModal from '../../../components/loading';
import { auth } from '../../../firebase/firebaseConfig';

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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
                router.push('inicioInst');
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
                style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                
                
                <LoadingModal visible={loading} message="Fazendo login..." />
                <CustomModal
                    visible={errorModalVisible}
                    message={errorMessage}
                    onClose={() => setErrorModalVisible(false)}
                />
                <View style={styles.content}>
                    <Image
                        source={require('../../../assets/images/logo2.png')}
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
                        onPress={esqueciSenha}
                    >
                        <Text style={styles.linkText}>Esqueceu sua senha?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => handleSignIn('/inicioInst')}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Não tem conta?</Text>
                        <TouchableOpacity onPress={() => router.push('cadastroInst')}>
                            <Text style={styles.registerLink}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8ffe3',
    },
    content: {
        width: '85%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    loginTitle: {
        fontSize: 22,
        marginBottom: 30,
        fontFamily: 'PoppinsBold',
        color: '#555'
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: '#a6a6a6',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 20,
        fontSize: 13,
        fontFamily: 'PoppinsRegular',
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
        fontSize: 13,
        fontFamily: 'PoppinsRegular',
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginRight: '10%',
        marginBottom: 30,
    },
    linkText: {
        color: '#555',
        fontSize: 13,
        fontFamily: 'PoppinsRegular',
    },
    loginButton: {
        width: '80%',
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
        fontFamily: 'PoppinsRegular',
    },
    registerContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    registerText: {
        color: '#555555',
        marginRight: 5,
        fontSize: 13,
        fontFamily: 'PoppinsRegular',
    },
    registerLink: {
        color: '#148311',
        textDecorationLine: 'underline',
        fontSize: 13,
        fontFamily: 'PoppinsRegular',
    },
});