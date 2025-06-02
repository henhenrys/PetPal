import React from "react";
import { Text, View, TextInput, Button, Image} from "react-native";
import { router, useRouter } from "expo-router";

export default function HomeScreen() {
    return (
      <View style={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
        <View style={{borderColor: 'black', borderWidth: 1, marginLeft: 40, marginRight: 40, borderRadius: 30, backgroundColor: '#7fc4db'}}>
          <Text style={{ fontSize: 50, fontWeight: 'bold', textAlign: 'center'}}>PetPal</Text>
        </View>
        <Text></Text>
        <Text style={{textAlign:"center", fontSize: 30}}>Welcome Back!</Text>
        <Text></Text>
        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-evenly', marginBottom: 70}}>
          <Image style={{backgroundColor: 'purple'}}source={require('../../assets/images/react-logo.png')} />
          <View style={{justifyContent: 'center', marginBottom: 10, paddingLeft: 40, paddingRight: 40, backgroundColor:'lightgray', borderRadius: 30, marginTop: 5,}}>
            <Text style={{fontSize: 20}}>Username</Text>
          </View>
        </View>
        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
          <Image style={{backgroundColor: 'orange', height:50, width:50, marginLeft: 30}}source={require('../../assets/images/react-logo.png')} />
          <Text></Text>
          <View style={{flex:2, marginLeft:60, marginRight:60, backgroundColor:'lightgray', borderRadius: 30, marginTop: 5, marginBottom:20}}>
            <Button title="Pet Profile" onPress={() => router.push('/tabs/pet_prof')}></Button>
          </View>
          <Text></Text>
        </View>
        <View style={{ display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
          <Image style={{backgroundColor: 'pink', height:50, width:50, marginLeft: 30}}source={require('../../assets/images/react-logo.png')} />
          <Text></Text>
          <View style={{flex:2, marginLeft:60, marginRight:60, backgroundColor:'lightgray', borderRadius: 30, marginTop: 5, marginBottom:20}}>
            <Button title="Device Camera" onPress={() => router.push('../tabs/feed')}></Button>
          </View>
          <Text></Text>
        </View>
        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
          <Image style={{backgroundColor: 'hotpink', height:50, width:50, marginLeft: 30}}source={require('../../assets/images/react-logo.png')} />
          <Text></Text>
          <View style={{flex:2, marginLeft:60, marginRight:60, backgroundColor:'lightgray', borderRadius: 30, marginTop: 5, marginBottom:20}}>
            <Button title="Settings" onPress={() => router.push('/tabs/settings')}></Button>
          </View>
          <Text></Text>
        </View>
      </View>
    );
  }