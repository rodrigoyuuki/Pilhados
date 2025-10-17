import React from 'react';
import { Modal, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
export default function LoadingModal({ visible, message = "Carregando..." }) {

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="#148311" />
          <Text style={styles.modalText}>{message}</Text>
        </View>
      </View>
    </Modal>

  );

}

const styles = StyleSheet.create({

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  modalContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    width: 300,
  },

  modalText: {
    marginTop: 15,
    fontSize: 16,
    color: '#148311',
    fontFamily: 'Poppins Regular',
  },

});
