import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../../assets/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, Image, TextInput, FlatList, StyleSheet } from 'react-native';
import React, {useRef, useState} from 'react';

const SearchBar = (props) => {
  const insets = useSafeAreaInsets();

  const [searchText, setSearchText] = useState('');

  return (
    <View style={{...styles.container, paddingTop: insets.top}}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.subTitle}
            onChangeText={textInput => setSearchText(textInput)}
            value={searchText}
            placeholder="Search movies..."
            placeholderTextColor={Colors.textColor}
          />
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={() => props.searchFunction(searchText)}>
            <AntDesign name="search1" size={24} color={Colors.mainColor} />
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'nunito-bold',
    fontSize: 16,
    color: Colors.textColor,
  },
  subTitle: {
    fontFamily: 'nunito-regular',
    fontSize: 14,
    color: Colors.textColor,
    width: '90%',
  },
  inputBox: {
    display: 'flex',
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
})