import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert
} from 'react-native';
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { MaskedTextInput } from "react-native-mask-text";

export default function UpdateDate({ visible, onClose, currentDate }) {

    const [birthDate, setBirthDate] = useState(currentDate || '');

    const handleUpdateDate = async () => {
        if (!birthDate.trim()) {
            Alert.alert("Erro", "Digite uma data válida!");
            return;
        }

        const auth = getAuth();
        const user = auth.currentUser;

        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { birthDate });

            Alert.alert("Sucesso", "Data de nascimento atualizada!");
            onClose();
        } catch (error) {
            console.log(error.message);
            Alert.alert("Erro", "Não foi possível atualizar a data.");
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

                    <Text style={styles.modalTitle}>Mudar Data de Nascimento</Text>

                    <MaskedTextInput
                        mask="99/99/9999"
                        style={styles.input}
                        placeholder="Digite sua data (DD/MM/AAAA)"
                        placeholderTextColor="#4d4d4d"
                        value={birthDate}
                        onChangeText={(text, rawText) => setBirthDate(text)}
                    />

                    <View style={styles.botoes}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleUpdateDate}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#ff5757' }]}
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
    }
});