import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CustomModal({ visible, message, onClose }) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>{message}</Text>
                    <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                        <Text style={styles.modalButtonText}>Fechar</Text>
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
        backgroundColor: '#148311',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
    },

    modalText: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'PoppinsRegular',
    },

    modalButton: {
        backgroundColor: '#fff',
        width: '40%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },

    modalButtonText: {
        color: '#148311',
        fontFamily: 'PoppinsRegular',
        fontSize: 15
    },

});
