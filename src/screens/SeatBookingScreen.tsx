import { ActivityIndicator, TouchableOpacity, ImageBackground, StatusBar, ScrollView, StyleSheet, Text, View, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { baseImagePath } from '../api/apicalls';
import { Colors } from '../../assets/theme';
import { useEffect } from 'react';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { doc, setDoc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { getCurrUser, setCurrUser } from '../data/data';

const SeatBookingScreen = ({navigation, route}) => {
  const [seatDetails, setSeatDetails] = useState(null);
  const [dates, setDates] = useState([]);
  const [hours, setHours] = useState([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedHour, setSelectedHour] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [hallById, setHallById] = useState([]); // 0: hall of 7h30, 1: hall of 10h30...
  const [loaded, setLoaded] = useState(false);

  const arrayCol = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const arrayRow = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  const scheduleHours = [7 * 60 + 30, 10 * 60 + 30, 13 * 60 + 30, 16 * 60 + 30, 19 * 60 + 30, 22 * 60 + 30];
  const dayOfWeekNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const normalPrice = 3;
  const specialPrice = 4.5;

  const handlePressSeat = (rowIndex, cellIndex) => {
    const updatedSeatDetails = [...seatDetails];

    if (seatDetails[rowIndex][cellIndex] === 'available') {
      updatedSeatDetails[rowIndex][cellIndex] = 'selected';
      if (rowIndex >= 3 && rowIndex <= 5 && cellIndex >= 3 && cellIndex <= 8) {
        setTotalPrice(totalPrice + specialPrice);
      }
      else setTotalPrice(totalPrice + normalPrice);
    } 
    else if (seatDetails[rowIndex][cellIndex] === 'selected') {
      updatedSeatDetails[rowIndex][cellIndex] = 'available';
      if (rowIndex >= 3 && rowIndex <= 5 && cellIndex >= 3 && cellIndex <= 8) {
        setTotalPrice(totalPrice - specialPrice);
      }
      else setTotalPrice(totalPrice - normalPrice);
    }

    setSeatDetails(updatedSeatDetails);
  }

  const handlePressBuyTickets = async () => {
    if (totalPrice > 0) {
      const isSuccess = totalPrice <= getCurrUser().balance;
      if (isSuccess) {
        setLoaded(false);
        const selectedSeats = [];
        const tempSeatDetails = [...seatDetails];
        for (var i = 0; i < seatDetails.length; i++) {
          for (var j = 0; j < seatDetails[i].length; j++) {
            if (tempSeatDetails[i][j] == 'selected') {
              var rowLabel = String.fromCharCode(65 + i);
              var seatNumber = j + 1;
              selectedSeats.push(rowLabel + seatNumber);
              tempSeatDetails[i][j] = 'taken';
            }
          }
        } 
        const seatsArray = { A: null, B: null, C: null, D: null, E: null, F: null, G: null, H: null, I: null };
        const keys = Object.keys(seatsArray);

        for (let i = 0; i < keys.length; i++) {
          seatsArray[keys[i]] = tempSeatDetails[i];
        }

        try {
        const docRef = doc(FIRESTORE_DB, 'Cinema', dates[selectedDate] + '-' + hours[selectedHour] + '-' + hallById[selectedHour]);
        await setDoc(docRef, seatsArray);

        await updateDoc(doc(FIRESTORE_DB,'User', getCurrUser().id),{
          balance: getCurrUser().balance - totalPrice
        });

        const colRef = collection(FIRESTORE_DB, getCurrUser().collectionName);
        await addDoc(colRef, {
          date: dates[selectedDate],
          hour: hours[selectedHour],
          hall: hallById[selectedHour],
          posterPath: baseImagePath('w780', route.params.movieDetails.poster_path),
          price: totalPrice,
          title: route.params.movieDetails.title,
          seats: selectedSeats,
        });

        } catch(error) {
          console.log('Error in handlePressBuyTickets:', error);
        } finally {
          setLoaded(true);
        }
        setCurrUser({...getCurrUser(),
          balance: getCurrUser().balance - totalPrice
        });
      }
      navigation.navigate('Order', {isSuccess: isSuccess});
    }
  }

  const renderSeats = () => {
    return (
      <View style={{ alignItems: 'center', paddingVertical: 20}}>
        {seatDetails.map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: 'row', paddingHorizontal: 2}}>
            {row.map((cell, cellIndex) => {
              if (cellIndex > 3 && cellIndex < 8 && rowIndex == 3) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderTopWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (cellIndex > 3 && cellIndex < 8 && rowIndex == 5) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderBottomWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (rowIndex == 4 && cellIndex == 3) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderLeftWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (rowIndex == 4 && cellIndex == 3) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderLeftWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (rowIndex == 4 && cellIndex == 8) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderRightWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (rowIndex == 3 && cellIndex == 3) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderLeftWidth: 1, borderTopWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (rowIndex == 3 && cellIndex == 8) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderRightWidth: 1, borderTopWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (rowIndex == 5 && cellIndex == 3) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderLeftWidth: 1, borderBottomWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (rowIndex == 5 && cellIndex == 8) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderRightWidth: 1, borderBottomWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (rowIndex == 0 && cellIndex != 0) return (
                <View style={{alignItems: 'center'}}>
                  <View>
                    <Text style={styles.text}>{arrayCol[cellIndex]}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2}}>
                    <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                  </TouchableOpacity>
                </View>
              )
              if (rowIndex != 0 && cellIndex == 0) return (
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <View style={{width: 12}}>
                    <Text style={styles.text}>{arrayRow[rowIndex]}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2}}>
                    <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                  </TouchableOpacity>
                </View>
              )
              if (rowIndex == 0 && cellIndex == 0) return (
                <View>
                  <View style={{paddingLeft: 25}}>
                    <Text style={styles.text}>{arrayCol[cellIndex]}</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                    <View style={{width: 12}}>
                      <Text style={styles.text}>{arrayRow[rowIndex]}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2}}>
                      <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                    </TouchableOpacity>
                  </View>
                </View>
              )
              else return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
            })}
          </View>
        ))}
      </View>
    );
  }

  const renderDates = () => {
    return (
      <View style={{paddingTop: 20, flexDirection: 'row', justifyContent: 'center', gap: 20}}>
        {
          dates.map((date, index) => (
            <TouchableOpacity onPress={() => setSelectedDate(index)} style={{ alignItems: 'center', justifyContent:'center', padding: 10, width: 60, height: 80, borderRadius: 25, backgroundColor: index != selectedDate ? '#0b0b0b' : Colors.mainColor}}>
              <Text style={{...styles.text, fontSize: 16}}>{date.slice(0, 6)}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }

  const renderHours = () => {
    return (
      <View style={{paddingTop: 10, flexDirection: 'row', justifyContent: 'center', gap: 8}}>
        {
          hours.map((hour, index) => (
            <TouchableOpacity onPress={() => setSelectedHour(index)} style={{ alignItems: 'center', justifyContent:'center', padding: 10, borderRadius: 25, backgroundColor: index != selectedHour ? '#0b0b0b' : Colors.mainColor}}>
              <Text style={{...styles.text, fontSize: 12}}>{hour}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }

  const initializeSeats = () => {
    const seatDetails = [];
    for (let i = 0; i < 9; ++i) {
      const row = [];
      for (let j = 0; j < 12; ++j) {
        row.push('available');
      }
      seatDetails.push(row);
    }
    return seatDetails;
  };

  useEffect(() => {
    setLoaded(false);
    setTotalPrice(0);

    const fetchDates = () => {
      const currentDate = new Date();
      const datesArray = [];
      for (let i = 0; i < 5; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);

        const dayOfWeek = dayOfWeekNames[date.getDay()];
        datesArray.push(`${date.getDate().toString().padStart(2, '0')} ${dayOfWeek} ${(date.getMonth() + 1).toString().padStart(2, '0')} ${date.getFullYear().toString()}`);
      }
      setDates(datesArray);
      return datesArray;
    }
    const fetchHours = () => {
      const currentTime = new Date();
      const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
      const hoursArray = selectedDate == 0 ? scheduleHours.filter((time) => time > currentMinutes) : scheduleHours;
      const formattedHours = hoursArray.map((minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
      });

      setHours(formattedHours);
      return formattedHours;
    }
    const fetchHalls = async (hoursArray) => {
      const docRef = doc(FIRESTORE_DB, 'Schedule', route.params.movieDetails.id.toString());
      const docSnapshot = await getDoc(docRef);

      let tempHalls = [];
      for (let i = 0; i < hoursArray.length; ++i) {
        for (let j = 0; j < 6; ++j) {
          if (docSnapshot.get(`P${j+1}`) == hoursArray[i]) {
            tempHalls[i] = `P${j+1}`;
          }
        }
      }
      setHallById(tempHalls);
      return tempHalls;
    }
    async function fetchSeats(datesArray, hoursArray, hallsArray) {
      const docRef = doc(FIRESTORE_DB, 'Cinema', datesArray[selectedDate] + '-' + hoursArray[selectedHour] + '-' + hallsArray[selectedHour]);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        const seatsArray = { A: null, B: null, C: null, D: null, E: null, F: null, G: null, H: null, I: null };
        const keys = Object.keys(seatsArray);

        for (let i = 0; i < keys.length; i++) {
          const row = [];
          for (let j = 0; j < 12; ++j) {
            row.push('available');
          }
          seatsArray[keys[i]] = row;
        }

        await setDoc(docRef, seatsArray);
        setSeatDetails(initializeSeats());
      }
      else {
        const keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
        const seatsArray = [];
        for (let i = 0; i < 9; ++i) {
          seatsArray.push(docSnapshot.get(keys[i]));
        }
        setSeatDetails(seatsArray);
      }
    }
    async function fetchData() {
      try {
        const datesArray = fetchDates();
        const hoursArray = fetchHours();
        const hallsArray = await fetchHalls(hoursArray);
        if (hoursArray.length != 0) await fetchSeats(datesArray, hoursArray, hallsArray);
      }
      catch (error) {
        console.log('Error in fetchData SeatBookingScreen:', error);
      }
      finally {
        setLoaded(true);
      }
    }
    
    
    fetchData();
  }, [selectedDate, selectedHour]);

  if (!loaded) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={Colors.mainColor} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />

      <View>
        <ImageBackground
          source={{uri: baseImagePath('w780', route.params.movieDetails.backdrop_path)}}
          style={styles.imageBG}
        >
          <LinearGradient colors={['rgba(0,0,0,0.1)', Colors.backgroundColor]} style={styles.linearGradient}>
            
            <View style={{flexDirection: 'row'}}>
              <BlurView 
                intensity={60} tint="dark" style={styles.blurContainer}
              >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.BackButton}>
                  <AntDesign name="arrowleft" size={24} color={Colors.mainColor} />
                </TouchableOpacity>
              </BlurView>
            </View>

            <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: 'row'}}>
              <View></View>
              <View style={hours.length != 0 ? {paddingLeft: 20} : {}}>
                <Text style={{...styles.text, color: 'gray'}}>screen this side</Text>
              </View>
              {hours.length != 0 ?
                <View style={{paddingRight: 10, alignItems: 'center'}}>
                  <Text style={{...styles.text, color: 'gray'}}>Hall</Text>
                  <Text style={styles.text}>{hallById[selectedHour]}</Text>
                </View> :
                <View></View>
              }
            </View>

            </LinearGradient>

        </ImageBackground>
      </View>

      { hours.length != 0 ? renderSeats() : 
      (<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20, height: 300}}>
        <Text style={styles.text}>Showtime is over</Text>
      </View>)}

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <MaterialCommunityIcons name="circle-slice-8" size={24} color="white" />
          <Text style={styles.text}>Available</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <MaterialCommunityIcons name="circle-slice-8" size={24} color="gray" />
          <Text style={styles.text}>Taken</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <MaterialCommunityIcons name="circle-slice-8" size={24} color={Colors.mainColor} />
          <Text style={styles.text}>Selected</Text>
        </View>
      </View>

      {renderDates()}
      {renderHours()}

      <View style={{paddingBottom: 20, paddingHorizontal: 50, paddingTop: 40, flexDirection: 'row', justifyContent: 'space-between', gap: 20}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{...styles.text, fontSize: 12, color: 'gray'}}>Total Price</Text>
          <Text style={{...styles.text, fontSize: 20}}>$ {(totalPrice).toFixed(2)}</Text>
        </View>


        <View style={{flexDirection:'column', gap:10}}><TouchableOpacity onPress={() => handlePressBuyTickets((navigation.navigate('PaymentScreen')))} style={{borderRadius: 25, backgroundColor: Colors.mainColor, paddingVertical: 10, paddingHorizontal: 10}}>
          <Text style={styles.text}>Payment Methods</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePressBuyTickets()} style={{borderRadius: 25, backgroundColor: Colors.mainColor, paddingVertical: 10, paddingHorizontal: 20, alignContent:'center', justifyContent:'center'}}>
          <Text style={styles.text}>Buy Tickets</Text>
        </TouchableOpacity></View>
      </View>

    </ScrollView>
  )
}

export default SeatBookingScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: Colors.backgroundColor,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  BackButton: {
    padding: 10,
    borderRadius: 15,
  },
  blurContainer: {
    margin: 10,
    borderRadius: 30,
    overflow: 'hidden',
  },
  imageBG: {
    width: '100%',
    aspectRatio: 2 / 1.5,
  },
  linearGradient: {
    height: '100%',
  },
  text: {
    color: Colors.textColor,
    fontFamily: 'nunito-bold',
  },
});