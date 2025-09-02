import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS
} from 'react-native-reanimated';

function DrawerMenu({ isVisible, onClose, setShouldRenderDrawer }) {
    const router = useRouter();
    const drawerX = useSharedValue(-300);

    useEffect(() => {
        if (isVisible) {
            drawerX.value = withTiming(0, { duration: 300 });
        } else {
            drawerX.value = withTiming(-300, { duration: 300 }, (isFinished) => {
                if (isFinished) {
                    runOnJS(setShouldRenderDrawer)(false);
                }
            });
        }
    }, [isVisible]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: drawerX.value }],
        };
    });

    return (
        <View style={styles.drawerContainer}>
            <TouchableOpacity
                style={styles.drawerOverlay}
                onPress={onClose}
                activeOpacity={1}
            />
            <Animated.View style={[styles.drawerContent, animatedStyle]}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close" size={30} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('sobrenos')}>
                    <Text style={styles.drawerItemText}>Sobre nós</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('configuracoes')}>
                    <Text style={styles.drawerItemText}>Configurações</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('suporte')}>
                    <Text style={styles.drawerItemText}>Fale conosco</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

export default function Drawer(props) {
    return <DrawerMenu {...props} />;
}

const styles = StyleSheet.create({

    drawerContainer: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        zIndex: 10,
    },
    drawerOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    drawerContent: {
        width: '70%',
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#4ca444',
        position: 'absolute',
        left: 0,
        height: '100%',
    },
    drawerItem: {
        paddingVertical: 15,
    },
    drawerItemText: {
        fontSize: 17,
        color: '#f8ffe3',
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        padding: 10,
    },

})