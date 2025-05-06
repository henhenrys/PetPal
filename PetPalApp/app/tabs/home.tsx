import React from "react";
import { Text, View, TextInput, Button} from "react-native";
import { router, useRouter } from "expo-router";

export default function SignupScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Page</Text>
        <Button title="Logout" onPress={() => router.push('../')}>
        </Button>
      </View>
    );
  }