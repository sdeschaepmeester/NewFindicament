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
    TouchableOpacity
} from 'react-native';
import {moreDetails} from "./GoToDetails";
import {AntDesign,Ionicons as Icon} from "@expo/vector-icons";
import {Button} from "react-native-paper";
import {useEffect, useState} from "react";
import {SearchBar} from "react-native-elements";


const Item = ({ navigation, title,page,onDelete,onCreate }) => (
    <View style={{
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <TouchableOpacity
            onPress={()=> moreDetails({navigation,onCreate},title,"Medoc")}
            style={styles.item}>
            <View style={styles.card}>
                <View>
                    <Text >Title </Text>
                    <Text >{title}</Text>
                </View>
                <View style={styles.block_right}>
                    {ButtonDeleteById({title,page,onDelete})}
                </View>
            </View>


        </TouchableOpacity>
    </View>

);



const ButtonDeleteById = ({title, page,onDelete}) =>{
    if(page == "History"){
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
    if(page == "History"){
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




export const List = ({navigation,drugs,page,onDelete,onCreate})=> {

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        console.log("the list of drugs searchar")
        console.log(drugs)
        setFilteredDataSource(drugs);
        setMasterDataSource(drugs);

    }, []);

    const searchFilterFunction = (text) => {
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
    };

    const renderItem = ({ item }) => (
        <Item navigation={navigation}  title={item.code_cip} page={page} onDelete={onDelete} onCreate={onCreate}/>
    );


    return (
        <View style={{ flex: 1, paddingTop: 30, backgroundColor: "#dff2ff" }}>

            <SafeAreaView style={styles.container}>
                <Text style={{ fontSize: 30, textAlign: "center" }}>Liste de médicaments</Text>


            </SafeAreaView>
            {ButtonDelete({page, onDelete})}
            <ScrollView style={styles.scrollView}>
                <FlatList
                    data={filteredDataSource}
                    renderItem={renderItem}

                    keyExtractor={item => item.id}
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
    }
});

