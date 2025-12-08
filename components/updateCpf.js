import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { MaskedTextInput } from "react-native-mask-text";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function UpdateCPF({ visible, onClose, instituicaoId, currentCPF }) {

    const [cpf, setCpf] = useState(
        typeof currentCPF === "string" ? currentCPF : ""
    );

    const handleUpdateCPF = async () => {

        if (!cpf || cpf.length < 14) {
            Alert.alert("Erro", "Digite um CPF válido!");
            return;
        }

        try {
            const instRef = doc(db, "instituicao", instituicaoId);
            await updateDoc(instRef, { cpf });

            Alert.alert("Sucesso", "CPF atualizado com sucesso!");
            onClose();
        } catch (error) {
            console.log(error.message);
            Alert.alert("Erro", "Não foi possível atualizar o CPF.");
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>

                    <Text style={styles.modalTitle}>Mudar CPF</Text>

                    <MaskedTextInput
                        mask="999.999.999-99"
                        keyboardType="numeric"
                        placeholder="Digite seu CPF"
                        placeholderTextColor="#4d4d4d"
                        style={styles.input}
                        value={cpf}
                        onChangeText={(text, rawText) => setCpf(text)}
                    />

                    <View style={styles.botoes}>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleUpdateCPF}
                        >
                            <Text style={styles.buttonText}>Salvar</Text>
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
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 300,
        backgroundColor: '#f8ffe3',
        padding: 30,
        borderRadius: 25,
    },
    modalTitle: {
        fontSize: 17,
        fontFamily: 'PoppinsBold',
        marginBottom: 20,
        color: '#0e670b',
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        fontFamily: 'PoppinsRegular',
        color: '#000',
    },
    botoes: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#0e670b',
        paddingVertical: 10,
        borderRadius: 20,
        width: "40%",
    },
    buttonText: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'PoppinsRegular',
        textAlign: 'center',
    },
});