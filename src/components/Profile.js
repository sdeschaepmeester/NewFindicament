import React, {Component} from "react";
import {Alert, Image, StyleSheet, Text, View} from "react-native";
import {Button, TextInput} from "react-native-paper";
import {createStackNavigator} from "@react-navigation/stack";
import DetailsScreen from "../screens/DetailsScreen";



class Profile extends Component {


    state = {
        profile: [
        ],
        name : ""
    };

    async getProfileInfo(){
        const ProfileResponses = await  fetch('http://192.168.1.83:3000/getDataProfile',{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then((responseJson) => {

                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });

        let profile =  ProfileResponses

        this.setState({ profile: profile })
        console.log("this.state.profile")
        console.log(this.state.profile)
    }

    UpdateUser = async () => {
         try {
             await fetch('http://192.168.1.83:3000/UpdateUser', {
                 method: 'POST',
                 headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({
                     name: this.state.name
                 }),


             });
             await this.getProfileInfo()

         } catch (e) {
             console.warn("Cannot insert to history")
         }

     }

    async deletePersonalData(){
        await fetch('http://192.168.1.83:3000/deleteHistory', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cip: -1
            }),
        });
        await fetch('http://192.168.1.83:3000/deleteFavorite', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cip: -1
            }),
        });

    }

    async componentDidMount() {
        console.log("start")
        await  this.getProfileInfo()
        this.focusListener  = this.props.navigation.addListener("focus",async () => {
            console.log("start 2")
            await  this.getProfileInfo()

        });

    }

    componentWillUnmount() {
        // remove event listener
        if (this.focusListener != null && this.focusListener.remove) {
            this.focusListener.remove();
        }
    }

    alert = (s) => {
        Alert.alert(
            s,
            'Cette action est irréversible',
            [
                { text: 'Supprimer', onPress: () => this.deletePersonalData(), style: 'cancel' },
                { text: 'Annuler', onPress: () => console.log('Annulation') },
            ],
            { cancelable: false }
        )
    }


    render() {

        let profile = this.state.profile;
        const {navigation}= this.props;
        if(profile.length != 0){
            return(
                <View style={styles.container} >
                    <View style={{width:500,height: 220,backgroundColor:"#61D2E4",zIndex: 1}}>
                        <Image
                        source={require('../assets/icons/user.png')}
                        style={{ width: 200, height: 200,alignSelf: 'center',top:10 }}
                        />
                    </View>
                    <View style={styles.containerChild}>
                        <Text style={styles.text} >Email de l'utilisateur : {profile.email} </Text>
                        <Text style={styles.text} >Nom de l'utilisateur : {profile.name} </Text>
                        <TextInput
                            label="Nouveau nom"
                            style={{marginLeft:18,marginRight:18,marginTop:20,marginBottom:20,width:200}}
                            mode={"outlined"}
                            onChangeText={(text)=>this.state.name = text}
                        />
                        <Button  mode="contained" style={{marginLeft:18,marginRight:18,marginTop:20,marginBottom:20,width:300,backgroundColor:'#61D2E4'}}
                                 onPress={() => this.UpdateUser()}>
                            <Text style={{color:'#000000',fontWeight: 'bold'}}>Modifier le profile</Text>
                        </Button>
                        <Button  mode="contained" style={{marginLeft:18,marginRight:18,marginTop:10,marginBottom:20,width:300,backgroundColor:'#61D2E4'}}
                                 onPress={() => this.alert()}>
                            <Text style={{color:'#000000',fontWeight: 'bold'}}>Effacer mes données</Text>
                        </Button>
                    </View>

                </View>
            )
        }else{
            return(
                <Text>Pas de donnée du profile</Text>
            )
        }

    }


}



export {Profile as ProfileClass}


export default class ProfileStack extends Component {

    render() {

        const Stack = createStackNavigator();

        return (
            <Stack.Navigator >
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
        flex:1,
    },
    containerChild: {
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
        flex:1,
        marginTop: -100
    },
    text: {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 5,
    },
});
