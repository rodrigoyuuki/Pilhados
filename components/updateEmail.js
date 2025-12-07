import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export default function UpdateEmail({ visible, onClose }) {

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}>

            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text>Mudar Email</Text>

                    <TouchableOpacity
                        style={[styles.optionButton, { marginTop: 20 }]}
                        onPress={onClose}
                    >
                        <Text style={[styles.optionText, { color: 'red' }]}>
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
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        color: 'black',
    },
    optionButton: {
        paddingVertical: 12,
    },
    optionText: {
        fontSize: 16,
        color: '#148311',
    },
});