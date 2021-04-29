import * as React from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
import {LocaleConfig} from 'react-native-calendars';
import { enableExpoCliLogging } from 'expo/build/logs/Logs';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  //today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';
 



export default function TabFourScreen(){
    return (
        <View>
        
        <CalendarList
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}
                //...calendarParams
                onDayPress={(day)=>{selectedDayBackgroundColor='#60d2e4'}}
                onDayPress={(day)=>{day.selectedDotColor='#60d2e4'}}
                onDayPress={(day) => {console.log('selected day', day)}}
                
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
}
