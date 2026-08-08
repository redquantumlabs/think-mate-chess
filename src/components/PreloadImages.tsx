import React from "react";
import { View, Image } from "react-native";
import { getPieceAssetSource } from "../game/pieceAssets";
import { PieceStyle } from "../context/GameSettingsContext";

const STYLES: PieceStyle[] = ["3d", "crystal", "glass", "wooden", "staunton", "california", "merida", "uscf", "cardinal"];
const PIECES = ["wp", "wn", "wb", "wr", "wq", "wk", "bp", "bn", "bb", "br", "bq", "bk"];

export default function PreloadImages() {
    return (
        <View style={{ position: "absolute", opacity: 0, width: 0, height: 0, overflow: "hidden" }}>
            {STYLES.map(style => 
                PIECES.map(piece => {
                    const src = getPieceAssetSource(piece[0], piece[1], style);
                    if (src) {
                        return <Image key={`${style}-${piece}`} source={src} />;
                    }
                    return null;
                })
            )}
        </View>
    );
}
