import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Calendar({ selectedDate, setSelectedDate }) {
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

    const calendarDays = [
        ...Array(firstDayIndex).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
    ];

    function nextMonth() {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    }

    function prevMonth() {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    }

    return (
        <View style={styles.calendarContainer}>

            <View style={styles.monthHeader}>
                <TouchableOpacity onPress={prevMonth}>
                    <Ionicons name="chevron-back" size={24} color="#148311" />
                </TouchableOpacity>

                <Text style={styles.monthText}>
                    {new Date(currentYear, currentMonth).toLocaleString("pt-BR", {
                        month: "long",
                        year: "numeric",
                    })}
                </Text>

                <TouchableOpacity onPress={nextMonth}>
                    <Ionicons name="chevron-forward" size={24} color="#148311" />
                </TouchableOpacity>
            </View>

            <View style={styles.daysOfWeekContainer}>
                {daysOfWeek.map((day, index) => (
                    <Text key={index} style={styles.dayOfWeekText}>{day}</Text>
                ))}
            </View>

            <View style={styles.datesGrid}>
                {calendarDays.map((date, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.dateCell,
                            date &&
                            selectedDate instanceof Date &&
                            date === selectedDate.getDate() &&
                            currentMonth === selectedDate.getMonth() &&
                            currentYear === selectedDate.getFullYear() &&
                            styles.selectedDateCell,
                        ]}
                        onPress={() => {
                            if (date) {
                                const fullDate = new Date(currentYear, currentMonth, date);
                                setSelectedDate(fullDate);
                            }
                        }}
                        disabled={!date}
                    >
                        <Text
                            style={
                                selectedDate instanceof Date &&
                                    date === selectedDate?.getDate() &&
                                    currentMonth === selectedDate?.getMonth() &&
                                    currentYear === selectedDate?.getFullYear()
                                    ? styles.selectedDateText
                                    : styles.dateText
                            }
                        >
                            {date ?? ""}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    calendarContainer: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 25,
        marginBottom: 20,
        borderWidth: 1.5,
        borderColor: "#148311",
    },
    monthHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    monthText: {
        fontSize: 18,
        color: "#148311",
        fontFamily: "PoppinsBold",
        textTransform: "capitalize",
    },
    daysOfWeekContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#148311",
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 15,
    },
    dayOfWeekText: {
        color: "#f8ffe3",
        fontWeight: "bold",
        fontSize: 16,
    },
    datesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'flex-start',
    },
    dateCell: {
        width: "14%",
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 50,
    },
    selectedDateCell: {
        backgroundColor: "#edffb9",
        borderWidth: 1.5,
        borderColor: "#4ca444",
    },
    dateText: {
        fontSize: 16,
        color: "#4ca444",
    },
    selectedDateText: {
        fontSize: 14,
        color: "#148311",
        fontWeight: "bold",
    },
});