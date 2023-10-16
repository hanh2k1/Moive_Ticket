import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react'
import { Colors } from '../../assets/theme';

const PopularMovieCard = (props) => {
  if (props.isHorizontal)
    return (
      <TouchableOpacity onPress={() => props.cardFunction()}>
        <View
          style={[
            styles.container, {maxWidth: props.cardWidth}, 
            props.isFirst ? {marginLeft: 36} : 
            props.isLast ? {marginRight: 36} : 
            {},
          ]}>
          <Image style={[styles.cardImage, {width: props.cardWidth - 10}]} source={{uri: props.imagePath}}/>
          <Text numberOfLines={1} style={styles.textTitle}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    )
  else return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
        <View
          style={[
            styles.container, {maxWidth: props.cardWidth},
          ]}>
          <Image style={[styles.cardImage, {width: props.cardWidth - 10}]} source={{uri: props.imagePath}}/>
          <Text numberOfLines={1} style={styles.textTitle}>{props.title}</Text>
        </View>
      </TouchableOpacity>
  )
}

export default PopularMovieCard

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    margin: 10,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: 20,
  },
  textTitle: {
    fontFamily: 'nunito-regular',
    fontSize: 14,
    color: Colors.textColor,
    textAlign: 'center',
    paddingVertical: 10,
  },
})