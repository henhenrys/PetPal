import React from "react";
import { Text, View, TextInput, Button, Image} from "react-native";
import { router, useRouter } from "expo-router";

export default function Settings() {
    return (
        <View style={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
            <View style={{borderColor: 'black', borderWidth: 1, marginLeft: 40, marginRight: 40, borderRadius: 30, backgroundColor: '#7fc4db', marginBottom: 10}}>
                <Text style={{ fontSize: 50, fontWeight: 'bold', textAlign: 'center'}}>PetPal</Text>
            </View>
            <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-evenly', marginBottom: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold',paddingRight: 100}}>Connect Devices</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent: 'space-around'}}>
                <Image source={require('../../assets/images/react-logo.png')}/>
                <View style={{display:'flex', flexDirection:'column', paddingRight: 30, justifyContent:'space-evenly', alignContent:'center'}}>
                    <View style={{borderColor: 'black', borderWidth: 1, backgroundColor: 'lightgray', borderRadius: 30, marginBottom: 15}}>
                        <Text style={{fontSize: 15, paddingLeft: 10, paddingRight: 10, textAlign:'center'}}>Device Name</Text>
                    </View>
                    <View style={{borderColor: 'black', borderWidth: 1, backgroundColor: 'lightgray', borderRadius: 30, marginBottom: 15}}>
                        <Text style={{fontSize: 15, paddingLeft: 10, paddingRight: 10, textAlign: 'center'}}>Device ID</Text>
                    </View>
                </View>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent: 'space-around'}}>
                <Image source={require('../../assets/images/react-logo.png')}/>
                <View style={{display:'flex', flexDirection:'column', paddingRight: 30, justifyContent:'space-evenly', alignContent:'center'}}>
                    <View style={{borderColor: 'black', borderWidth: 1, backgroundColor: 'lightgray', borderRadius: 30, marginBottom: 15}}>
                        <Text style={{fontSize: 15, paddingLeft: 10, paddingRight: 10, textAlign:'center'}}>Device Name</Text>
                    </View>
                    <View style={{borderColor: 'black', borderWidth: 1, backgroundColor: 'lightgray', borderRadius: 30, marginBottom: 15}}>
                        <Text style={{fontSize: 15, paddingLeft: 10, paddingRight: 10, textAlign: 'center'}}>Device ID</Text>
                    </View>
                </View>
            </View>
        </View>
    );
  }