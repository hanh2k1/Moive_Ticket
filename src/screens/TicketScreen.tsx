import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, ActivityIndicator, StatusBar } from 'react-native';
import { Colors } from '../../assets/theme';
import Carousel from 'react-native-snap-carousel';
import { getCurrUser } from '../data/data';
import TicketCard from '../components/TicketCard';
import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const TicketScreen = () => {
  const [ticketBooked, setTicketBooked] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const isFocused = useIsFocused();

  function getMonthNumber(month) {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return months.indexOf(month);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoaded(false);
      try {
        const colRef = collection(FIRESTORE_DB, getCurrUser().collectionName);
        const querySnapshot = await getDocs(colRef);
        const tempList = [];
        querySnapshot.forEach((doc) => {

          const currentTime = new Date();
          currentTime.setMinutes(currentTime.getMinutes() - 15);

          const itemDateParts = doc.data().date.split(" ");
          const itemDay = parseInt(itemDateParts[0]);
          const itemMonth = parseInt(itemDateParts[2]) - 1;
          const itemYear = parseInt(itemDateParts[3]);
          const itemHourParts = doc.data().hour.split(":");
          const itemHour = parseInt(itemHourParts[0]);
          const itemMinute = parseInt(itemHourParts[1]);
          const itemDate = new Date(itemYear, itemMonth, itemDay, itemHour, itemMinute);
          
          if (itemDate > currentTime) tempList.push({...doc.data(), id: doc.id});
        })
        setTicketBooked(tempList);
      } catch(error) {
        console.log('Error in fetchData TicketScreen:', error);
      } finally {
        setLoaded(true);
      }
    }

    fetchData();
  },[isFocused])

  if (!loaded) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.ticketContainer}>
          <ActivityIndicator size={'large'} color={Colors.mainColor} />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>My Tickets</Text>
      </View>
      <Carousel
        data={ticketBooked}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          return (
            <TicketCard
              cardWidth={width * 0.8}
              ticketData={item}
            />
          )
        }}
        layout={'stack'}
        inactiveSlideScale={0.85}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.8}
      />
    </View>
  )
}

export default TicketScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    marginTop: 40,
    paddingHorizontal: 20
  },
  title: {
    fontFamily: 'nunito-bold',
    fontSize: 26,
    color: Colors.mainColor
  },
})