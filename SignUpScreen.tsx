import { Alert, View, Image, Text, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions, TouchableOpacity } from 'react-native'
import { Colors } from '../../assets/theme'
import { Entypo } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';

const {width, height} = Dimensions.get('window');

const SignUpScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const createAlert = (type, message = '') => {
        switch(type) {
            case 1: 
                return Alert.alert('Sign up', 'Sign up successful!', [
                {
                    text: 'Done',
                    onPress: () => {},
                    style: 'cancel',
                }])
                break;
            case 2: 
                return Alert.alert('Sign up', 'Sign up failed!: '+ message, [
                {
                    text: 'Done',
                    onPress: () => {},
                    style: 'cancel',
                }])
                break;
        }
    } 

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    phone,
                    address,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);

                createAlert(1);
                navigation.navigate('Login');
            } else {
                const errorMessage = await response.text();
                createAlert(2, errorMessage);
            }
        } catch (error) {
            console.error(error);
            createAlert(2, error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <View style={{...styles.container, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={Colors.mainColor}/>
        </View>
    );
    else return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <KeyboardAvoidingView behavior='padding'>
                    <View style={{flexDirection: 'row'}}>
                        <BlurView 
                            intensity={60} tint="dark" style={styles.blurContainer}
                        >
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.BackButton}>
                            <Entypo name="arrow-left" size={24} color={Colors.mainColor} />
                            </TouchableOpacity>
                        </BlurView>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Image source={require('../../assets/logo.png')} style={{width: width/3, height: width/3}}/>
                    </View>
                    <View style={{paddingTop: 20, paddingBottom: 20}}>
                        <Text style={styles.Text}>
                            Create new account!
                        </Text>
                    </View>
                    <TextInput 
                        style={styles.input}
                        placeholder='Email'
                        onChangeText={(text) => setEmail(text)} 
                        value={email}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Password'
                        onChangeText={(text) => setPassword(text)} 
                        value={password}
                        textContentType='password'
                        secureTextEntry
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Phone number'
                        onChangeText={(text) => setPhone(text)} 
                        value={phone}
                        keyboardType='numeric'
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Address'
                        onChangeText={(text) => setAddress(text)} 
                        value={address}
                    />
    
                    <TouchableOpacity style={styles.loginBtn} onPress={() => signUp()}>
                        <Text style={{...styles.Text, color: 'white', fontSize: 18}}>
                            Create
                        </Text>
                    </TouchableOpacity>
    
                    <View style={styles.signUpSection}>
                        <Text style={styles.subText}>
                            Or create using social media
                        </Text>
                        <View style={styles.iconSection}>
                            <TouchableOpacity>
                                <Entypo name="facebook-with-circle" size={30} color={Colors.mainColor}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Entypo name="twitter-with-circle" size={30} color={Colors.mainColor}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Entypo name="google--with-circle" size={30} color={Colors.mainColor}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 20,
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
    input: {
        marginVertical: 4,
        borderRadius: 16,
        padding: 20,
        backgroundColor: '#ecedf1',
    },
    Text: {
        fontFamily: 'nunito-bold',
        fontSize: 26,
        color: Colors.mainColor,
    },
    subText: {
        fontFamily: 'nunito-bold',
        fontSize: 18,
        color: '#bcbdbf',
    },
    loginBtn: {
        backgroundColor: Colors.mainColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 16,
        padding: 10,
    },
    signUpSection: {
        alignItems: 'center',
        paddingVertical: 100,
        gap: 20,
    },
    iconSection: {
        flexDirection: 'row',
        gap: 20,
    },
    BackButton: {
        padding: 10,
        borderRadius: 15,
    },
    blurContainer: {
        borderRadius: 30,
        overflow: 'hidden',
    },
});
