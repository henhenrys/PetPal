
import { Text, View, TextInput, Button} from "react-native";
import React from "react";
export default function Index() {
  return (
    <View
      style={{
        padding:20
      }}
    >
      <Text style={{fontWeight:'bold'}}>PetPal</Text>
      <TextInput style={
        {
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }
      }
        placeholder="Username"
      />
      <TextInput style={
        {
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }
      }
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button title="Submit"></Button>
    </View>
  );
}