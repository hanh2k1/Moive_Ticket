import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from '../../assets/theme'
import React from 'react'

const {width, height} = Dimensions.get('window');

const OrderScreen = ({navigation, route}) => {
  
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/orderSuccess.png')}
        style={{width: width/2, height: width/2}}
      />

      <View style={styles.textSection}>
        <View style={styles.titleSection}>
          {route.params.isSuccess ? 
            <View  style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Text style={{...styles.title, color: 'green'}}>Order Success</Text>
              <AntDesign name="checkcircle" size={24} color="green" />
            </View> : 
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Text style={{...styles.title, color: 'red'}}>Order Failed</Text>
              <AntDesign name="closecircle" size={24} color="red" />
            </View>}
        </View>
        <View style={styles.detailsSection}>
          {route.params.isSuccess ? 
          <View style={styles.detailsSection}>
            <Text style={styles.details}>Your ticket has been placed successfully.</Text>
            <Text style={styles.details}>For more details, go to My Tickets.</Text>
          </View> :
          <View style={styles.detailsSection}>
            <Text style={styles.details}>Sorry, your ticket could not be placed due to</Text>
            <Text style={styles.details}>insufficient funds in your account.</Text>
            <Text style={{...styles.details, paddingTop: 10}}>Please top up your account and try again.</Text>
          </View>}
        </View>
      </View>

      {route.params.isSuccess ? 
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TabNavigator', {screen: 'Ticket' })}>
        <Text style={styles.textButton}>Track My Tickets</Text>
      </TouchableOpacity> :
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TabNavigator', {screen: 'User'})}>
        <Text style={styles.textButton}>Go to User to top up</Text>
      </TouchableOpacity>}
    </View>
  )
}

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textSection: {
    alignItems: 'center',
    paddingBottom: 70,
    paddingTop: 10,
  },
  titleSection: {
    paddingVertical: 20
  },
  title: {
    fontFamily: 'nunito-bold',
    fontSize: 24,
    color: Colors.mainColor,
  },
  detailsSection: {
    alignItems: 'center',
  },
  details: {
    fontFamily: 'nunito-bold',
    color: Colors.textColor,
  },
  button: {
    backgroundColor: Colors.mainColor,
    padding: 10,
    borderRadius: 50,
    width: width/1.5, 
    alignItems: 'center',
  },
  textButton: { 
    fontFamily: 'nunito-bold',
    color: 'white',
  },
});