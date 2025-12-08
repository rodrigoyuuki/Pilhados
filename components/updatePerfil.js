import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export default function UpdatePerfil({ visible, onClose, onEditName, onEditDate }) {

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}>

            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>

                    <Text style={styles.modalTitle}>O que deseja alterar?</Text>

                    <TouchableOpacity style={styles.optionButton} onPress={onEditName}>
                        <Text style={styles.optionText}>Nome</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionButton} onPress={onEditDate}>
                        <Text style={styles.optionText}>Data de nascimento</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.cancelarButton}
                        onPress={onClose}
                    >
                        <Text style={[styles.optionText, { color: 'white', textAlign: 'center', fontSize: 12, }]}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>
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
        marginBottom: 10,
        color: '#0e670b',
        textAlign: 'center'
    },
    optionButton: {
        paddingVertical: 7,
    },
    optionText: {
        fontSize: 16,
        color: '#148311',
        fontFamily: 'PoppinsRegular'
    },
    cancelarButton: {
        backgroundColor: '#0e670b',
        width: '40%',
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 20,
    }
});