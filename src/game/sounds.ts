import Sound from 'react-native-sound';

// Enable playback in silence mode
Sound.setCategory('Playback');

export const playSound = async (type: 'move' | 'capture' | 'check' | 'gameover') => {
    try {
        let soundModule: string | undefined;
        switch (type) {
            case 'move':
                soundModule = 'move.mp3';
                break;
            case 'capture':
                soundModule = 'capture.mp3';
                break;
            case 'check':
                soundModule = 'check.mp3';
                break;
            case 'gameover':
                soundModule = 'gameover.mp3';
                break;
        }
        
        if (soundModule) {
            const sound = new Sound(soundModule, Sound.MAIN_BUNDLE, (error) => {
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
