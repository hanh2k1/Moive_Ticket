import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import { getGenresList } from '../api/apicalls';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../../assets/theme';
import { LinearGradient } from 'expo-linear-gradient';


const TicketCard = (props) => {
  return (
    <View style={[
      styles.container,
      { maxWidth: props.cardWidth },
    ]}>
      <View style={styles.ticketContainer}>
        <ImageBackground
          source={{uri: props.ticketData.posterPath}}
          style={styles.ticketBGImage}>
          <LinearGradient
            colors={['rgba(255,85,36,0)', Colors.mainColor]}
            style={styles.linearGradient}>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -50, left: -50},
              ]}></View>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -50, right: -50},
              ]}></View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.linear}></View>

        <View style={styles.ticketFooter}>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -50, left: -50},
            ]}></View>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -50, right: -50},
            ]}></View>
          <View style={styles.ticketDateContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.dateTitle}>{props.ticketData.date.slice(0, 3)}</Text>
              <Text style={styles.subtitle}>{props.ticketData.date.slice(3, 6)}</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <AntDesign name="clockcircle" size={24} color={Colors.textColor} />
              <Text style={styles.subtitle}>{props.ticketData.hour}</Text>
            </View>
          </View>
          <View style={styles.ticketSeatContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Cost</Text>
              <Text style={styles.subtitle}>${props.ticketData.price}</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Hall</Text>
              <Text style={styles.subtitle}>{props.ticketData.hall}</Text>
            </View>
            <View style={styles.subtitleContainer}>
              {
                props.ticketData.seats.length == 1 ?
                <Text style={styles.subheading}>Seat</Text> :
                <Text style={styles.subheading}>Seats</Text>
              }
              <Text style={styles.subtitle}>
                {props.ticketData.seats
                  .slice(0, 3)
                  .map((item, index, arr) => {
                    return item + (index != arr.length - 1 ? ', ' : props.ticketData.seats.length > 3  ? '...' : '');
                  })}
              </Text>
            </View>
          </View>
          <Image
            source={require('../../assets/barcode.png')}
            style={styles.barcodeImage}
          />
        </View>
      </View>
    </View>
  );
};

export default TicketCard;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  ticketBGImage: {
    alignSelf: 'center',
    width: 300,
    aspectRatio: 200 / 300,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  linearGradient: {
    height: '70%',
  },
  linear: {
    borderTopColor: Colors.backgroundColor,
    borderTopWidth: 3,
    width: 300,
    alignSelf: 'center',
    backgroundColor: Colors.mainColor,
    borderStyle: 'dashed',
  },
  ticketFooter: {
    backgroundColor: Colors.mainColor,
    width: 300,
    alignItems: 'center',
    paddingBottom: 36,
    alignSelf: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  ticketDateContainer: {
    flexDirection: 'row',
    gap: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  ticketSeatContainer: {
    flexDirection: 'row',
    gap: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dateTitle: {
    fontFamily: 'nunito-bold',
    fontSize: 24,
    color: Colors.textColor,
  },
  subtitle: {
    fontFamily: 'nunito-regular',
    fontSize: 14,
    color: Colors.textColor,
  },
  subheading: {
    fontFamily: 'nunito-bold',
    fontSize: 18,
    color: Colors.textColor,
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  barcodeImage: {
    height: 50,
    aspectRatio: 158 / 52,
  },
  blackCircle: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: Colors.backgroundColor,
  },
});