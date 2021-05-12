import { ListItem } from 'react-native-vector-icons';
//import * as React from "react";

import { SafeAreaView, ScrollView, ImageBackground, View, FlatList, Alert, StyleSheet, Text } from 'react-native';
import { List, Button, Avatar } from 'react-native-paper';
import { Ionicons as Icon } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from '../screens/DetailsScreen';
import React,{useState,useEffect} from "react";


var image = { uri: "https://zupimages.net/up/21/17/y60l.png" };

const Stack = createStackNavigator();



/*
const drugs = [
    {
        cip: "34009 360 256 7 7",
        name: 'Medoc1',
        id: 'cest genial',
      },
      {
        cip: "34009 300 877 1 8",
        name: 'Medoc2',
        id: 'cest trop cool',
      },
      {
        cip: "34009 337 656 2 0",
        name: 'Medoc3',
        id: 'cest trop top',
      },
];*/

const drugs =   [
     [
        "0",
             {
                 "id": 75,
                 "cip": "34009 360 256 7 7",
             "name": "Medoc1",
             },
    ],
    [
        "1",
             {
                 "id": 76,
                 "cip": "34009 360 256 7 7",
                "name": "Medoc1",
             },
     ],

]



const data = [1, 2, 3];




async function getDrugById(code_cip){
    return fetch('http://10.0.2.2:3000/getDrugById',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code_cip: code_cip
        }),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(JSON.stringify(responseJson))

            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}


let drugData = async ()=> {
    return fetch('http://10.0.2.2:3000/getHistory',{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log(JSON.stringify(responseJson))
            return responseJson
        })
        .catch((error) => {
            console.error(error);
        });


}


async function  getHistory(drugData){
    let drugArray = [];
    console.log(drugData)
    console.log("stop")
    for(var i in drugData)
        drugArray.push([i, drugData [i]]);

    /*console.log(drugArray[2][1].cip);

    drugArray.map(drug => (
        console.log(drug[1].name+ " // ")

    ))*/
    return drugArray
}

async function goToDetails({ navigation, drug }) {
     let data = await getDrugById(drug.codeCIP);

    //console.log(tempo);

    console.log("hello data")
    navigation.navigate('Details', {
        codeCIP: data[0].code_cip,
        title: drug.title,
        description: data[0].notice,
      })
    insertToHistory(drug.codeCIP,drug.title)
    // Va navigation vers la notice en fonction de id du medoc cliqué
    // Get id 
    // Insert to history -> call insertToHistory
}

const insertToHistory = (cip,name) => {
    fetch('http://10.0.2.2:3000/insertHistory', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cip: cip,
            name: name
        }),
    });
    // Print du name et description
    // plus tard : récupérer idDrug
}

const deleteHistory = () => {
    fetch('http://10.0.2.2:3000/deleteHistory', {
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

const deleteHistoryById = (req) => {
    fetch('http://10.0.2.2:3000/deleteHistory', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cip: req
        }),
    });
}





let  findHistory =  ({ navigation,data,count }) => {

    //let getAllHistory = await getHistory();
    //console.log(getAllHistory);
    count = count != 1 ? 0 : 1;
    return (
        <View>
            {data.map(drug => (
                <List.Item
                key={drug[1].cip}
                onPress={() => goToDetails({ navigation, drug })}
                title={drug[1].name}
                description={drug[1].id}
                left={props =>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Avatar.Image size={64} source=
                            {{
                                uri: ('https://zupimages.net/up/21/17/3jev.jpg')
                            }} />
                    </View>
                }
                right={props =>
                    <View>
                        <Button style={styles.roundButton}
                            color="#000080"
                            mode="contained"
                            onPress={() => deleteHistoryById(drug.codeCIP)}>
                            <AntDesign name="closecircleo" size={20} color="white" />
                        </Button>
                    </View>
                }
            />
            ))}

        </View>
    )
}



// Homescreen
 function HistoryScreen  ({ navigation }) {
     const [count, setCount] = useState(0);
     /*let arrayData = {};
     arrayData[0] ={}
     arrayData[1] ={}
     arrayData[0].cip= "34009 360 256 7 7"
     arrayData[0].id= 76
     arrayData[0].name= "Medoc1"
     arrayData[1].cip= "34009 360 256 7 7"
     arrayData[1].id= 76
     arrayData[1].name= "Medoc1"*/
     const [data, setData] = useState(drugs);


     useEffect(() => {
         // Using an IIFE
         (async function anyNameFunction() {
             if(count >= 1){
                 let code_cip = "34009 360 256 7 7"
                 /*let temp =await fetch('http://10.0.2.2:3000/getDrugById',{
                     method: 'POST',
                     headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json',
                     },
                     body: JSON.stringify({
                         code_cip: code_cip
                     }),
                 })
                     .then((response) => response.json())
                     .then((responseJson) => {
                         console.log(JSON.stringify(responseJson[0].code_cip))

                     })
                     .catch((error) => {
                         console.error(error);
                     });*/
                 let temp = await drugData()
                 let array = await getHistory(temp);
                 //setCount(0);
                 await console.log(array)
                 await setData(array)
                 console.log('ok');
             }
             if(count >= 4){
                 console.log("ererz")
             }
         })();
     }, [count]);


     return  (
        <View style={{flex: 1, paddingTop: 0}}>
            <StatusBar
                backgroundColor="lightblue"
            />
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.image} >
                    <Text style={styles.text}>Historique</Text>
                </ImageBackground>
                <View>
                    <Text>{count}</Text>
                    <Button style={{backgroundColor: "black",color: "white"}} title="Update" onPress={()=>{setCount(count+1)}} />
                    <Text>couou</Text>

                </View>
                <AntDesign name="delete" size={35} color="#00004d" style={{paddingLeft: 20, paddingTop: 5}}
                           onPress={() => alert("Voulez-vous supprimer l'historique ?")}
                />
            </View>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <FlatList
                        data={data}
                        renderItem={(item) =>
                            <View style={{borderRadius: 5, borderWidth: 1, margin: 5, borderColor: '#e0e0e0'}}>
                                {findHistory({navigation,data,count})}
                            </View>
                        }
                    />
                </ScrollView>
            </SafeAreaView>

        </View>
    );
};

// DetailsScreen
function ShowDetailsScreen({route}) {
    return (
        <View>
            <DetailsScreen />
            <View>
                <Text>
                    {route.params.title}
                </Text>
                <Text>
                    {route.params.description}
                </Text>
            </View>

        </View>
    )
}

// Drugscreen
const DrugsScreen = ({ navigation }) => {

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="History" >
                <Stack.Screen name="History" component={HistoryScreen} />
                <Stack.Screen name="Details" component={ShowDetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>

    );
};

export default DrugsScreen;
//export default HistoryController;

const alert = (s) => {
    Alert.alert(
        s,
        'Cette action est irréversible',
        [
            { text: 'Supprimer', onPress: () => deleteHistory(), style: 'cancel' },
            { text: 'Annuler', onPress: () => console.log('Annulation') },
        ],
        { cancelable: false }
    )
}

const styles = StyleSheet.create({
    roundButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        borderRadius: 100,
        backgroundColor: '#000080',
    },
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        maxHeight: 200
    },
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center"
    },
    quizAttrContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        height: 25,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        margin: 5,
        paddingTop: 3
    },
    quizAttrLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 2
    },
    quizAttrMid: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    quizAttrRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 2
    },
    infoText: {
        color: '#676767',
        fontSize: 15
    },
    infoIcon: {
        color: "#676767",
        marginRight: 5
    }
});