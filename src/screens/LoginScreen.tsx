import { Alert, View, Image, Text, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig'
import { Colors } from '../../assets/theme';
import { setCurrUser } from '../data/data';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const LoginScreen = (props) => {
    const [email, setEmal] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const navigator = useNavigation();

    const createAlert = (type, message = '') => {
        switch(type) {
            case 1: 
                return Alert.alert('Login', 'Login succesful!', [
                {
                    text: 'Done',
                    onPress: () => {},
                    style: 'cancel',
                }])
                break;
            case 2: 
                return Alert.alert('Login', 'Login failed!: '+ message, [
                {
                    text: 'Done',
                    onPress: () => {},
                    style: 'cancel',
                }])
                break;
        }
    } 

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            if(response.user) {
                // createAlert(1);
                const docRef = doc(FIRESTORE_DB, 'User', response.user.uid);
                const user = await getDoc(docRef);
                console.log(user.data());
                setCurrUser({...user.data(), id: response.user.uid});
                props.setUser({...user.data(), id: response.user.uid});
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
    else {
        return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <KeyboardAvoidingView behavior='padding'>
                    <View style={{alignItems: 'center'}}>
                        <Image source={require('../../assets/logo.png')} style={{width: width/3, height: width/3}}/>
                    </View>
                    <View style={{paddingTop: 50, paddingBottom: 20}}>
                        <Text style={styles.Text}>
                            Welcome!
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
                        secureTextEntry

                    >
                    </TextInput>
    
                    <TouchableOpacity style={styles.loginBtn} onPress={() => signIn()}>
                        <Text style={{...styles.Text, color: 'white', fontSize: 18}}>
                            Login
                        </Text>
                    </TouchableOpacity>
    
                    <View style={styles.signUpSection}>
                        <Text style={styles.subText}>
                            Don't have an account? 
                        </Text>
                        <TouchableOpacity onPress={() => navigator.navigate('Sign Up')}>
                            <Text style={{...styles.subText, color: Colors.mainColor }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    {/* {loading ? <ActivityIndicator size={'large'} color='#0000ff'/> : <View></View>} */}
    
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
        )
    }
}

export default LoginScreen;

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
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 100,
        gap: 20,
    }
});