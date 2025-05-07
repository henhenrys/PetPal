import React from "react";
import { Text, View, TextInput, Button, Image} from "react-native";
import { router, useRouter } from "expo-router";

export default function HomeScreen() {
    return (
      <View style={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor:'cyan', marginTop: 10, marginBottom: 10}}>
        <Text style={{ fontSize: 50, fontWeight: 'bold', textAlign: 'center', backgroundColor: 'white'}}>PetPal</Text>
        <Text style={{textAlign:"center", fontSize: 30}}>Welcome Back!</Text>
        <View style={{backgroundColor: "yellow", display: 'flex', flexDirection:'row', justifyContent: 'space-evenly'}}>
          <Image style={{backgroundColor: 'purple'}}source={require('../../assets/images/react-logo.png')} />
          <Text style={{backgroundColor: 'orange', paddingTop: 40 }}>Person</Text>
        </View>
        <View style={{backgroundColor: "yellow", display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
          <Image style={{backgroundColor: 'purple', height:40, width:40, marginLeft: 30}}source={require('../../assets/images/react-logo.png')} />
          <Text></Text>
          <View style={{flex:2}}>
            <Button title="Pet Profile" onPress={() => router.push('/tabs/pet_prof')}></Button>
          </View>
          <Text></Text>
        </View>
        <View style={{backgroundColor: "yellow", display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
          <Image style={{backgroundColor: 'purple', height:40, width:40, marginLeft: 30}}source={require('../../assets/images/react-logo.png')} />
          <Text></Text>
          <View style={{flex:2}}>
            <Button title="Device Camera" onPress={() => router.push('../tabs/devices')}></Button>
          </View>
          <Text></Text>
        </View>
        <View style={{backgroundColor: "yellow", display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
          <Image style={{backgroundColor: 'purple', height:40, width:40, marginLeft: 30}}source={require('../../assets/images/react-logo.png')} />
          <Text></Text>
          <View style={{flex:2}}>
            <Button title="Saved Clips" onPress={() => router.push('../tabs/sclip')}></Button>
          </View>
          <Text></Text>
        </View>
        <View style={{backgroundColor: "yellow", display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
          <Image style={{backgroundColor: 'purple', height:40, width:40, marginLeft: 30}} source={require('../../assets/images/react-logo.png')} />
          <Text></Text>
          <View style={{flex:2}}>
            <Button title="Social" onPress={() => router.push('/tabs/sfeed')}></Button>
          </View>
          <Text></Text>
        </View>
        <View style={{backgroundColor: "yellow", display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
          <Image style={{backgroundColor: 'purple', height:40, width:40, marginLeft: 30}}source={require('../../assets/images/react-logo.png')} />
          <Text></Text>
          <View style={{flex:2}}>
            <Button title="Settings" onPress={() => router.push('/tabs/settings')}></Button>
          </View>
          <Text></Text>
        </View>
      </View>
    );
  }