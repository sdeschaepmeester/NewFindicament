import { ListItem } from 'react-native-vector-icons';
import * as React from 'react';
import { View, FlatList, Alert, StyleSheet, Text } from 'react-native';
import { List, Button, Avatar } from 'react-native-paper';
import { Ionicons as Icon } from '@expo/vector-icons';
import ListController from "../components/Controller/ListController";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, paddingTop: 30 }}>
            <ListController/>
        </View>
    );
};

export default HomeScreen;