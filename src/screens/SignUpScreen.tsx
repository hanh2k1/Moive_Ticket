import { Alert, View, Image, Text, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions, TouchableOpacity } from 'react-native'
import { Colors } from '../../assets/theme'
import { Entypo } from '@expo/vector-icons';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react'

const {width, height} = Dimensions.get('window');

const SignUpScreen = ({navigation}) => {
    const [email, setEmal] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = FIREBASE_AUTH;

    const createAlert = (type, message = '') => {
        switch(type) {
            case 1: 
                return Alert.alert('Sign up', 'Sign up succesful!', [
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
            const response = await createUserWithEmailAndPassword(auth, email, password);
            if (response.user) {
                const user = {
                    name: response.user.email.replace('@gmail.com', ''),
                    phone: phone,
                    address: address,
                    balance: 0,
                    email: response.user.email,
                    collectionName: 'Cart'+response.user.email,
                    avatarPath: 'https://firebasestorage.googleapis.com/v0/b/cs426-booking-movietickect-app.appspot.com/o/avatar.png?alt=media&token=49ea4484-7d26-46d3-84db-42477c674d3a',
                  };
                await setDoc(doc(FIRESTORE_DB, "User", response.user.uid), user);
                createAlert(1);
                navigation.navigate('Login');
            }
        } catch(error) {
            console.log(error);
            createAlert(2, error);
        } finally {
            setLoading(false);
        }
    };
    if (loading) return (
        <View style={{...styles.container, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={Colors.mainColor}/>
        </View>
      )
    else
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <KeyboardAvoidingView behavior='padding'>
                    <View style={{flexDirection: 'row'}}>
                        <BlurView 
                            intensity={60} tint="dark" style={styles.blurContainer}
                        >
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.BackButton}>
                            <AntDesign name="arrowleft" size={24} color={Colors.mainColor} />
                            </TouchableOpacity>
                        </BlurView>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Image source={require('../../assets/logo.png')} style={{width: width/3, height: width/3}}/>
                    </View>
                    <View>
                        
                    </View>
                    <View style={{paddingTop: 20, paddingBottom: 20}}>
                        <Text style={styles.Text}>
                            Create new account!
                        </Text>
                    </View>
                    <TextInput 
                        style={styles.input}
                        placeholder='Email'
                        onChangeText={(text) => setEmal(text)} 
                        value={email}
                    >
                    </TextInput>
                    <TextInput 
                        style={styles.input}
                        placeholder='Password'
                        onChangeText={(text) => setPassword(text)} 
                        value={password}
                        textContentType='password'
                        secureTextEntry

                    >
                    </TextInput>
                    <TextInput 
                        style={styles.input}
                        placeholder='Phone number'
                        onChangeText={(text) => setPhone(text)} 
                        value={phone}
                        keyboardType='numeric'
                    >
                    </TextInput>
                    <TextInput 
                        style={styles.input}
                        placeholder='Address'
                        onChangeText={(text) => setAddress(text)} 
                        value={address}
                    >
                    </TextInput>
    
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
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 20,
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    input: {
        marginVertical: 4,
        borderRadius: 16,
        padding: 20,
        backgroundColor: '#ecedf1',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 100,
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
        padding: 10
    },
    signUpSection: {
        alignItems:'center',
        paddingVertical: 100,
        gap: 20,
    },
    iconSection: {
        flexDirection: 'row',
        gap: 20
    },
    BackButton: {
        padding: 10,
        borderRadius: 15,
      },
    blurContainer: {
        borderRadius: 30,
        overflow: 'hidden',
    },
})