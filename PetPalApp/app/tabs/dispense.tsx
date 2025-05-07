import React from "react";
import { Text, View, TextInput, Button, Image} from "react-native";
import { router, useRouter } from "expo-router";

export default function Dispenser() {
    return (
        <View style={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor:'cyan', marginTop: 10, marginBottom: 10}}>
            <Text style={{ fontSize: 50, fontWeight: 'bold', textAlign: 'center', backgroundColor: 'white'}}>PetPal</Text>
            <View style={{backgroundColor: "yellow", display: 'flex', flexDirection:'row', justifyContent: 'space-evenly'}}>
                <Image style={{backgroundColor: 'purple', width: 200, height: 200}}source={require('../../assets/images/react-logo.png')} />
            </View>
        </View>
    );
  }