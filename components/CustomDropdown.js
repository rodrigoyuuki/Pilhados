import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CustomDropdown({ label, value, options, onSelect }) {
    const [visible, setVisible] = useState(false);

    return (
        <View style={{ width: "100%" }}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setVisible(true)}
            >
                <Text style={styles.text}>{value || label}</Text>
                <Ionicons name="chevron-down" size={20} color="#fff" />
            </TouchableOpacity>

            <Modal transparent visible={visible} animationType="fade">
                <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
                    <View style={styles.modalBox}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => {
                                        onSelect(item);
                                        setVisible(false);
                                    }}
                                >
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#148311',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    text: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'PoppinsRegular'
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBox: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 10,
        maxHeight: "50%",
    },
    option: {
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    optionText: {
        fontSize: 16,
        color: '#148311',
    }
});