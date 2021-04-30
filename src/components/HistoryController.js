import { ListItem } from 'react-native-vector-icons';
import * as React from 'react';
import { SafeAreaView, ScrollView, ImageBackground, View, FlatList, Alert, StyleSheet, Text } from 'react-native';
import { List, Button, Avatar } from 'react-native-paper';
import { Ionicons as Icon } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from '../screens/DetailsScreen';

var image = { uri: "https://zupimages.net/up/21/17/y60l.png" };

const Stack = createStackNavigator();

const drugs = [
    {
        codeCIP: 1,
        title: 'Medoc1',
        description: 'cest genial',
      },
      {
        codeCIP: 2,
        title: 'Medoc2',
        description: 'cest trop cool',
      },
      {
        codeCIP: 3,
        title: 'Medoc3',
        description: 'cest trop top',
      },
];
const data = [1, 2, 3];

function goToDetails({ navigation, drug }) {
    navigation.navigate('Details', {
        codeCIP: drug.codeCIP,
        title: drug.title,
        description: drug.description,
      })
    // Va navigation vers la notice en fonction de id du medoc cliqué
    // Get id 
    // Insert to history -> call insertToHistory
}

const insertToHistory = () => {
    // Print du name et description
    // plus tard : récupérer idDrug
}

const deleteHistory = () => {
    alert("deleteHistory");
}

const deleteHistoryById = () => {
    alert("deleteHistoryById");
}

findHistory = ({ navigation }) => {
    
    
    return (
        <View>
            {drugs.map(drug => (
                <List.Item
                key={drug.codeCIP}
                onPress={() => goToDetails({ navigation, drug })}
                title={drug.title}
                description={drug.description}
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
                            onPress={() => alert()}>
                            <AntDesign name="closecircleo" size={20} color="white" />
                        </Button>
                    </View>
                }
            />
            ))}
            

        </View>
    )
}

const addToHistory = () => {
    alert("addToHistory");
}
const printData = () => {
    alert("printData");
}

// Homescreen
function HistoryScreen({ navigation }) {
    return (
        <View style={{ flex: 1, paddingTop: 30 }}>
            <StatusBar
                backgroundColor="lightblue"
            />
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.image}>
                    <Text style={styles.text}>Historique</Text>
                </ImageBackground>
                <AntDesign name="delete" size={35} color="#00004d" style={{ paddingLeft: 20, paddingTop: 5 }}
                    onPress={() => alert("Voulez-vous supprimer l'historique ?")}
                />
            </View>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <FlatList
                        data={data}
                        renderItem={(item) =>
                            <View style={{ borderRadius: 5, borderWidth: 1, margin: 5, borderColor: '#e0e0e0' }}>
                                {findHistory({ navigation })}
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
            { text: 'Supprimer', onPress: () => console.log('Suppression de lhistorique'), style: 'cancel' },
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