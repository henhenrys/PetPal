import React, { useState, useRef } from "react";
import { Text, View, Button, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, } from "react-native";
import { router } from "expo-router";
import { Audio } from "expo-av";

export default function LiveFeed() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentVideoBase64, setCurrentVideoBase64] = useState<string | null>(null);
  const [nextVideoBase64, setNextVideoBase64] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [imageKey, setImageKey] = useState(0);

  const videoWs = useRef<WebSocket | null>(null);
  const audioWs = useRef<WebSocket | null>(null);
  const lastVideoUpdate = useRef<number>(0);

  const ip = "100.80.243.29";

  const recordingOptions = {
    ios: {
      extension: ".caf",
      audioQuality: 127,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    android: {
      extension: ".m4a",
      outputFormat: 2,
      audioEncoder: 3,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
  };

  const handleImageLoad = () => {
    if (nextVideoBase64 && nextVideoBase64 !== currentVideoBase64) {
      setCurrentVideoBase64(nextVideoBase64);
      setImageKey(prev => prev + 1);
    }
    setIsVideoLoading(false);
  };

  const startStream = () => {
    if (isStreaming) return;

    // Video WebSocket
    videoWs.current = new WebSocket(`ws://${ip}:8080/video`);
    videoWs.current.onopen = () => {
      console.log("Video WebSocket connected");
      setIsVideoLoading(true);
    };
    videoWs.current.onmessage = (event) => {
      if (!currentVideoBase64) {
          // First frame - display immediately
          setCurrentVideoBase64(event.data);
          setIsVideoLoading(false);
        } else {
          // Subsequent frames - queue for smooth transition
          setNextVideoBase64(event.data);
        }
    };
    videoWs.current.onclose = () => {
      console.log("Video WebSocket closed");
      setCurrentVideoBase64(null);
      setNextVideoBase64(null);
    };

    // Audio WebSocket (Receive-only placeholder)
    audioWs.current = new WebSocket(`ws://${ip}:8080/audio`);
    audioWs.current.binaryType = "arraybuffer";
    audioWs.current.onopen = () => {
      console.log("Audio WebSocket connected");
    };
    audioWs.current.onmessage = async (event) => {
      console.log("Audio data received (not playable in React Native)");
    };
    audioWs.current.onclose = () => {
      console.log("Audio WebSocket closed");
    };

    // Start backend stream
    fetch(`http://${ip}:8080/control/start`, { method: "POST" })
      .then(() => setIsStreaming(true))
      .catch((err) => console.error("Start stream error:", err));
  };

  const stopStream = () => {
    videoWs.current?.close();
    videoWs.current = null;
    audioWs.current?.close();
    audioWs.current = null;

    fetch(`http://${ip}:8080/control/stop`, { method: "POST" })
      .then(() => {
        setIsStreaming(false);
        setCurrentVideoBase64(null);
        setNextVideoBase64(null);
      })
      .catch((err) => console.error("Stop stream error:", err));
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access microphone is required!");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(recordingOptions);
      await recordingInstance.startAsync();

      setRecording(recordingInstance);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      console.log("Recording stopped and stored at", uri);
      if (uri) await sendAudioFile(uri);
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  const sendAudioFile = async (uri: string) => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri,
        name: "chunk.webm",
        type: "audio/webm",
      } as any);

      const response = await fetch("https://petpal-3yfg.onrender.com/api/sound", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Server response:", result);
    } catch (err) {
      console.error("Error sending audio file:", err);
    }
  };

  const moveCamera = (direction: string) => {
    fetch("https://petpal-3yfg.onrender.com/movecam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    }).then((res) => {
      if (!res.ok) console.error("Failed to send move command:", direction);
    }).catch((err) => {
      console.error("Error sending move command:", err);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>PetPal</Text>
      </View>

      <View style={styles.deviceImageWrapper}>
        {isVideoLoading && !currentVideoBase64 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View style={styles.imageContainer}>
            {currentVideoBase64 && (
              <Image
                key={imageKey}
                style={styles.video}
                source={{ uri: `data:image/jpeg;base64,${currentVideoBase64}` }}
                onLoad={handleImageLoad}
                onError={(e) => console.error("Image load error:", e.nativeEvent.error)}
                fadeDuration={0}
              />
            )}
            {nextVideoBase64 && (
              <Image
                key={`next-${imageKey}`}
                style={[styles.video, styles.hiddenImage]}
                source={{ uri: `data:image/jpeg;base64,${nextVideoBase64}` }}
                onLoad={handleImageLoad}
                onError={(e) => console.error("Next image load error:", e.nativeEvent.error)}
              />
            )}
            {!currentVideoBase64 && (
              <Image
                style={styles.video}
                source={require("../../assets/images/react-logo.png")}
              />
            )}
          </View>
        )}
      </View>

      <View style={styles.streamButtons}>
        <Button title="Start Stream" onPress={startStream} disabled={isStreaming} />
        <View style={{ marginTop: 10 }} />
        <Button title="Stop Stream" onPress={stopStream} disabled={!isStreaming} />
      </View>

      <View style={{ margin: 20 }}>
        <Button title="Start Recording" onPress={startRecording} disabled={!!recording} />
        <View style={{ marginTop: 10 }} />
        <Button title="Stop Recording" onPress={stopRecording} disabled={!recording} />
      </View>

      <View style={styles.dirControls}>
        {["up", "down", "left", "right"].map((dir) => (
          <TouchableOpacity
            key={dir}
            style={styles.dirBtn}
            onPress={() => moveCamera(dir)}
          >
            <Text style={styles.dirBtnText}>{dir.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Dispense" onPress={() => router.push("/tabs/dispense")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  titleBox: {
    borderColor: "black",
    borderWidth: 1,
    marginHorizontal: 40,
    borderRadius: 30,
    marginTop: 60,
    marginBottom: 30,
    backgroundColor: "#7fc4db",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  deviceImageWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    minHeight: 300,
  },
  imageContainer: {
    width: "100%",
    maxWidth: 400,
    aspectRatio: 4 / 3,
    alignSelf: "center",
    position: "relative",
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    backgroundColor: "hwb(255 50% 50%)",
    borderWidth: 2,
    borderColor: "#333",
    position: "absolute",
  },
  hiddenImage: {
    opacity: 0,
  },
  loadingContainer: {
    width: "100%",
    maxWidth: 400,
    aspectRatio: 4 / 3,
    alignSelf: "center",
    borderRadius: 12,
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  streamButtons: {
    marginVertical: 20,
  },
  dirControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  dirBtn: {
    backgroundColor: "#7fc4db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  dirBtnText: {
    fontWeight: "bold",
  },
});