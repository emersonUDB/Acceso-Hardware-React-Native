import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useCallback  } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function CamaraScreen() {
    const [facing, setFacing] = useState('back'); // eliminamos <CameraType>
    const [permission, requestPermission] = useCameraPermissions();
    const [isActive, setIsActive] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setIsActive(true);
            return () => setIsActive(false); // se ejecuta al salir de la pantalla
        }, [])
    );

    if (!permission) {
        // Los permisos de la cámara aún se están cargando.
        return <View />;
    }

    if (!permission.granted) {
        // Los permisos de la cámara no han sido concedidos.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Se necesita permiso para mostrar la cámara</Text>
                <Button onPress={requestPermission} title="Conceder permiso" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            {isActive && (
                <CameraView style={styles.camera} facing={facing}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <Text style={styles.text}>Cambiar cámara</Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
