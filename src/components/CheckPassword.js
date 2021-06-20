
import React,{ useState } from "react";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { View, Image, Text, Button, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { TextInput } from 'react-native-paper';



function CheckPassword() {

    const [password, setPassword] = useState({
        firstPassword: "",
        secondPassword: "",
    });

    const [
        validLength,
        hasNumber,
        upperCase,
        lowerCase,
        match,
        specialChar,
    ] = usePasswordValidation({
        firstPassword: password.firstPassword,
        secondPassword: password.secondPassword,
    });


    const setFirst = (value) => {
        setPassword({ ...password, firstPassword: value });
    };
    const setSecond = (value) => {
        setPassword({ ...password, secondPassword: value });
    };
    return (
        <View className='App'>
            <View>
                <Text>First Password:</Text>
                <TextInput onChangeText={text => setFirst(text)} type='text' />
            </View>
            <View>
                <Text>Second Password:</Text>
                <TextInput onChangeText={text => setSecond(text)} type='text' />
            </View>
            <View>
                    <Text>
                        Valid Length: {validLength ? <Text>True</Text> : <Text>False</Text>}
                    </Text>
                    <Text>
                        Has a Number: {hasNumber ? <Text>True</Text> : <Text>False</Text>}
                    </Text>
                    <Text>
                        UpperCase: {upperCase ? <Text>True</Text> : <Text>False</Text>}
                    </Text>
                    <Text>
                        LowerCase: {lowerCase ? <Text>True</Text> : <Text>False</Text>}
                    </Text>
                    <Text>Match: {match ? <Text>True</Text> : <Text>False</Text>}</Text>
                    <Text>
                        Special Character:{" "}
                        {specialChar ? <Text>True</Text> : <Text>False</Text>}
                    </Text>
            </View>
        </View>
    );
}
export default CheckPassword;