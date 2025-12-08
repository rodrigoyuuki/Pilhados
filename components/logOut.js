import React from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function LogoutModal({ visible, onClose, navigation }) {

    const handleLogout = async () => {
        try {
            await signOut(auth);
            Alert.alert("Sucesso", "Você saiu da conta.");
            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            });
        } catch (error) {
            Alert.alert("Erro", "Não foi possível sair da conta.");
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Deseja sair?</Text>
                    <Text style={styles.text}>
                        Ao sair, você precisará fazer login novamente.
                    </Text>

                    <View style={styles.botoes}>
                        <TouchableOpacity style={styles.button} onPress={handleLogout}>
                            <Text style={styles.buttonText}>Sair</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: "#ff5757" }]}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
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
        textAlign: "center",
        marginBottom: 15,
    },
    text: {
        fontFamily: "PoppinsRegular",
        fontSize: 13,
        textAlign: "center",
        marginBottom: 20,
    },
    botoes: {
        flexDirection: "row",
        gap: 15,
        justifyContent: "center",
    },
    button: {
        backgroundColor: "#0e670b",
        paddingVertical: 10,
        width: "40%",
        borderRadius: 20,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontFamily: "PoppinsRegular",
    },
});
