import Sound from 'react-native-sound';

// Enable playback in silence mode
Sound.setCategory('Playback');

export const playSound = async (type: 'move' | 'capture' | 'check' | 'gameover') => {
    try {
        let soundModule: any;
        switch (type) {
            case 'move':
                soundModule = require('../../assets/sounds/move.mp3');
                break;
            case 'capture':
                soundModule = require('../../assets/sounds/capture.mp3');
                break;
            case 'check':
                soundModule = require('../../assets/sounds/check.mp3');
                break;
            case 'gameover':
                soundModule = require('../../assets/sounds/gameover.mp3');
                break;
        }
        
        if (soundModule) {
            const sound = new Sound(soundModule, (error) => {
                if (error) {
                    console.warn('failed to load the sound', error);
                    return;
                }
                sound.play((success) => {
                    if (success) {
                        sound.release();
                    } else {
                        console.warn('playback failed due to audio decoding errors');
                    }
                });
            });
        }
    } catch (e) {
        console.warn("Failed to play sound", e);
    }
};
