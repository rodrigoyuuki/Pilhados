import React, { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert
} from "react-native";
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

export default function DeleteAccountModal({ visible, onClose, navigation }) {

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!visible) {
            setPassword("");
            setLoading(false);
        }
    }, [visible]);

    const handleDelete = async () => {
        const user = auth.currentUser;

        if (!password.trim()) {
            Alert.alert("Erro", "Digite sua senha.");
            return;
        }

        try {
            setLoading(true);

            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);

            await deleteDoc(doc(db, "users", user.uid));
            await deleteUser(user);

            Alert.alert("Conta excluída", "Sua conta foi removida permanentemente.");

            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            });

        } catch (error) {
            if (error.code === "auth/wrong-password") {
                Alert.alert("Erro", "Senha incorreta.");
            } else {
                Alert.alert("Erro", "Não foi possível excluir a conta.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Excluir conta</Text>
                    <Text style={styles.text}>
                        Para confirmar, digite sua senha. Essa ação é irreversível!
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#666"
                    />

                    <View style={styles.botoes}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: "#ff5757" }]}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleDelete}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Excluir</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: 300,
        backgroundColor: "#f8ffe3",
        padding: 30,
        borderRadius: 25,
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: "PoppinsBold",
        color: "#0e670b",
        marginBottom: 15,
        textAlign: "center",
    },
    text: {
        fontFamily: "PoppinsRegular",
        fontSize: 13,
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        fontFamily: "PoppinsRegular",
        marginBottom: 20,
    },
    botoes: {
        flexDirection: "row",
        gap: 15,
        justifyContent: "center",
    },
    button: {
        width: "40%",
        backgroundColor: "#0e670b",
        paddingVertical: 10,
        borderRadius: 20,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontFamily: "PoppinsRegular",
    },
});