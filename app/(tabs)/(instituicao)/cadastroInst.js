import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import CustomModal from '../../../components/alerts';
import LoadingModal from '../../../components/loading';
import { auth, db } from "../../../firebase/firebaseConfig";


export default function Cadastro() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passHide, setPassHide] = useState(true);
  const [passHide2, setPassHide2] = useState(true);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");

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

  const formatCpf = (text) => {
    const cleanedText = text.replace(/\D/g, '');
    let formattedCpf = '';
    if (cleanedText.length > 0) {
      formattedCpf += cleanedText.substring(0, 3);
      if (cleanedText.length > 3) {
        formattedCpf += '.' + cleanedText.substring(3, 6);
      }
      if (cleanedText.length > 6) {
        formattedCpf += '.' + cleanedText.substring(6, 9);
      }
      if (cleanedText.length > 9) {
        formattedCpf += '-' + cleanedText.substring(9, 11);
      }
    }
    setCpf(formattedCpf);
  };

  const formatCnpj = (text) => {
    const cleanedText = text.replace(/\D/g, '');
    let formattedCnpj = '';
    if (cleanedText.length > 0) {
      formattedCnpj += cleanedText.substring(0, 2);
      if (cleanedText.length > 2) {
        formattedCnpj += '.' + cleanedText.substring(2, 5);
      }
      if (cleanedText.length > 5) {
        formattedCnpj += '.' + cleanedText.substring(5, 8);
      }
      if (cleanedText.length > 8) {
        formattedCnpj += '/' + cleanedText.substring(8, 12);
      }
      if (cleanedText.length > 12) {
        formattedCnpj += '-' + cleanedText.substring(12, 14);
      }
    }
    setCnpj(formattedCnpj);
  };

  async function handleCreateUser() {
    setLoading(true);
    if (!validateForms()) {
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = userCredential.user;

      await setDoc(doc(db, "instituicao", currentUser.uid), {
        email: email,
        cpf: cpf.replace(/\D/g, ''),
        cnpj: cnpj.replace(/\D/g, '')
      });

      setUser({
        email: currentUser.email,
        uid: currentUser.uid,
      });

      router.push("/inicioInst"); 
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
    const cleanedCpf = cpf.replace(/\D/g, '');
    const cleanedCnpj = cnpj.replace(/\D/g, '');

    if (!email.trim()) {
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
    } else if (cleanedCpf.length > 0 && cleanedCpf.length !== 11) {
      setErrorMessage("CPF inválido!");
      setErrorModalVisible(true);
      return false;
    } else if (cleanedCnpj.length > 0 && cleanedCnpj.length !== 14) {
      setErrorMessage("CNPJ inválido!");
      setErrorModalVisible(true);
      return false;
    } else if (cleanedCpf.length === 0 && cleanedCnpj.length === 0) {
      setErrorMessage("Digite o CPF ou o CNPJ!");
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
        <LoadingModal visible={loading} message="Criando sua conta..." />
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../assets/images/logo2.png')}
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
              placeholder="CPF"
              style={styles.input}
              keyboardType="numeric"
              placeholderTextColor={'#999'}
              value={cpf}
              onChangeText={formatCpf}
            />
            <TextInput
              placeholder="CNPJ"
              style={styles.input}
              keyboardType="numeric"
              placeholderTextColor={'#999'}
              value={cnpj}
              onChangeText={formatCnpj}
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
            <Text style={styles.passwordHint}>
              A senha precisa ter 8 caracteres{"\n"}
              contendo no mín. um especial{"\n"}
              (!@#$_-*&)
            </Text>
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
                onPress={() => router.push('/loginInst')}
              >
                <Text style={styles.loginButtonText}>Acesse aqui!</Text>
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
  header: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 70,
  },
  logoContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#f8ffe3',
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 5,
    borderColor: '#a6a6a6',
    borderWidth: 1,
  },
  senhaContainer: {
    width: '90%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8ffe3',
    borderRadius: 25,
    marginBottom: 5,
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
  passwordHint: {
    color: '#555555',
    textAlign: 'left',
    marginBottom: 5,
    width: '90%'
  },
  submitButton: {
    width: '70%',
    height: 50,
    backgroundColor: '#148311',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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