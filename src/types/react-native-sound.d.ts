declare module 'react-native-sound' {
    export default class Sound {
        constructor(filename: string | any, errorCallback: (error: any) => void);
        constructor(filename: string | any, basePath: string, errorCallback: (error: any) => void);
        play(onEnd?: (success: boolean) => void): this;
        pause(cb?: () => void): this;
        stop(cb?: () => void): this;
        release(): void;
        static setCategory(value: string): void;
    }
}
