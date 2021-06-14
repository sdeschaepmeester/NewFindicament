

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from "react";
import {
  ViewStyle,
  TextStyle,
  TextInputProps,
  SafeAreaView,
  ScrollView,
  CheckBox,
  ImageBackground,
  View,
  FlatList,
  Alert,
  StyleSheet,
  Text,
  TextBase,
  TextInput,
  TextInputBase,
  Switch,
  selectedDotColor,
  TouchableHighlight

} from 'react-native';
import { List, Button, Avatar, Checkbox } from 'react-native-paper';
import { LocaleConfig } from 'react-native-calendars';
import { enableExpoCliLogging } from 'expo/build/logs/Logs';
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";
import { Card, ListItem, Icon } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";


LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  //today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

const Stack = createStackNavigator();

function AddTreatment({ navigation, day }) {
  console.log(day);
  navigation.navigate('Treatment', { day })
}

function PlanningScreen({ navigation }) {
  return (
    <View>
      <CalendarList
        // Callback which gets executed when visible months change in scroll view. Default = undefined
        onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
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
        markedDates={{

          '2021-05-22': { startingDay: true, color: '#00adf5' },
          '2021-05-23': { startingDay: false, color: '#00adf5' },
          '2021-05-24': { startingDay: false, color: '#00adf5' },
          '2021-05-25': { startingDay: false, color: '#00adf5' },
          '2021-05-26': { endingDay: true, color: '#00adf5' },
        }}
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
    </View>
  )
};




const stylesAddTreatment = {
  button: {
    backgroundColor: 'blue',
  },
  backgroundColor: 'lightblue'
}




function AddTreatmentScreen({ route, navigation }) {

  const { day } = route.params;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSelected, setSelection] = useState(false);


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  return (

    <View style={styles.container}>
      <Card>
        <Text style={{ fontSize: 30 }}>Ajouter un traitement</Text>
        <Text style={{ marginLeft: 18, marginRight: 18, marginTop: 20, marginBottom: 20 }}>début du traitement le {JSON.stringify(day.day)}/{JSON.stringify(day.month)}/{JSON.stringify(day.year)} </Text>
        <TextInput
          style={{ height: 40, borderRadius: 2, borderWidth: 1, borderColor: 2374 }}
          placeholder="Sélectionner le médicament"
        />
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Traitement régulier</Text>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

        </View>
        <Button onPress={showDatePicker} style={{ backgroundColor: "#e9f0ef", marginLeft: 18, marginRight: 18, marginTop: 20 }}>
          Début de traitement
        </Button>

        <Button onPress={() => this.navigation.navigate('planning')} style={{ backgroundColor: "#0099ff", marginLeft: 18, marginRight: 18, marginTop: 20 }}>
          Confirmer
        </Button>

        <Button style={{ backgroundColor: "#0099ff", marginLeft: 18, marginRight: 18, marginTop: 20 }}>
          Annuler
        </Button>
      </Card>
    </View>
  );

};


const DrugsScreen = ({ navigation }) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Planning" >
        <Stack.Screen name="Planning" component={PlanningScreen} />
        <Stack.Screen name="Treatment" component={AddTreatmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
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
  btnClickContain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    backgroundColor: 'grey',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  btnContainer: {
    flexDirection: 'row',
  },
  btnIcon: {
    height: 25,
    width: 25,
  },
  btnText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
    marginTop: 2,
  }
});

export default DrugsScreen;
