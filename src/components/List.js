import * as React from 'react';
import {
    SafeAreaView,
    ScrollView,
    ImageBackground,
    View,
    FlatList,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity, ActivityIndicator
} from 'react-native';
import {moreDetails} from "./GoToDetails";
import {AntDesign,Ionicons as Icon} from "@expo/vector-icons";
import {Button} from "react-native-paper";
import {useEffect, useState} from "react";
import {SearchBar} from "react-native-elements";


const Item = ({ navigation,name, title,page,onDelete,onCreate }) => (
    <View style={{
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <TouchableOpacity
            onPress={()=> moreDetails({navigation,onCreate},title,name)}
            style={styles.item}>
            <View style={styles.card}>
                <View style={styles.containerCard}>
                    <Text style={styles.text} >{name}</Text>
                </View>
                <View style={styles.block_right}>
                    {ButtonDeleteById({title,page,onDelete})}
                </View>
            </View>


        </TouchableOpacity>
    </View>

);



const ButtonDeleteById = ({title, page,onDelete}) =>{
    if(page == "History" || page == "Favorite"){
        return (
            <Button
                    color="#000080"
                    mode="contained"
                    onPress={() => onDelete(title)}>
                <AntDesign name="closecircleo" size={20} color="white" />
            </Button>
        )
    }
}
const ButtonDelete = ({ page,onDelete}) =>{
    if(page == "History" || page == "Favorite"){
        return (
            <Button style={styles.roundButton}
                    color="#000080"
                    mode="contained"
                    onPress={() => onDelete(-1)}>
                <AntDesign name="delete" size={20} color="white" />
            </Button>
        )
    }
}



export const List = ({navigation,drugs,page,onDelete,onCreate,handleLoadMore})=> {



    console.log("fuck it")
    //console.log(drugs)
    /*let [search, setSearch] = useState('');
    let [filteredDataSource, setFilteredDataSource] = useState({drugs});
    let [masterDataSource, setMasterDataSource] = useState({drugs});*/


    /*useEffect(() => {
        console.log("the list of drugs searchar")
        console.log(drugs)
        setFilteredDataSource(drugs);
        setMasterDataSource(drugs);

    }, []);*/

    /*const searchFilterFunction = (text) => {
        if (text) {
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.code_cip
                    ? item.code_cip.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };*/

    const renderItem = ({ item }) => (
        <Item navigation={navigation} name={item.name} title={item.code_cip} page={page} onDelete={onDelete} onCreate={onCreate}/>
    );

    let renderFooter= ()=>{
        return(
            <View   style={styles.loader}>
                <ActivityIndicator size={"large"}/>
            </View>
        )
    }

    /*<SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 30, textAlign: "center" }}>Liste de médicaments</Text>
        <SearchBar
            round
            searchIcon={{ size: 24 }}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction('')}
            placeholder="Type Here..."
            value={search}
        />


    </SafeAreaView>*/

    return (
        <View style={{ flex: 1, paddingTop: 30, backgroundColor: "#dff2ff" }}>

            {ButtonDelete({page, onDelete})}
            <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}
            >
                <FlatList
                    data={drugs}
                    renderItem={renderItem}

                    keyExtractor={item => item.id}
                    onSt
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={renderFooter}
                />
            </ScrollView>
            <SafeAreaView style={styles.heightList}>

            </SafeAreaView>

        </View>
    );



}

const styles = StyleSheet.create({
    item:{
        height: 75,
        backgroundColor: "white",
        width: "90%",
        padding: 20,
        fontSize: 24,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        marginBottom: 5
    },
    loader:{
        marginTop:5,
        alignItems: "center"
    },
    card:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    block_right:{

    },
    heightList:{
        height: 100,
    },
    roundButton:{
        width: 40,
        marginBottom: 15,
        marginLeft: 20
    },

    containerCard: {
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
        flex:1
    },
});

