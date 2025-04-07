import { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Audio } from 'expo-av';

export default function PlayAudioScreen() {
    const [sound, setSound] = useState(null);
    const [status, setStatus] = useState(null);

    const onPlaybackStatusUpdate = playbackStatus => {
        if (playbackStatus.isLoaded) {
            setStatus(playbackStatus);
        }
    };

    async function playSound() {
        if (sound) {
            await sound.replayAsync();
            return;
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
            require('../../assets/audio.mp3'),
            { shouldPlay: true },
            onPlaybackStatusUpdate
        );
        setSound(newSound);
    }

    async function stopSound() {
        if (sound) {
            await sound.stopAsync();
        }
    }

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    function formatTime(millis) {
        if (!millis) return '00:00';
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    return (
        <View style={styles.container}>
            <Button title="Play Sound" onPress={playSound} />
            <View style={styles.spacer} />
            <Button
                title="Stop Sound"
                onPress={stopSound}
                disabled={!status?.isPlaying}
            />
            <View style={styles.spacer} />
            {status && (
                <Text style={styles.text}>
                    {formatTime(status.positionMillis)} / {formatTime(status.durationMillis)}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 20,
    },
    spacer: {
        height: 20,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
    },
});
