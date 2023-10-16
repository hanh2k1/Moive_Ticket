import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getSearchList, baseImagePath, getGenresList } from '../api/apicalls';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

import PopularMovieCard from '../components/PopularMovieCard';
import SearchBar from '../components/SearchBar';
import { Colors } from '../../assets/theme';

const {width, height} = Dimensions.get('window');

const SearchScreen = ({navigation}) => {
  const [searchList, setSearchList] = useState([]);

  const pressSearchHandler = async (results) => {
    const list = await getSearchList(results);
    setSearchList(list.results);
  }

  return (
    <View style={styles.container}>
      <SearchBar searchFunction={pressSearchHandler}/>

      <View style={{paddingTop: 20, alignItems: 'center'}}>
        <FlatList
          data={searchList}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          bounces={false}
          numColumns={2}
          contentContainerStyle={{gap: 16}}
          decelerationRate="fast"
          renderItem={({item, index}) => (
            <PopularMovieCard
              cardFunction={() => {
                navigation.push('MovieDetails', {movieid: item.id});
                console.log(item.id);
              }}
              cardWidth={width / 2.2}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
              isHorizontal={false}
            />
          )}
        />
      </View>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingHorizontal: 10,
  }
})