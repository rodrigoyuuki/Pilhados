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
import InputSenha from '../../../components/inputSenha';
import InputText from '../../../components/inputText';

export default function Cadastro() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [nomeInst, setNomeInst] = useState("");

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

  const formatDocument = (text, type) => {
    const MAX_LENGTH = type === 'cnpj' ? 14 : 11;
    let cleaned = text.replace(/\D/g, '');
    cleaned = cleaned.slice(0, MAX_LENGTH);

    const masks = {
      cpf: [3, 6, 9],
      cnpj: [2, 5, 8, 12]
    };

    let formatted = '';
    const limits = masks[type];
    cleaned.split('').forEach((char, i) => {
      formatted += char;
      if (limits.includes(i + 1)) {
        if (type === 'cpf') {
          formatted += (i === 8 ? '-' : '.');
        } else if (type === 'cnpj') {
          formatted += (i === 7 ? '/' : (i === 11 ? '-' : '.'));
        }
      }
    });

    return formatted;
  };

  async function handleCreateUser() {
    if (!validateForms()) return;
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "instituicao", user.uid), {
        email,
        nome: nomeInst,
        cpf: cpf.replace(/\D/g, ''),
        cnpj: cnpj.replace(/\D/g, '')
      });
      setUser({ email: user.email, uid: user.uid });
      router.push("inicioInst");
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

  const showError = (msg) => {
    setErrorMessage(msg);
    setErrorModalVisible(true);
    return false;
  };

  function validateForms() {
    const cleanedCpf = cpf.replace(/\D/g, '');
    const cleanedCnpj = cnpj.replace(/\D/g, '');

    if (!nomeInst.trim()) return showError("Digite o nome da instituição!");
    if (!email.trim()) return showError("Digite seu email!");
    if (!email.includes("@") || !email.includes(".")) return showError("Email inválido!");
    if (!password) return showError("A senha é obrigatória!");
    if (password.length < 8) return showError("A senha deve ter pelo menos 8 caracteres!");
    if (password !== confirmPassword) return showError("As senhas não coincidem!");
    if (cleanedCpf && cleanedCpf.length !== 11) return showError("CPF inválido!");
    if (cleanedCnpj && cleanedCnpj.length !== 14) return showError("CNPJ inválido!");
    if (!cleanedCpf && !cleanedCnpj) return showError("Digite o CPF ou o CNPJ!");

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
          <InputText
            placeholder="Nome da Instituição"
            value={nomeInst}
            onChangeText={setNomeInst}
          />
          <InputText
            placeholder="CPF"
            keyboardType="numeric"
            value={cpf}
            onChangeText={(t) => setCpf(formatDocument(t, 'cpf'))}
          />
          <InputText
            placeholder="CNPJ"
            keyboardType="numeric"
            value={cnpj}
            onChangeText={(t) => setCnpj(formatDocument(t, 'cnpj'))}
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
              onPress={() => router.push("loginInst")}
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