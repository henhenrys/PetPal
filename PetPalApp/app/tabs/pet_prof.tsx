import React from "react";
import { Text, View, TextInput, Button, Image} from "react-native";
import { router, useRouter } from "expo-router";

export default function PetProf() {
    return (
        <View style={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
        <View style={{borderColor: 'black', borderWidth: 1, marginLeft: 40, marginRight: 40, borderRadius: 30, backgroundColor: '#7fc4db'}}>
          <Text style={{ fontSize: 50, fontWeight: 'bold', textAlign: 'center'}}>PetPal</Text>
        </View>
        <Text></Text>
            <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-evenly'}}>
                <Image style={{backgroundColor: 'purple', width: 250, height: 250}}source={require('../../assets/images/2.png')} />
            </View>
            <View style={{marginLeft:60, marginRight:60, backgroundColor:'lightgray', borderRadius: 10, marginTop: 5, marginBottom:20}}>
                <Text style={{textAlign:"center", fontSize: 30}}>Pet Name</Text>
            </View>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                <View style={{marginLeft:120, marginRight: 5, paddingLeft: 20, paddingRight: 20, backgroundColor:'lightgray', borderRadius: 10, marginTop: 5, marginBottom:20}}>
                    <Text style={{textAlign:"center", fontSize: 30}}>Birthday</Text>
                </View>
                <View style={{marginRight:120, marginLeft: 5, paddingLeft: 45, paddingRight: 45, backgroundColor:'lightgray', borderRadius: 10, marginTop: 5, marginBottom:20}}>
                    <Text style={{textAlign:"center", fontSize: 30}}>Age</Text>
                </View>
            </View>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                <View style={{marginLeft:120, marginRight: 5, paddingLeft: 30, paddingRight: 30, backgroundColor:'lightgray', borderRadius: 10, marginTop: 5, marginBottom:20}}>
                    <Text style={{textAlign:"center", fontSize: 30}}>Animal</Text>
                </View>
                <View style={{marginRight:120, marginLeft: 5, paddingLeft: 20, paddingRight: 30, backgroundColor:'lightgray', borderRadius: 10, marginTop: 5, marginBottom:20}}>
                    <Text style={{textAlign:"center", fontSize: 30}}>Gender</Text>
                </View>
            </View>
            <View style={{marginLeft:60, marginRight:60, backgroundColor:'lightgray', borderRadius: 10, marginTop: 5, marginBottom:20}}>
                <Text style={{textAlign:"center", fontSize: 30}}>List of Pet Health</Text>
            </View>
        </View>
    );
  }