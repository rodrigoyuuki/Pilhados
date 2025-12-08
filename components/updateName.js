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
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function UpdateName({ visible, onClose, currentName }) {

    const [name, setName] = useState(currentName || '');

    const handleUpdateName = async () => {
        if (!name.trim()) {
            Alert.alert("Erro", "Digite um nome válido!");
            return;
        }

        const auth = getAuth();
        const user = auth.currentUser;

        try {
            await updateProfile(user, { displayName: name });
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { name });

            Alert.alert("Sucesso", "Nome atualizado com sucesso!");
            onClose();
        } catch (error) {
            console.log(error.message);
            Alert.alert("Erro", "Não foi possível atualizar o nome.");
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

                    <Text style={styles.modalTitle}>Mudar Nome</Text>

                    <TextInput
                        placeholder="Digite seu novo nome"
                        placeholderTextColor="#4d4d4d"
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />

                    <View style={styles.botoes}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleUpdateName}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, {backgroundColor: '#ff5757'}]}
                            onPress={onClose}>
                            <Text style={styles.buttonText}>
                                Cancelar
                            </Text>
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
    salvarButton: {
        backgroundColor: '#148311',
        paddingVertical: 12,
        borderRadius: 20,
        marginBottom: 10,
    },
    salvarText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        fontFamily: 'PoppinsBold',
    },
    button: {
        backgroundColor: '#0e670b',
        paddingVertical: 10,
        borderRadius: 20,
        alignSelf: 'center',
        width: '40%',
        marginTop: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'PoppinsRegular',
        textAlign: 'center',
    }
});