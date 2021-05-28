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
import {AntDesign} from "@expo/vector-icons";
import {Button} from "react-native-paper";
import { SearchBar } from 'react-native-elements';
import {ShowFilter} from './Controller/FiltersController'



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
            <Button style={styles.roundButton}
                    color="#000080"
                    mode="contained"
                    onPress={() => onDelete(title)}>
                <AntDesign name="closecircleo" size={20} color="white" />
            </Button>
        )
    }

}





export const List = ({navigation,drugs,page,onDelete,onCreate})=> {

    console.log("drugs")
    //console.log(drugs)

    const renderItem = ({ item }) => (
        <Item navigation={navigation}  title={item.code_cip} page={page} onDelete={onDelete} onCreate={onCreate}/>
    );


    return (
        <View style={{ flex: 1, paddingTop: 30, backgroundColor: "#dff2ff" }}>

            <SafeAreaView style={styles.container}>
                <Text style={{ fontSize: 30, textAlign: "center" }}>Liste de médicaments</Text>
                <ShowFilter
                    page={page}
                />

            </SafeAreaView>
            <ScrollView style={styles.scrollView}>
                <FlatList
                    data={drugs}
                    renderItem={renderItem}

                    keyExtractor={item => item.id}
                />
            </ScrollView>

        </View>
    );



}


//export default HistoryController;


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

    }
});

