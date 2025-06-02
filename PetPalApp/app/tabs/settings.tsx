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
                <Image style={{backgroundColor: 'purple', width: 150, height: 150}}source={require('../../assets/images/react-logo.png')} />
                <View style={{display: 'flex', justifyContent:"center", alignContent:'center'}}>
                    <View style={{borderColor: 'black', borderWidth: 1, backgroundColor: 'lightgray', borderRadius: 30, marginBottom: 15}}>
                        <Text style={{fontSize: 30, paddingLeft: 10, paddingRight: 10}}>Username</Text>
                    </View>
                    <View style={{borderColor: 'black', borderWidth: 1, backgroundColor: 'lightgray', borderRadius: 30}}>
                        <Text style={{fontSize: 30, paddingLeft: 40, paddingRight: 10}}>Email</Text>
                    </View>
                </View>
            </View>
            <View style={{backgroundColor: 'lightgray', borderRadius: 30, marginRight: 30, marginLeft: 30, marginBottom: 40, marginTop: 30}}>
                <Text></Text>
            </View>
            <View>
                <View style={{display: 'flex', flexDirection: 'row', marginBottom: 30, marginLeft: 30}}>
                    <View style={{flex: 4}}>
                        <Button title="Devices" onPress={() => router.push('/tabs/devices')}/>
                    </View>
                    <Text style={{flex: 2}}></Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', marginBottom: 30, marginLeft: 30}}>
                    <View style={{flex: 4}}>
                        <Button title="Change Email" /> { /* Currently not functional */}
                    </View>
                    <Text style={{flex: 2}}></Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', marginBottom: 30, marginLeft: 30}}>
                    <View style={{flex: 4}}>
                        <Button title="Change Password" /> { /* Currently not functional */}
                    </View>
                    <Text style={{flex: 2}}></Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', marginLeft: 30}}>
                    <View style={{flex: 4}}>
                        <Button title="Logout" onPress={() => router.push('../.')}></Button>
                    </View>
                    <Text style={{flex:2}}></Text>
                </View>
            </View>
        </View>
    );
  }