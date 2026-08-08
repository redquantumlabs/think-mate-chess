import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useThemeStyles } from "../theme/useThemeStyles";

export default function RulesScreen() {
    const { colors } = useThemeStyles();

    const rules = {
        title: "Rules of Chess",
        content: `1. Setup
The chessboard consists of 64 squares (8x8). Each player starts with 16 pieces: 1 King, 1 Queen, 2 Rooks, 2 Knights, 2 Bishops, and 8 Pawns.

2. Movement
• King: Moves exactly one square in any direction (horizontal, vertical, or diagonal).
• Queen: Moves any number of vacant squares in any direction (horizontal, vertical, or diagonal).
• Rook: Moves any number of vacant squares horizontally or vertically.
• Bishop: Moves any number of vacant squares diagonally.
• Knight: Moves in an 'L' shape (two squares in one direction, then one square perpendicular). It is the only piece that can jump over other pieces.
• Pawn: Moves forward one square, but captures diagonally. On its very first move, it can advance two squares.

3. Special Moves
• Castling: A move involving the King and a Rook. The King moves two squares towards the Rook, and the Rook jumps over the King. Allowed only if neither piece has moved, the path is clear, and the King is not in or passing through check.
• En Passant: If a pawn moves two squares forward and lands beside an opponent's pawn, the opponent can capture it on the very next turn as if it had only moved one square.
• Pawn Promotion: When a pawn reaches the opposite end of the board, it must be replaced by a Queen, Rook, Bishop, or Knight of the same color.

4. Game End
• Check: The King is under direct attack by an opponent's piece. The player must make a move to escape check.
• Checkmate: The King is in check and there is no legal move to escape. The game is over and the attacking player wins.
• Stalemate: The player to move is NOT in check, but has no legal moves. The game ends in a draw.`,
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={[styles.title, { color: colors.text }]}>
                    {rules.title}
                </Text>
                <Text style={[styles.content, { color: colors.text }]}>
                    {rules.content}
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    content: {
        fontSize: 16,
        lineHeight: 26,
    },
});
