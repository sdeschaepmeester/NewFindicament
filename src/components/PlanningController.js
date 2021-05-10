import * as React from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ViewStyle,
  TextStyle,
  TextInputProps, SafeAreaView, ScrollView, ImageBackground, View, FlatList, Alert, StyleSheet, Text
} from 'react-native';
import { List, Button, Avatar } from 'react-native-paper';
import { LocaleConfig } from 'react-native-calendars';
import { enableExpoCliLogging } from 'expo/build/logs/Logs';
import { useForm } from "react-hook-form";

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  //today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

const Stack = createStackNavigator();

function AddTreatment({ navigation }) {
  navigation.navigate('Treatment')
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
        onDayPress={(day)=>{day.selectedDotColor='#60d2e4'}}
        onDayPress={(day) => {console.log('selected day', day)}} */
        onDayPress={() => AddTreatment({ navigation })}

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



function AddTreatmentScreen() {
  return (
    function App() {
      const { register, handleSubmit } = useForm();
      const onSubmit = data => console.log(data);
      
      <form onSubmit={handleSubmit(onSubmit)}>
      <Headers />

      <input {...register("firstName")} placeholder="First name" />
      <input {...register("lastName")} placeholder="Last name" />
      <select {...register("category")}>
        <option value="">Select...</option>
        <option value="A">Category A</option>
        <option value="B">Category B</option>
      </select>

      <input type="submit" />
    </form>
    
    }
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


export default DrugsScreen;
