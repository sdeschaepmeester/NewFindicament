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

const List = ({navigation,drugs})=> {


    const Item = ({ title }) => (

        <TouchableOpacity
            onPress={()=> moreDetails({navigation},title,"Medoc")}
            style={styles.item}>
            <Text >Title </Text>
            <Text >{title}</Text>
        </TouchableOpacity>

    );

    const renderItem = ({ item }) => (
        <Item  title={item.code_cip} />
    );


    return (
        <View style={{ flex: 1, paddingTop: 30 }}>

            <SafeAreaView style={styles.container}>
                <Text>Filtre </Text>

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


export default List;
//export default HistoryController;


const styles = StyleSheet.create({
    item:{
        height:75,
        padding: 20,
        fontSize:24,
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
    }
});