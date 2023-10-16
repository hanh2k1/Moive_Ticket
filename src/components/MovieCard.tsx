import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import { getGenresList } from '../api/apicalls';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../../assets/theme';

const MovieCard = (props) => {
  const renderGenres = (genreIDs) => {
    if (props.genresList == null) {
      return (
        <ActivityIndicator size={'large'} color={'orange'} />
      )
    }
    else {
      let result = [];
      for (let i = 0; i < genreIDs.length; ++i) {
        for (let j = 0; j < props.genresList.length; ++j) {
          if (genreIDs[i] == props.genresList[j].id) {
            result.push(props.genresList[j]);
          }
        }
      }
      result = result.slice(0, 3);
      return (
        result.map((genre, index) => (
          <View  key={genre.id} style={styles.genreBox}>
            <Text  style={styles.textGenre}>{genre.name}</Text>
          </View>
          )
        )
      )
    }
  }

  return (
    <View style={[
        styles.container,
        {maxWidth: props.cardWidth},
      ]}>
      <TouchableWithoutFeedback onPress={() => props.cardFunction()}>
        <Image
          style={[styles.cardImage, {width: props.cardWidth}]}
          source={{uri: props.imagePath}}
        />
      </TouchableWithoutFeedback>
      <View style={styles.voteContainer}>
        <AntDesign name="star" size={18} color="orange" />
        <Text style={styles.textVote}>{props.voteRate} ({props.voteCount})</Text>
      </View>
      <Text numberOfLines={2} style={styles.textTitle}>
        {props.title}
      </Text>
      <View style={styles.genreContainer}>
        {renderGenres(props.genres)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: 20,
  },
  textTitle: {
    fontFamily: 'nunito-regular',
    fontSize: 22,
    color: Colors.textColor,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  voteContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  textVote: {
    fontFamily: 'nunito-regular',
    fontSize: 14,
    color: Colors.textColor,
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
  genreBox: {
    borderRadius: 25,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  textGenre: {
    fontFamily: 'nunito-regular',
    fontSize: 14,
    color: Colors.textColor,
    paddingVertical: 5,
  },
});

export default MovieCard;