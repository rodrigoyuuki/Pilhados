import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import {
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';
import { usePathname } from 'expo-router';

const InputSenha = ({ style, ...props }) => {
    const [isSecure, setIsSecure] = useState(true);
    const pathname = usePathname();
    const isCadastroInst = pathname.includes('cadastroInst');

    return (
        <View style={[isCadastroInst ? styles.senhaContainerInst : styles.senhaContainerUser, style]}>
            <TextInput
                style={styles.senhaInput}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={'#999'}
                secureTextEntry={isSecure}
                {...props}
            />
            <TouchableOpacity
                style={styles.icon}
                onPress={() => setIsSecure(!isSecure)}
            >
                <Ionicons
                    name={isSecure ? 'eye-outline' : 'eye-off-outline'}
                    size={24}
                    color="#a6a6a6"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    senhaContainerUser: {
        width: "90%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 25,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderColor: "#a6a6a6",
        borderWidth: 1,
    },
    senhaContainerInst: {
        width: '90%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8ffe3',
        borderRadius: 25,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderColor: '#a6a6a6',
        borderWidth: 1,
    },
    senhaInput: {
        flex: 1,
        fontSize: 13,
        fontFamily: 'PoppinsRegular',
    },
    icon: {
        paddingHorizontal: 5,
    },
});

export default InputSenha;