import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useThemeStyles } from "../theme/useThemeStyles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTheme } from "../context/ThemeContext";

export default function RulesScreen() {
    const { colors } = useThemeStyles();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const cardBgColor = isDark ? "#1e1e1e" : "#ffffff";
    const borderColor = isDark ? "#333" : "#e0e0e0";
    const subTextColor = isDark ? "#aaaaaa" : "#666666";

    const rulesData = [
        {
            sectionTitle: "Setup",
            icon: "chess-board",
            content: "The chessboard consists of 64 squares (8x8). Each player starts with 16 pieces: 1 King, 1 Queen, 2 Rooks, 2 Knights, 2 Bishops, and 8 Pawns."
        },
        {
            sectionTitle: "Movement",
            icon: "chess",
            items: [
                { name: "King", icon: "chess-king", description: "Moves exactly one square in any direction (horizontal, vertical, or diagonal)." },
                { name: "Queen", icon: "chess-queen", description: "Moves any number of vacant squares in any direction (horizontal, vertical, or diagonal)." },
                { name: "Rook", icon: "chess-rook", description: "Moves any number of vacant squares horizontally or vertically." },
                { name: "Bishop", icon: "chess-bishop", description: "Moves any number of vacant squares diagonally." },
                { name: "Knight", icon: "chess-knight", description: "Moves in an 'L' shape (two squares in one direction, then one square perpendicular). It is the only piece that can jump over other pieces." },
                { name: "Pawn", icon: "chess-pawn", description: "Moves forward one square, but captures diagonally. On its very first move, it can advance two squares." }
            ]
        },
        {
            sectionTitle: "Special Moves",
            icon: "star",
            items: [
                { name: "Castling", description: "The King moves two squares towards the Rook, and the Rook jumps over the King. Allowed only if neither piece has moved, the path is clear, and the King is not in or passing through check." },
                { name: "En Passant", description: "If a pawn moves two squares forward and lands beside an opponent's pawn, the opponent can capture it on the very next turn." },
                { name: "Pawn Promotion", description: "When a pawn reaches the opposite end of the board, it must be replaced by a Queen, Rook, Bishop, or Knight." }
            ]
        },
        {
            sectionTitle: "Game End",
            icon: "flag-checkered",
            items: [
                { name: "Check", description: "The King is under direct attack by an opponent's piece. The player must make a move to escape check." },
                { name: "Checkmate", description: "The King is in check and there is no legal move to escape. The game is over and the attacking player wins." },
                { name: "Stalemate", description: "The player to move is NOT in check, but has no legal moves. The game ends in a draw." }
            ]
        }
    ];

    return (
        <View style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f2f2f6" }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={[styles.mainTitle, { color: colors.text }]}>Rules of Chess</Text>
                    <Text style={[styles.subtitle, { color: subTextColor }]}>Learn how to play the royal game</Text>
                </View>

                {rulesData.map((section, index) => (
                    <View key={index} style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Icon name={section.icon} size={20} color="#2e7d32" style={styles.sectionIcon} />
                            <Text style={[styles.sectionTitle, { color: subTextColor }]}>{section.sectionTitle.toUpperCase()}</Text>
                        </View>

                        <View style={[styles.card, { backgroundColor: cardBgColor, borderColor }]}>
                            {section.content ? (
                                <Text style={[styles.description, { color: colors.text }]}>{section.content}</Text>
                            ) : null}

                            {section.items && section.items.map((item, itemIndex) => (
                                <View key={itemIndex}>
                                    <View style={styles.itemRow}>
                                        {item.icon && (
                                            <View style={styles.iconContainer}>
                                                <Icon name={item.icon} size={22} color={colors.text} />
                                            </View>
                                        )}
                                        <View style={styles.itemTextContainer}>
                                            <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
                                            <Text style={[styles.itemDescription, { color: subTextColor }]}>{item.description}</Text>
                                        </View>
                                    </View>
                                    {itemIndex < section.items!.length - 1 && (
                                        <View style={[styles.divider, { backgroundColor: borderColor }]} />
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    header: {
        marginBottom: 25,
        marginTop: 0,
    },
    mainTitle: {
        fontSize: 34,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        marginTop: 5,
        fontWeight: "500",
    },
    sectionContainer: {
        marginBottom: 25,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        marginLeft: 8,
    },
    sectionIcon: {
        marginRight: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        letterSpacing: 1.5,
    },
    card: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        overflow: "hidden",
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 12,
    },
    iconContainer: {
        width: 32,
        alignItems: "center",
        marginRight: 12,
        marginTop: 2,
    },
    itemTextContainer: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
    },
    itemDescription: {
        fontSize: 15,
        lineHeight: 22,
    },
    divider: {
        height: 1,
        width: "100%",
    }
});
