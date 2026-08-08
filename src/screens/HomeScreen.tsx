import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useThemeStyles } from "../theme/useThemeStyles";
import { useGameSettings } from "../context/GameSettingsContext";
import { game, isGameOver, resetGame } from "../game/engine";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function HomeScreen({ navigation }: any) {
    const { colors } = useThemeStyles();
    const { gameMode, playerColor } = useGameSettings();

    const [modalVisible, setModalVisible] = useState(false);
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [hasOngoingGame, setHasOngoingGame] = useState(false);

    const [fadeAnim] = useState(new Animated.Value(0));
    const [slideAnim] = useState(new Animated.Value(30));

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 6,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    useFocusEffect(
        useCallback(() => {
            setHasOngoingGame(game.history().length > 0 && !isGameOver());
        }, [])
    );

    const handlePlayClick = () => {
        setModalVisible(true);
        setName1("");
        setName2("");
    };

    const handleResumeGame = () => {
        let whiteName = "";
        let blackName = "";

        if (gameMode === "single") {
            if (playerColor === "w") {
                whiteName = name1;
                blackName = "Computer";
            } else {
                blackName = name1;
                whiteName = "Computer";
            }
        } else {
            whiteName = name1;
            blackName = name2;
        }

        navigation.navigate("Game", { whiteName, blackName });
    };

    const startGame = () => {
        resetGame();
        setModalVisible(false);
        let whiteName = "";
        let blackName = "";

        if (gameMode === "single") {
            if (playerColor === "w") {
                whiteName = name1;
                blackName = "Computer";
            } else {
                blackName = name1;
                whiteName = "Computer";
            }
        } else {
            whiteName = name1;
            blackName = name2;
        }

        navigation.navigate("Game", { whiteName, blackName });
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: colors.background },
            ]}
        >
            <Animated.View style={[
                styles.contentContainer,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                }
            ]}>
                <View style={styles.headerContainer}>
                    <Icon name="chess" size={80} color={colors.text} style={styles.heroIcon} />
                    <Text
                        style={[
                            styles.title,
                            { color: colors.text },
                        ]}
                    >
                        ThinkMate Chess
                    </Text>
                    <Text style={[styles.subtitle, { color: colors.text }]}>Master your mind</Text>
                </View>

                <View style={styles.actionContainer}>
                    {hasOngoingGame ? (
                        <>
                            <TouchableOpacity
                                style={[
                                    styles.primaryButton,
                                    { backgroundColor: colors.accent },
                                ]}
                                onPress={handleResumeGame}
                                activeOpacity={0.8}
                            >
                                <Icon name="play-circle" size={20} color="white" style={styles.buttonIcon} />
                                <Text style={styles.primaryButtonText}>Resume Game</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.secondaryButton,
                                    { borderColor: colors.accent },
                                ]}
                                onPress={handlePlayClick}
                                activeOpacity={0.8}
                            >
                                <Icon name="plus-circle" size={20} color={colors.accent} style={styles.buttonIcon} />
                                <Text style={[styles.secondaryButtonText, { color: colors.accent }]}>New Game</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity
                            style={[
                                styles.primaryButton,
                                { backgroundColor: colors.accent },
                            ]}
                            onPress={handlePlayClick}
                            activeOpacity={0.8}
                        >
                            <Icon name="play" size={20} color="white" style={styles.buttonIcon} />
                            <Text style={styles.primaryButtonText}>Play Now</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </Animated.View>

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalBox, { backgroundColor: colors.customBackground }]}>
                        <View style={styles.modalHeader}>
                            <Icon name="user-friends" size={24} color={colors.text} style={{marginRight: 10}} />
                            <Text style={[styles.modalTitle, { color: colors.text }]}>Player Names</Text>
                        </View>

                        {gameMode === "single" ? (
                            <TextInput
                                style={[styles.input, { color: colors.text, borderColor: colors.text, backgroundColor: colors.customBackground === '#121212' ? '#1e1e1e' : '#f9f9f9' }]}
                                placeholder="Your Name (Optional)"
                                placeholderTextColor="#888"
                                value={name1}
                                onChangeText={setName1}
                            />
                        ) : (
                            <>
                                <TextInput
                                    style={[styles.input, { color: colors.text, borderColor: colors.text, backgroundColor: colors.customBackground === '#121212' ? '#1e1e1e' : '#f9f9f9' }]}
                                    placeholder="Player 1 (White) Name"
                                    placeholderTextColor="#888"
                                    value={name1}
                                    onChangeText={setName1}
                                />
                                <TextInput
                                    style={[styles.input, { color: colors.text, borderColor: colors.text, backgroundColor: colors.customBackground === '#121212' ? '#1e1e1e' : '#f9f9f9' }]}
                                    placeholder="Player 2 (Black) Name"
                                    placeholderTextColor="#888"
                                    value={name2}
                                    onChangeText={setName2}
                                />
                            </>
                        )}

                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton} activeOpacity={0.7}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={startGame} style={[styles.startButton, { backgroundColor: colors.accent }]} activeOpacity={0.7}>
                                <Text style={styles.startButtonText}>Start Game</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingVertical: 40,
    },
    headerContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    heroIcon: {
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 10,
    },
    title: {
        fontSize: 38,
        fontWeight: "900",
        letterSpacing: 1,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        marginTop: 8,
        opacity: 0.7,
        fontWeight: "500",
        letterSpacing: 2,
        textTransform: "uppercase",
    },
    actionContainer: {
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    primaryButton: {
        flexDirection: "row",
        paddingVertical: 18,
        paddingHorizontal: 30,
        borderRadius: 30,
        width: "85%",
        alignItems: "center",
        justifyContent: "center",
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginBottom: 15,
    },
    primaryButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 1,
    },
    secondaryButton: {
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 30,
        width: "85%",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        marginBottom: 15,
    },
    secondaryButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 1,
    },
    buttonIcon: {
        marginRight: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        width: "85%",
        padding: 25,
        borderRadius: 20,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 15,
    },
    cancelButton: {
        paddingVertical: 14,
        borderRadius: 12,
        flex: 1,
        marginRight: 10,
        alignItems: "center",
        backgroundColor: "#e0e0e0",
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555",
    },
    startButton: {
        paddingVertical: 14,
        borderRadius: 12,
        flex: 1,
        marginLeft: 10,
        alignItems: "center",
        elevation: 2,
    },
    startButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
});