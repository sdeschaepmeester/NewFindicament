import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, Component } from "react";
import { ViewStyle, TextStyle, TextInputProps, SafeAreaView, ScrollView, CheckBox, ImageBackground, View, FlatList, Alert, StyleSheet, Text, TextBase, TextInput, TextInputBase, Switch, selectedDotColor, } from 'react-native';
import { List, Button, Avatar, Checkbox } from 'react-native-paper';
import { LocaleConfig } from 'react-native-calendars';
import { Card, ListItem, Icon } from 'react-native-elements';
import { insertToPlanning } from '../goToPlanning';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  //today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

function AddTreatment({ navigation, day }) {
  navigation.navigate('Treatment', { day })
}

class Planning extends Component {

  state = {
    plannings: [
    ],
    planningsDates: [
    ],
  };

  async getMarkedDates() {
    // Get all start dates
    const planningsResponses = await fetch('http://192.168.1.83:3000/getPlanningDates', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then((responseJson) => {
        // We must parse the JSON. We have an array of object with start_date as an attribute.
        // We want an array with the similar structure : '2021-05-25': { color: '#00adf5' }
        let response = [];
        let datesSplit = responseJson[0].start_date.split("/");
        let correctDateFormat = datesSplit[2]+"-"+datesSplit[1]+"-"+datesSplit[0];
        let trueMonth = datesSplit[1];
        let trueDay = datesSplit[0];
        let trueDate = new Date(toString(correctDateFormat));
        console.log("trueDate")
        console.log(datesSplit[2]+"-"+datesSplit[1]+"-"+datesSplit[0])
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });

    const planningsDates = await planningsResponses
    this.setState({ planningsDates: planningsDates })
  }

  async getPlanning() {
    // Get planning
    const planningsResponses = await fetch('http://192.168.1.83:3000/getPlanning', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then((responseJson) => {
        //console.log(responseJson)
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });

    const plannings = await planningsResponses
    this.setState({ plannings: plannings })
  } // Get planning 

  async componentDidMount() {
    console.log("GET PLANNING")
    await this.getPlanning()
    console.log("GET MARKEDDATES")
    await this.getMarkedDates()

    this.focusListener = this.props.navigation.addListener("focus", async () => {
      console.log("GET PLANNING CALLED AGAIN")
      await this.getPlanning()
      console.log("GET MARKEDDATES CALLED AGAIN")
      await this.getMarkedDates()
    });
  } // ComponentDidMount

  render() {

    let plannings = this.state.plannings;
    let planningDates = this.state.planningsDates;
    const { navigation } = this.props;
    let markedDates = { '2021-07-22': { color: '#00adf5' }, '2021-07-20': { color: '#00adf5' } };

    if(this.state.plannings.length != 0){
      return (
          <View>
            <CalendarList
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                onVisibleMonthsChange={(months) => { console.log('n'); }}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={10}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}
                //...calendarParams
                /* onDayPress={(day)=>{selectedDayBackgroundColor='#60d2e4'}}
                onDayPress={(day)=>{day.selectedDotColor='#60d2e4'}}*/
                onDayPress={(day) => AddTreatment({ navigation, day })}
                //markedDates = {dayWithTreatment}

                markedDates={planningDates}

                // markedDates={{
                //   dayWithTreatment
                //   ////[plannings.start_date]:{selected: true, marked: true}

                //   // '2021-05-22': { startingDay: true, color: '#00adf5' },
                //   // '2021-05-23': { startingDay: false, color: '#00adf5' },
                //   // '2021-05-24': { startingDay: false, color: '#00adf5' },
                //   // '2021-05-25': { startingDay: false, color: '#00adf5' },
                //   // '2021-05-26': { endingDay: true, color: '#00adf5' },
                // }}



                // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
                markingType={'period'}
                //onDayPress={()=>navigation.navigate('Details')}
                // Callback that gets called when day changes while scrolling agenda list
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',

                }}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                  backgroundColor: '#ffffff',
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#b6c1cd',
                  textSectionTitleDisabledColor: '#d9e1e8',
                  selectedDayBackgroundColor: '#60d2e4',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#00adf5',
                  dayTextColor: '#2d4150',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#00adf5',
                  selectedDotColor: '#ffffff',
                  arrowColor: 'orange',
                  disabledArrowColor: '#d9e1e8',
                  monthTextColor: '#60d2e4',
                  indicatorColor: 'blue',
                  textDayFontWeight: '300',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '300',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16
                }}
            />
          </View >
      )
    }else{
      return (
          <View>
            <Text>
              Erreur impossible de se connecter à Findicament
            </Text>
          </View>
      )
    }

  } // render 
}; //planning

function AddTreatmentScreen({ route, navigation }) {
  const { day } = route.params;
  const futureStartDate = JSON.stringify(day.day) + "/" + JSON.stringify(day.month) + "/" + JSON.stringify(day.year);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSelected, setSelection] = useState(false);
  const [inputName, onChangeInputName] = React.useState();
  const [inputComment, onChangeInputComment] = React.useState();

  let AddTreatmentPlanning = ({ navigation }, name, comment, start_date, day) => {
    navigation.navigate('Planning')
    insertToPlanning(name, comment, start_date)
  }

  return (
    <View style={styles.container}>
      <Card>
        <Text style={{ fontSize: 30 }}>Ajouter un traitement</Text>
        <Text style={{ marginLeft: 18, marginRight: 18, marginTop: 20, marginBottom: 20 }}>Début du traitement le {JSON.stringify(day.day)}/{JSON.stringify(day.month)}/{JSON.stringify(day.year)} </Text>

        <TextInput
          style={{ height: 40, borderRadius: 2, borderWidth: 1, borderColor: 2374 }}
          placeholder="Sélectionner le médicament"
          value={inputName}
          onChangeText={onChangeInputName}
        />
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Traitement régulier</Text>
        </View>
        <TextInput
          style={{ borderRadius: 2, borderWidth: 1, borderColor: 2374 }}
          placeholder="Entrer un commentaire"
          multiline={true}
          numberOfLines={3}
          onChangeText={onChangeInputComment}
          value={inputComment}
        />

        <Button onPress={() => AddTreatmentPlanning({ navigation }, inputName, inputComment, futureStartDate, day)} style={{ backgroundColor: "#0099ff", marginLeft: 18, marginRight: 18, marginTop: 20 }}>
          Confirmer
        </Button>

        <Button style={{ backgroundColor: "#0099ff", marginLeft: 18, marginRight: 18, marginTop: 20 }}>
          Annuler
        </Button>
      </Card>
    </View>
  );
};










export { Planning as PlanningClass }

export default class PlanningStack extends Component {
  render() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Planning" >
          <Stack.Screen name="Planning" component={Planning} />
          <Stack.Screen name="Treatment" component={AddTreatmentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#def3ff'
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});




