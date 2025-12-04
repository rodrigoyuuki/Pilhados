import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { usePathname } from 'expo-router'; // Hook do expo-router

const InputText = ({ style, ...props }) => {
    const pathname = usePathname(); // pega a rota atual
    const isCadastroInst = pathname.includes('cadastroInst'); // verifica se é a tela cadastroInst

    return (
        <TextInput
            style={[isCadastroInst ? styles.inputInst : styles.inputUser, style]}
            placeholderTextColor={'#999'}
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    inputUser: {
        width: '90%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingLeft: 20,
        marginBottom: 20,
        borderColor: '#a6a6a6',
        borderWidth: 1,
        fontSize: 13,
        fontFamily: 'PoppinsRegular',
    },
    inputInst: {
        width: '90%',
        height: 50,
        backgroundColor: '#f8ffe3',
        borderRadius: 25,
        paddingLeft: 20,
        marginBottom: 20,
        borderColor: '#a6a6a6',
        borderWidth: 1,
        fontSize: 13,
        fontFamily: 'PoppinsRegular',
    },
});

export default InputText;