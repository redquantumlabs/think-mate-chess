import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, Linking } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useGameSettings, PieceStyle, Difficulty } from "../context/GameSettingsContext";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function SettingsScreen() {
    const { theme, toggleTheme } = useTheme();
    const { pieceStyle, setPieceStyle, gameMode, setGameMode, playerColor, setPlayerColor, soundEnabled, setSoundEnabled, showMoves, setShowMoves, showPoints, setShowPoints, difficulty, setDifficulty } = useGameSettings();

    const isDark = theme === "dark";

    const cardBgColor = isDark ? "#1e1e1e" : "#ffffff";
    const textColor = isDark ? "#ffffff" : "#000000";
    const subTextColor = isDark ? "#aaaaaa" : "#666666";
    const accentColor = "#2e7d32";

    return (
        <ScrollView
            style={[
                styles.container,
                isDark ? styles.darkBg : styles.lightBg,
            ]}
            contentContainerStyle={styles.contentContainer}
        >
            <View style={styles.header}>
                <Text style={[styles.mainTitle, { color: textColor }]}>Settings</Text>
            </View>

            {/* PREFERENCES SECTION */}
            <Text style={[styles.sectionTitle, { color: subTextColor }]}>PREFERENCES</Text>
            <View style={[styles.card, { backgroundColor: cardBgColor, borderColor: isDark ? '#333' : '#e0e0e0' }]}>
                <View style={styles.toggleRow}>
                    <Text style={[styles.toggleLabel, { color: textColor }]}>Dark Mode</Text>
                    <Switch
                        value={isDark}
                        onValueChange={toggleTheme}
                        trackColor={{ false: "#767577", true: accentColor }}
                        thumbColor={isDark ? "#ffffff" : "#f4f3f4"}
                    />
                </View>
                <View style={styles.divider} />
                <View style={styles.toggleRow}>
                    <Text style={[styles.toggleLabel, { color: textColor }]}>Sound</Text>
                    <Switch
                        value={soundEnabled}
                        onValueChange={setSoundEnabled}
                        trackColor={{ false: "#767577", true: accentColor }}
                        thumbColor={soundEnabled ? "#ffffff" : "#f4f3f4"}
                    />
                </View>
                <View style={styles.divider} />
                <View style={styles.toggleRow}>
                    <Text style={[styles.toggleLabel, { color: textColor }]}>Show Moves & Highlights</Text>
                    <Switch
                        value={showMoves}
                        onValueChange={setShowMoves}
                        trackColor={{ false: "#767577", true: accentColor }}
                        thumbColor={showMoves ? "#ffffff" : "#f4f3f4"}
                    />
                </View>
                <View style={styles.divider} />
                <View style={[styles.toggleRow, { borderBottomWidth: 0 }]}>
                    <Text style={[styles.toggleLabel, { color: textColor }]}>Show Points</Text>
                    <Switch
                        value={showPoints}
                        onValueChange={setShowPoints}
                        trackColor={{ false: "#767577", true: accentColor }}
                        thumbColor={showPoints ? "#ffffff" : "#f4f3f4"}
                    />
                </View>
            </View>

            {/* GAMEPLAY SECTION */}
            <Text style={[styles.sectionTitle, { color: subTextColor }]}>GAMEPLAY</Text>
            <View style={[styles.card, { backgroundColor: cardBgColor, borderColor: isDark ? '#333' : '#e0e0e0' }]}>
                <View style={styles.toggleRow}>
                    <Text style={[styles.toggleLabel, { color: textColor }]}>Two Player Mode</Text>
                    <Switch
                        value={gameMode === "two"}
                        onValueChange={(val) => setGameMode(val ? "two" : "single")}
                        trackColor={{ false: "#767577", true: accentColor }}
                        thumbColor={gameMode === "two" ? "#ffffff" : "#f4f3f4"}
                    />
                </View>

                {gameMode === "single" && (
                    <>
                        <View style={styles.divider} />
                        <View style={styles.inlineSelectorContainer}>
                            <Text style={[styles.toggleLabel, { color: textColor }]}>Play as</Text>
                            <View style={[styles.segmentedControl, { backgroundColor: isDark ? "#333" : "#ddd" }]}>
                                <TouchableOpacity
                                    style={[styles.segmentButton, playerColor === "w" && { backgroundColor: accentColor }]}
                                    onPress={() => setPlayerColor("w")}
                                >
                                    <Text style={[styles.segmentText, { color: playerColor === "w" ? "white" : textColor }]}>White</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.segmentButton, playerColor === "b" && { backgroundColor: accentColor }]}
                                    onPress={() => setPlayerColor("b")}
                                >
                                    <Text style={[styles.segmentText, { color: playerColor === "b" ? "white" : textColor }]}>Black</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.divider} />
                        <View style={styles.inlineSelectorContainer}>
                            <Text style={[styles.toggleLabel, { color: textColor }]}>Difficulty</Text>
                            <View style={[styles.segmentedControl, { backgroundColor: isDark ? "#333" : "#ddd" }]}>
                                {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
                                    <TouchableOpacity
                                        key={diff}
                                        style={[styles.segmentButton, difficulty === diff && { backgroundColor: accentColor }]}
                                        onPress={() => setDifficulty(diff)}
                                    >
                                        <Text style={[
                                            styles.segmentText,
                                            { fontSize: 13, color: difficulty === diff ? "white" : textColor }
                                        ]}>{diff.charAt(0).toUpperCase() + diff.slice(1)}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </>
                )}
            </View>

            {/* VISUALS SECTION */}
            <Text style={[styles.sectionTitle, { color: subTextColor }]}>PIECE STYLE</Text>
            <View style={[styles.card, { backgroundColor: cardBgColor, borderColor: isDark ? '#333' : '#e0e0e0' }]}>
                <View style={styles.pieceStyleGrid}>
                    {(["symbol", "3d", "crystal", "glass", "wooden", "staunton", "california", "merida", "uscf", "cardinal"] as PieceStyle[]).map((style) => (
                        <TouchableOpacity
                            key={style}
                            style={[
                                styles.gridOption,
                                { backgroundColor: isDark ? "#333" : "#ddd" },
                                pieceStyle === style && { borderWidth: 2, borderColor: accentColor },
                            ]}
                            onPress={() => setPieceStyle(style)}
                        >
                            <Text style={[{ color: textColor, fontSize: 13, fontWeight: pieceStyle === style ? "bold" : "normal" }]} numberOfLines={1} adjustsFontSizeToFit>
                                {style === "3d" ? "3D" : style === "uscf" ? "USCF" : style.charAt(0).toUpperCase() + style.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* ABOUT SECTION */}
            <Text style={[styles.sectionTitle, { color: subTextColor }]}>ABOUT</Text>
            <View style={[styles.card, { backgroundColor: cardBgColor, borderColor: isDark ? '#333' : '#e0e0e0', marginBottom: 40 }]}>
                <TouchableOpacity onPress={() => Linking.openURL('https://sites.google.com/view/thinkmate-chess-legal/privacy-policy')} style={styles.aboutRow}>
                    <Text style={[styles.aboutText, { color: textColor }]}>Privacy Policy</Text>
                    <Icon name="chevron-right" size={14} color={subTextColor} />
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity onPress={() => Linking.openURL('https://sites.google.com/view/thinkmate-chess-legal/terms-conditions')} style={[styles.aboutRow, { borderBottomWidth: 0 }]}>
                    <Text style={[styles.aboutText, { color: textColor }]}>Terms & Conditions</Text>
                    <Icon name="chevron-right" size={14} color={subTextColor} />
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    lightBg: {
        backgroundColor: "#f2f2f6",
    },
    darkBg: {
        backgroundColor: "#121212",
    },
    header: {
        marginBottom: 10,
        marginTop: 0,
    },
    mainTitle: {
        fontSize: 34,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: "bold",
        letterSpacing: 1.5,
        marginBottom: 8,
        marginLeft: 12,
        marginTop: 10,
    },
    card: {
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        overflow: "hidden",
    },
    divider: {
        height: 1,
        backgroundColor: "rgba(150, 150, 150, 0.2)",
        width: "100%",
    },
    toggleRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
    },
    toggleLabel: {
        fontSize: 16,
        fontWeight: "500",
    },
    inlineSelectorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
    },
    segmentedControl: {
        flexDirection: "row",
        borderRadius: 8,
        overflow: "hidden",
        width: 180,
    },
    segmentButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    segmentText: {
        fontSize: 14,
        fontWeight: "600",
    },
    pieceStyleGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingVertical: 8,
        gap: 8,
    },
    gridOption: {
        width: "31%",
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginBottom: 4,
    },
    aboutRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
    },
    aboutText: {
        fontSize: 16,
        fontWeight: "500",
    },
});