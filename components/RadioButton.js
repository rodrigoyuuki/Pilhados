import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default function RadioButton({ label, selected, onPress }) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
        >
            <View style={styles.outerCircle}>
                {selected && <View style={styles.innerCircle} />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    outerCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: "#148311",
        justifyContent: "center",
        alignItems: "center",
    },
    innerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#148311",
    },
    label: {
        marginLeft: 10,
        fontSize: 16,
        fontFamily: "PoppinsRegular",
    }
});
