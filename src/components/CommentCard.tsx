import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { Colors } from '../../assets/theme';
import { baseImagePath } from '../api/apicalls';
import { AntDesign } from '@expo/vector-icons';

const CommentCard = (props) => {  
  return (
    <TouchableOpacity>
        <View style={{...styles.container, maxWidth: props.cardWidth - 50}}>
          <Image style={[styles.cardImage, {width: props.cardWidth/10, height: props.cardWidth/10}]} source={props.imagePath ? {uri: baseImagePath('w342', props.imagePath)} : require('../../assets/avatar-comment.png')}/>
          <View style={{width: '93%', justifyContent: 'center' }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.textTitle}>{props.name}</Text>
              {!props.rating ? 
                (              
                  <View></View>
                ) :
                (      
                  <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                    <Text style={styles.text}>{props.rating}</Text>
                    <AntDesign name="star" size={14} color={Colors.mainColor} />
                  </View>
                )
              }
            </View>
            <View>
              <Text numberOfLines={3} style={styles.text}>{props.content}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
  )
}

export default CommentCard

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 20,
  },
  cardImage: {
    aspectRatio: 1 / 1,
    borderRadius: 20,
  },
  textTitle: {
    fontFamily: 'nunito-bold',
    fontSize: 14,
    color: Colors.textColor,
    textAlign: 'center',
    paddingVertical: 10,
  },
  text: {
    fontFamily: 'nunito-regular',
    fontSize: 12,
    color: Colors.textColor,
    textAlign: 'center',
    paddingVertical: 10,
  },
})