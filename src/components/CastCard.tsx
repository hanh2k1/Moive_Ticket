import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { Colors } from '../../assets/theme';

const CastCard = (props) => {  
  return (
    <TouchableOpacity>
        <View
          style={[
            styles.container, {maxWidth: props.cardWidth}, 
            props.isFirst ? {marginLeft: 5} : 
            props.isLast ? {marginRight: 5} : 
            {},
          ]}>
          <Image style={[styles.cardImage, {width: props.cardWidth - 10}]} source={{uri: props.imagePath}}/>
          <Text numberOfLines={1} style={styles.textTitle}>{props.name}</Text>
        </View>
      </TouchableOpacity>
  )
}

export default CastCard

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
        fontSize: 8,
        color: Colors.textColor,
        textAlign: 'center',
        paddingVertical: 10,
      },
})