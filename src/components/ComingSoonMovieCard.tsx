import {Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import React, { useState } from 'react';
import { getCurrGenresList } from '../data/data';

const ComingSoonMovieCard = (props) => {
  const [genreslList, setGenreslList] = useState(getCurrGenresList());
  
  const renderGenres = (genreIDs) => {
    if (genreslList == null) {
      return (
        <ActivityIndicator size={'large'} color={'orange'} />
      )
    }
    else {
      let result = [];
      for (let i = 0; i < genreIDs.length; ++i) {
        for (let j = 0; j < genreslList.length; ++j) {
          if (genreIDs[i] == genreslList[j].id) {
            result.push(genreslList[j]);
          }
        }
      }
      result = result.slice(0, 3);
      return (
        result.map((genre, index) => (
          <Text key={genre.id}  style={styles.textGenre}>{genre.name}{index != result.length - 1 && ','}</Text>
          )
        )
      )
    }
  }

  return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
      <View
        style={[
          styles.container, props.isFirst ? {marginLeft: 36} : 
          props.isLast ? {marginRight: 36} : 
          {}, {minWidth: props.cardWidth, maxHeight: props.cardWidth / 3},
        ]}>
        <Image style={[styles.cardImage, {width: props.cardWidth / 4}]} source={{uri: props.imagePath}}/>
        
        <View style={{paddingLeft: 10, width: props.cardWidth/1.3}}>
          <Text numberOfLines={1} style={styles.textTitle}>{props.title}</Text>
          <View style={styles.genreContainer}>
            {renderGenres(props.genres)}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ComingSoonMovieCard

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#272727',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 25,
  },
  cardImage: {
    aspectRatio: 1 / 1,
    borderRadius: 20,
  },
  textTitle: {
    fontFamily: 'nunito-bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  textGenre: {
    fontFamily: 'nunito-regular',
    fontSize: 14,
    color: 'white',
    paddingVertical: 5,
  },
})