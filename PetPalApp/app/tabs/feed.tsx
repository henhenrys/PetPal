import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import { Audio } from "expo-av";

export default function LiveFeed() {
  const [selected, setSelected] = useState("");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [videoBase64, setVideoBase64] = useState<string | null>(null);
  const videoWs = useRef<WebSocket | null>(null);
  const audioWs = useRef<WebSocket | null>(null);

  const ip = "100.80.243.29"; // Your streaming server IP


  const recordingOptions = {
    ios: {
      extension: ".caf",
      audioQuality: 127, // High quality (numeric constant)
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    android: {
      extension: ".m4a",
      outputFormat: 2, // MPEG_4 (numeric constant)
      audioEncoder: 3, // AAC (numeric constant)
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
  };

  // Start video and audio WebSocket streams
  const startStream = () => {
    if (isStreaming) return;

    // Start video WS
    videoWs.current = new WebSocket(`ws://${ip}:8080/video`);
    videoWs.current.onopen = () => {
      console.log("Video WebSocket connected");
    };
    videoWs.current.onmessage = (event) => {
      // event.data is base64 jpeg string
      setVideoBase64(event.data);
    };
    videoWs.current.onclose = () => {
      console.log("Video WebSocket closed");
      setVideoBase64(null);
    };

    // Start audio WS
    audioWs.current = new WebSocket(`ws://${ip}:8080/audio`);
    audioWs.current.binaryType = "arraybuffer";
    audioWs.current.onopen = () => {
      console.log("Audio WebSocket connected");
    };
    audioWs.current.onmessage = async (event) => {
      try {
        // AudioContext and Web Audio API do not exist in React Native environment,
        // so you’ll likely need a native module for audio streaming.
        // This is just a placeholder to show where audio processing would go.
        console.log("Received audio data chunk (not processed here in RN)");
      } catch (e) {
        console.error("Audio processing error:", e);
      }
    };
    audioWs.current.onclose = () => {
      console.log("Audio WebSocket closed");
    };

    fetch(`http://${ip}:8080/control/start`, { method: "POST" })
      .then(() => {
        setIsStreaming(true);
      })
      .catch((err) => console.error("Start stream error:", err));
  };

  // Stop streams and close connections
  const stopStream = () => {
    if (videoWs.current) {
      videoWs.current.close();
      videoWs.current = null;
    }
    if (audioWs.current) {
      audioWs.current.close();
      audioWs.current = null;
    }

    fetch(`http://${ip}:8080/control/stop`, { method: "POST" })
      .then(() => setIsStreaming(false))
      .catch((err) => console.error("Stop stream error:", err));
  };

  // Audio recording
  async function startRecording() {
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
  }

  async function stopRecording() {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      console.log("Recording stopped and stored at", uri);

      if (uri) {
        await sendAudioFile(uri);
      }
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  }

  async function sendAudioFile(uri: string) {
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
  }

  // Camera move controls (POST to remote API)
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>PetPal</Text>
        </View>

        <View style={styles.deviceImageWrapper}>
          {videoBase64 ? (
            <Image
              style={styles.video}
              source={{ uri: `data:image/jpeg;base64,${videoBase64}` }}
            />
          ) : (
            <Image
              style={styles.video}
              source={require("../../assets/images/react-logo.png")}
            />
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 10, marginBottom: 10, paddingHorizontal: 20, justifyContent: "center" },
  titleBox: {
    borderColor: "black",
    borderWidth: 1,
    marginHorizontal: 40,
    borderRadius: 30,
    marginTop: 60,
    marginBottom: 30,
    backgroundColor: "#7fc4db",
  },
  title: { fontSize: 50, fontWeight: "bold", textAlign: "center" },
  deviceImageWrapper: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
  video: { width: 200, height: 200, backgroundColor: "purple" },
  streamButtons: { marginVertical: 20 },
  dirControls: { flexDirection: "row", justifyContent: "space-around", marginVertical: 20 },
  dirBtn: {
    backgroundColor: "#7fc4db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  dirBtnText: { fontWeight: "bold" },
});
