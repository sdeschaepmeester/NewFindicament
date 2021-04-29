import * as React from 'react';
import { ListItem } from 'react-native-vector-icons';
import { SafeAreaView, ScrollView, ImageBackground, View, FlatList, Alert, StyleSheet, Text } from 'react-native';
import { List, Button, Avatar } from 'react-native-paper';
import { Ionicons as Icon } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';

// Search bar
class SearchBarByDrugName extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        lightTheme
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}

class SearchBarByFilter extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        lightTheme
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}

// Functions
const goToDetails = () => {
  alert("goToDetails"); c
}

findDrugsList = () => {
  return (
    <View>
      <List.Item
        onPress={() => goToDetails()}
        title={"Doliprane 1000"}
        description="Parfait pour les devs react"
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
      />
    </View>
  )
}

const DrugsController = () => {
  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={{ paddingTop: 30 }}>
      {/* View contenant l'image et le titre de la page  */}
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.text}>Médicaments</Text>
        </ImageBackground>
      </View>{/* Fin titre  */}
      
      <SearchBarByDrugName />
      <List.Section title="Accordions">
        <List.Accordion
          title="Recherche par symptome"
          left={props => <List.Icon {...props} icon="folder" />}
          expanded={expanded}
          onPress={handlePress}>
          <SearchBarByFilter />
          <List.Item title="Ibuprofène" />
          <List.Item title="Antalgique" />
        </List.Accordion>
      </List.Section>
      {findDrugsList()}

    </View>
  );
};

export default DrugsController;

const data = [1, 2, 3, 4, 5, 6];

var image = { uri: "https://zupimages.net/up/21/17/y60l.png" };

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