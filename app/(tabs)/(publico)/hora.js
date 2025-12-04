import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter, useLocalSearchParams, router } from 'expo-router';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS
} from 'react-native-reanimated';
import HeaderAgend from '../../../components/headerAgend';

const screenWidth = Dimensions.get('window').width;

function TimePicker(props) {
    const hours = Array.from({ length: 24 }, (_, i) => i % 24);
    const minutes = Array.from({ length: 60 }, (_, i) => i % 60);

    const { selectedHour, selectedMinute, onChangeHour, onChangeMinute } = props;

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
            onChangeHour(newHour);
        }
    };

    const onMinuteScroll = (event) => {
        const y = event.nativeEvent.contentOffset.y;
        const middleIndex = Math.round(y / ITEM_HEIGHT);
        const newMinute = minutes[middleIndex];
        if (newMinute !== selectedMinute) {
            onChangeMinute(newMinute);
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
    const [hour, setHour] = useState(12);
    const [minute, setMinute] = useState(0);

    const params = useLocalSearchParams();
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
                <HeaderAgend onMenuPress={toggleDrawer} />
                <Text style={styles.headerTitle}>Agendamento</Text>

                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.content}>
                        <Text style={styles.subtitle}>
                            Informe seus horários disponíveis para coleta.
                        </Text>
                        <TimePicker
                            selectedHour={hour}
                            selectedMinute={minute}
                            onChangeHour={setHour}
                            onChangeMinute={setMinute}
                        />

                        <TouchableOpacity
                            style={styles.proceedButton}
                            onPress={() =>
                                router.push({
                                    pathname: "local",
                                    params: {
                                        data: params.data,
                                        horario: `${hour}:${minute}`
                                    }
                                })
                            }
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
    headerTitle: {
        fontSize: 20,
        color: '#148311',
        fontFamily: 'PoppinsBold',
        alignSelf: 'center'
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
        fontSize: 15,
        color: '#148311',
        marginBottom: 40,
        textAlign: 'center',
        fontFamily: 'PoppinsRegular'
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
        width: '60%',
        height: 50,
        backgroundColor: '#148311',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    proceedButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'PoppinsRegular'
    },
});
