import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;

function Header({ onMenuPress }) {
    const router = useRouter();
    return (
        <View style={styles.header}>
            <View style={styles.headerTopRow}>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="chevron-circle-left" size={40} margin={5} color="#148311" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('perfil')}>
                    <Ionicons name="person-circle" size={40} color="#148311" />
                </TouchableOpacity>
            </View>
            <Text style={styles.headerTitle}>Agendamento</Text>
        </View>
    );
}

function TimePicker() {
    const hours = Array.from({ length: 24 }, (_, i) => i % 24);
    const minutes = Array.from({ length: 60 }, (_, i) => i % 60);

    const [selectedHour, setSelectedHour] = useState(12);
    const [selectedMinute, setSelectedMinute] = useState(0);

    const hourScrollViewRef = useRef(null);
    const minuteScrollViewRef = useRef(null);
    const ITEM_HEIGHT = 40;
    const VIEW_HEIGHT = 120;
    const CENTER_OFFSET = (VIEW_HEIGHT / 2) - (ITEM_HEIGHT / 2);

    useEffect(() => {
        const initialHourIndex = hours.indexOf(12, 1);
        if (initialHourIndex > -1 && hourScrollViewRef.current) {
            hourScrollViewRef.current.scrollTo({ y: initialHourIndex * ITEM_HEIGHT, animated: false });
        }

        const initialMinuteIndex = minutes.indexOf(0, 1);
        if (initialMinuteIndex > -1 && minuteScrollViewRef.current) {
            minuteScrollViewRef.current.scrollTo({ y: initialMinuteIndex * ITEM_HEIGHT, animated: false });
        }
    }, []);

    const onHourScroll = (event) => {
        const y = event.nativeEvent.contentOffset.y;
        const middleIndex = Math.round(y / ITEM_HEIGHT);
        const newHour = hours[middleIndex];
        if (newHour !== selectedHour) {
            setSelectedHour(newHour);
        }
    };

    const onMinuteScroll = (event) => {
        const y = event.nativeEvent.contentOffset.y;
        const middleIndex = Math.round(y / ITEM_HEIGHT);
        const newMinute = minutes[middleIndex];
        if (newMinute !== selectedMinute) {
            setSelectedMinute(newMinute);
        }
    };

    const formatTime = (time) => time < 10 ? `0${time}` : `${time}`;

    return (
        <View style={styles.timePickerContainer}>
            <View style={styles.pickerColumn}>
                <ScrollView
                    ref={hourScrollViewRef}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate="fast"
                    onMomentumScrollEnd={onHourScroll}
                    onScrollEndDrag={onHourScroll}
                    onScroll={onHourScroll}
                    scrollEventThrottle={16}
                >
                    <View style={{ height: CENTER_OFFSET }} />
                    {hours.map((hour, index) => (
                        <Text
                            key={index}
                            style={[
                                styles.pickerItem,
                                selectedHour === hour && styles.selectedPickerItem,
                            ]}
                        >
                            {formatTime(hour)}
                        </Text>
                    ))}
                    <View style={{ height: CENTER_OFFSET }} />
                </ScrollView>
                <View style={styles.selectionIndicator} />
            </View>
            <Text style={styles.pickerSeparator}>:</Text>
            <View style={styles.pickerColumn}>
                <ScrollView
                    ref={minuteScrollViewRef}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate="fast"
                    onMomentumScrollEnd={onMinuteScroll}
                    onScrollEndDrag={onMinuteScroll}
                    onScroll={onMinuteScroll}
                    scrollEventThrottle={16}
                >
                    <View style={{ height: CENTER_OFFSET }} />
                    {minutes.map((minute, index) => (
                        <Text
                            key={index}
                            style={[
                                styles.pickerItem,
                                selectedMinute === minute && styles.selectedPickerItem,
                            ]}
                        >
                            {formatTime(minute)}
                        </Text>
                    ))}
                    <View style={{ height: CENTER_OFFSET }} />
                </ScrollView>
                <View style={styles.selectionIndicator} />
            </View>
        </View>
    );
}

export default function AppointmentScreen() {
    const router = useRouter();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);
    const positionX = useSharedValue(screenWidth);

    useEffect(() => {
        positionX.value = withTiming(0, { duration: 300 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: positionX.value }],
        };
    });

    const toggleDrawer = () => {
        if (!isDrawerVisible) {
            setShouldRenderDrawer(true);
        }
        setIsDrawerVisible(!isDrawerVisible);
    };

    const handleBack = () => {
        positionX.value = withTiming(-screenWidth, { duration: 300 }, (isFinished) => {
            if (isFinished) {
                runOnJS(router.push)('inicio');
            }
        });
    };

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <SafeAreaView style={{ flex: 1 }}>
                <Header onMenuPress={toggleDrawer} />
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.content}>
                        <Text style={styles.subtitle}>
                            Informe seus horários disponíveis para coleta.
                        </Text>
                        <TimePicker />
                        <TouchableOpacity
                            style={styles.proceedButton}
                            onPress={() => router.push('local')}
                        >
                            <Text style={styles.proceedButtonText}>Prosseguir</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {shouldRenderDrawer && (
                    <DrawerMenu
                        isVisible={isDrawerVisible}
                        onClose={toggleDrawer}
                        setShouldRenderDrawer={setShouldRenderDrawer}
                    />
                )}
            </SafeAreaView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 0,
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
        marginTop: 30
    },
    headerTitle: {
        fontSize: 22,
        color: '#148311',
        fontWeight: 'bold',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 80,
    },
    content: {
        width: '100%',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#148311',
        marginBottom: 40,
        textAlign: 'center',
    },
    timePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    pickerColumn: {
        width: 80,
        height: 120,
        borderRadius: 10,
        marginHorizontal: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    selectionIndicator: {
        position: 'absolute',
        top: '33.33%',
        width: '100%',
        height: 40,
        borderColor: '#148311',
        borderTopWidth: 2,
        borderBottomWidth: 2,
    },
    pickerItem: {
        height: 40,
        textAlign: 'center',
        lineHeight: 40,
        fontSize: 20,
        color: '#ccc',
    },
    selectedPickerItem: {
        color: '#000',
        fontWeight: 'bold',
    },
    pickerSeparator: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#148311',
    },
    proceedButton: {
        width: '80%',
        height: 50,
        backgroundColor: '#148311',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    proceedButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
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
});
