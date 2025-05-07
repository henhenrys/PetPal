import { Text, View, TextInput, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function Signup() {
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

      <Text style={{ fontWeight: 'bold', marginTop: 20 }}>First Name</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
        placeholder="First Name"
        placeholderTextColor={'black'}
      />

    <Text style={{ fontWeight: 'bold'}}>Last Name</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
        placeholder="Last Name"
        placeholderTextColor={'black'}
      />

      <Text style={{ fontWeight: 'bold'}}>Email</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
        placeholder="Email"
        placeholderTextColor={'black'}
      />

      <Text style={{ fontWeight: 'bold'}}>Username</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
        placeholder="Username"
        placeholderTextColor={'black'}
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
        placeholderTextColor={'black'}
        secureTextEntry
      />

      <Button title="Sign Up" onPress={() => 
        router.push('./tabs/home')
      }/>

      <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 30 }}>
        Already have an account?
      </Text>

      <Button
        title="Back to Login"
        onPress={() => router.push("/")}
      />
    </View>
  );
}
