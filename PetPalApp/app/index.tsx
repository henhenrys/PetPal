import { Text, View, TextInput, Button } from "react-native";
import React, {useState} from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');

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

      <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Email</Text>
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
        onChangeText={newText => setText(newText)}
        defaultValue={text}
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
        onChangeText={newText => setText2(newText)}
        defaultValue={text2}
        secureTextEntry
      />
      <View style={{backgroundColor: "#2196F3", marginLeft:60, marginRight:60}}>
        <Button 
          title="Login" 
          onPress={() => {
            (async () => {
              console.log("Login button");
              try {
                const response = await fetch("https://petpal-3yfg.onrender.com/api/login", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    email: {text}['text'],
                    password: {text2}['text2']
                  })
                });
                console.log('here')
                console.log({text}['text'])
                console.log({text2}['text2'])
                const data = await response.json();
                if (response.ok) {
                  console.log("Login success:", data);
                  router.push('/tabs/home');
                } else {
                  // console.error("Login failed:", data);
                  alert("Invalid Credentials")
                }
              }
              catch (error) {
                console.log(error)
              }
            })();
          }}           
          color='#098194'
        />
      </View>

      <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 30 }}>New to PetPal?</Text>
      <View style={{backgroundColor: "#2196F3", marginLeft:60, marginRight:60, marginTop:20}}>
        <Button
          title="Sign Up"
          onPress={() => router.push("/signup")}
          color='#098194'
        />
      </View>
    </View>
  );
}