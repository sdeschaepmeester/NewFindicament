import * as React from 'react';
import { SafeAreaView, ScrollView, ImageBackground, View, FlatList, Alert, StyleSheet, Text } from 'react-native';
import { List, Searchbar } from 'react-native-paper';
import { SearchBar } from 'react-native-elements';

const image = { uri: "https://zupimages.net/up/21/17/y60l.png" };

class SearchBarByFilter extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({search});
  };

  render() {
    const {search} = this.state;

    return (
        <SearchBar
            lightTheme
            placeholder="Chercher un symptome"
            onChangeText={this.updateSearch}
            value={search}
        />
    );
  }
}

const  filter = (id)=> {

  console.log(id)
  var malDeTete = "mal de tete";
  var malDeGorge = "mal de gorge";
  var irritations = "irritations";


  if (malDeGorge===id){
    alert("Mal De Gorge")
  }else if (malDeTete===id){
    alert("Mal De Tête")
  }else if (irritations===id){
    alert("Irritations")
  }
}

export const ShowFilter = ({page})=>{
  if(page == "Home") {

    const [expanded, setExpanded] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);

    return (
        <View style={{paddingTop: 30}}>
          <View style={stylesFilter.container2}>
            <ImageBackground source={image} style={stylesFilter.image}>
              <Text style={stylesFilter.text}>Médicaments</Text>
            </ImageBackground>
          </View>{/* Fin titre */}

          <List.Section>
            <List.Accordion
                title="Recherche par symptome"
                left={props => <List.Icon {...props} icon="filter"/>}
                expanded={expanded}
                onPress={handlePress}>
              <SearchBar
                  lightTheme
                  placeholder="Chercher un symptome"
              />
              <List.Item title="Mal de tête" onPress={(e) => filter("mal de tete")}/>
              <List.Item title="Mal de gorge" onPress={(e) => filter("mal de gorge")}/>
              <List.Item title="Irritations" onPress={(e) => filter("irritations")}/>
            </List.Accordion>
          </List.Section>
        </View>
    )
  }else{
    return(
        <Text></Text>
    )
  }
}


const stylesFilter = StyleSheet.create({
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
    flexDirection: "column",
    resizeMode: "cover",
    justifyContent: "center",
    maxHeight: 200
  },
  text: {
    color: "#80CFFF",
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
  },
  container2: {
    flex: 1,
    marginTop: 30,
    marginBottom: 40,
    flexDirection: "column",
    backgroundColor: "#80CFFF"
  },
});