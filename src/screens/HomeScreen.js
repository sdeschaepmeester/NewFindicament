import { ListItem } from 'react-native-vector-icons';
import * as React from 'react';
import { View, FlatList, Alert, StyleSheet, Text } from 'react-native';
import { List, Button, Avatar } from 'react-native-paper';
import { Ionicons as Icon } from '@expo/vector-icons';
import ListController from "../components/Controller/ListController";
//import Render from  "../components/Controller/HomeController"
import Render from  "../components/Home"

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, paddingTop: 30 }}>
            <Render />
        </View>
    );
};

export default HomeScreen;