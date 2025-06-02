import { Text, View, TextInput, Button } from "react-native";
import React, {useState} from "react";
import { useRouter } from "expo-router";

export default function Signup() {
  const [name, nameSet] = useState('');
  const [email, emailSet] = useState('');
  const [location, locationSet] = useState('');
  const [password, passwordSet] = useState('');
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

      <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Name</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
        placeholder="Name"
        onChangeText={newText => nameSet(newText)}
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
        onChangeText={newText => emailSet(newText)}
        placeholderTextColor={'black'}
      />

      <Text style={{ fontWeight: 'bold'}}>Location</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
        placeholder="Location"
        onChangeText={newText => locationSet(newText)}
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
        onChangeText={newText => passwordSet(newText)}
        placeholderTextColor={'black'}
        secureTextEntry
      />

      <Button title="Sign Up" onPress={() => {
        (async () => {
          console.log("signup button");
          const response = await fetch("https://petpal-3yfg.onrender.com/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name : {name}['name'],
              email: {email}['email'],
              password: {password}['password'],
              location: {location}['location']
            })
          });
          const data = await response.json();
          if (response.ok) {
            console.log("Login success:", data);
            router.push('/tabs/home');
          } else {
            // console.error("Login failed:", data);
            if(data['detail'][0]['msg'] != undefined) {
              alert(data['detail'][0]['msg'])
            }
            else {
              alert(data['detail'])
            }
            
          }
        })();
      }}
      color='#098194'
      />

      <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 30 }}>
        Already have an account?
      </Text>

      <Button
        title="Back to Login"
        onPress={() => router.push("/")}
        color='#098194'
      />
    </View>
  );
}
