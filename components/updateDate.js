import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export default function UpdateDate({ visible, onClose }) {

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}>

            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>

                    <Text style={styles.modalTitle}>Mudar Data de Nascimento</Text>

                    <TouchableOpacity
                        style={styles.cancelarButton}
                        onPress={onClose}
                    >
                        <Text style={styles.cancelarText}>
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
        textAlign: 'center',
    },
    cancelarButton: {
        backgroundColor: '#0e670b',
        width: '40%',
        paddingVertical: 10,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 20,
    },
    cancelarText: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'PoppinsRegular',
        textAlign: 'center',
    },
});