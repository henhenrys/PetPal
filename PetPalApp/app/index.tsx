import { Text, View, TextInput, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#a4c3f5',
        padding: 16,
      }}
    >
      <Text style={{ fontSize: 50, fontWeight: 'bold', textAlign: 'center' }}>PetPal</Text>

      <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Username</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
        placeholder="Username"
      />

      <Text style={{ fontWeight: 'bold' }}>Password</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
        placeholder="Password"
        secureTextEntry
      />

      <Button title="Login" onPress={() => router.push('./tabs/home')} />

      <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 30 }}>New to PetPal?</Text>

      <Button
        title="Sign Up"
        onPress={() => router.push("/signup")}
      />
    </View>
  );
}
