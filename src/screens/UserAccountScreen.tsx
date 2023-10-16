import React, { useState } from 'react';
import { Image, ActivityIndicator, Dimensions, Modal, StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Colors } from '../../assets/theme';
import { AntDesign, Feather } from '@expo/vector-icons';
import { getCurrUser, setCurrUser } from '../data/data';
import { FIRESTORE_DB, FIREBASE_STO } from '../../firebaseConfig';
import { updateDoc, doc} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import * as ImagePicker from "expo-image-picker";

const {width, height} = Dimensions.get('window');

const UserAccountScreen = () => {
  const [user, setUser] = useState(getCurrUser());
  const [modalName, setModalName] = useState(false);
  const [modalPhone, setModalPhone] = useState(false);
  const [modalEmail, setModalEmail] = useState(false);
  const [modalAddress, setModalAddress] = useState(false);
  const [modalBalance, setModalBalance] = useState(false);

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [balance, setBalance] = useState(user.balance);
  const [image, setImage] = useState(getCurrUser().avatarPath);
  const [loading, setLoading] = useState(false);

  async function saveRecord(url) {
    try {
      await updateDoc(doc(FIRESTORE_DB,'User', user.id),{
        avatarPath: url
      });
      setUser({...user, avatarPath: url});
      setCurrUser({...user, avatarPath: url});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function uploadImage(uri) {
    setLoading(true);
    
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(FIREBASE_STO, getCurrUser().email);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);

          await saveRecord(downloadURL);
        });
      },
    );
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
   
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
    }
  }

  const handlePressCloseName = () => {
    setName(user.name);
    setModalName(!modalName);
  }
  const handlePressSaveName = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(FIRESTORE_DB,'User', user.id),{
        name: name
      });
      setUser({...user, name: name});
      setCurrUser({...user, name: name});
      setModalName(!modalName);
    } catch(error) {
      console.log('Error in Save Name:', error);
    } finally {
      setLoading(false);
    }
  }
  const handlePressClosePhone = () => {
    setPhone(user.phone);
    setModalPhone(!modalPhone);
  }
  const handlePressSavePhone = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(FIRESTORE_DB,'User', user.id),{
        phone: phone
      });
      setUser({...user, phone: phone});
      setCurrUser({...user, phone: phone});
      setModalPhone(!modalPhone);
    } catch(error) {
      console.log('Error in Save Phone:', error);
    } finally {
      setLoading(false);
    }
  }

  const handlePressCloseEmail = () => {
    setEmail(user.email);
    setModalEmail(!modalEmail);
  }
  const handlePressSaveEmail = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(FIRESTORE_DB,'User', user.id),{
        email: email
      });
      setUser({...user, email: email});
      setCurrUser({...user, email: email});
      setModalEmail(!modalEmail);
    } catch(error) {
      console.log('Error in Save Email:', error);
    } finally {
      setLoading(false);
    }
  }

  const handlePressCloseAddress = () => {
    setAddress(user.address);
    setModalAddress(!modalAddress);
  }
  const handlePressSaveAddress = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(FIRESTORE_DB,'User', user.id),{
        address: address
      });
      setUser({...user, address: address});
      setCurrUser({...user, address: address});
      setModalAddress(!modalAddress);
    } catch(error) {
      console.log('Error in Save Address:', error);
    } finally {
      setLoading(false);
    }
  }

  const handlePressCloseBalance = () => {
    setBalance(user.balance);
    setModalBalance(!modalBalance);
  }
  const handlePressSaveBalance = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(FIRESTORE_DB,'User', user.id),{
        balance: balance
      });
      setUser({...user, balance: balance});
      setCurrUser({...user, balance: balance});
      setModalBalance(!modalBalance);
    } catch(error) {
      console.log('Error in Save Balance:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <View style={{...styles.container, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} color={Colors.mainColor}/>
    </View>
  )
  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <Image source={{uri: image}} style={{borderColor: 'gray', borderWidth: 5, borderRadius: 100, width: 150, height: 150}}/>
          <TouchableOpacity onPress={() => pickImage()} style={{borderRadius: 50, padding: 10, position: 'absolute', bottom: 0, right: 10, backgroundColor: Colors.mainColor}}>
            <AntDesign name="camera" size={24} color={Colors.textColor} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalName}
        onRequestClose={() => {
          setModalName(!modalName);
        }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ ...styles.title, fontSize: 20, }}>Change your full name:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(name) => setName(name)}
                defaultValue={name.toString()}
                editable={true}
                maxLength={50}
                textAlign='center'
              />
              <View style={{ flexDirection: 'row', gap: 20, paddingTop: 50 }}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handlePressCloseName()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: Colors.mainColor }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => handlePressSaveName()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPhone}
        onRequestClose={() => {
          setModalPhone(!modalPhone);
        }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ ...styles.title, fontSize: 20, }}>Change your phone number:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(phone) => setPhone(phone)}
                defaultValue={phone}
                editable={true}
                maxLength={50}
                textAlign='center'
                keyboardType='numeric'
              />
              <View style={{ flexDirection: 'row', gap: 20, paddingTop: 50 }}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handlePressClosePhone()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: Colors.mainColor }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => handlePressSavePhone()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEmail}
        onRequestClose={() => {
          setModalEmail(!modalEmail);
        }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ ...styles.title, fontSize: 20, }}>Change your email:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(email) => setEmail(email)}
                defaultValue={email}
                editable={true}
                maxLength={50}
                textAlign='center'
              />
              <View style={{ flexDirection: 'row', gap: 20, paddingTop: 50 }}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handlePressCloseEmail()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: Colors.mainColor }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => handlePressSaveEmail()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAddress}
        onRequestClose={() => {
          setModalAddress(!modalAddress);
        }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ ...styles.title, fontSize: 20, }}>Change your Address:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(address) => setAddress(address)}
                defaultValue={address}
                editable={true}
                maxLength={50}
                textAlign='center'
              />
              <View style={{ flexDirection: 'row', gap: 20, paddingTop: 50 }}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handlePressCloseAddress()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: Colors.mainColor }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => handlePressSaveAddress()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalBalance}
        onRequestClose={() => {
          setModalBalance(!modalBalance);
        }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ ...styles.title, fontSize: 20, }}>Change your Balance:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(balance) => setBalance(balance)}
                defaultValue={balance}
                editable={true}
                maxLength={50}
                textAlign='center'
                keyboardType='numeric'
              />
              <View style={{ flexDirection: 'row', gap: 20, paddingTop: 50 }}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handlePressCloseBalance()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: Colors.mainColor }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => handlePressSaveBalance()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>


      <View style={styles.infoSection}>
        <View style={styles.rowInfo}>
          <View style={styles.icon}>
            <AntDesign name="user" size={24} color={Colors.mainColor} />
          </View>
          <View style={styles.info}>
            <Text style={styles.details}>Full name</Text>
            <Text numberOfLines={3} style={{ ...styles.title, fontSize: 20, maxWidth: 250 }}>{user.name}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalName(!modalName)} style={styles.editIcon}>
            <AntDesign name="edit" size={24} color={Colors.mainColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.rowInfo}>
          <View style={styles.icon}>
            <AntDesign name="phone" size={24} color={Colors.mainColor} />
          </View>
          <View style={styles.info}>
            <Text style={styles.details}>Phone number</Text>
            <Text numberOfLines={3} style={{ ...styles.title, fontSize: 20, maxWidth: 250 }}>{user.phone}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalPhone(!modalPhone)} style={styles.editIcon}>
            <AntDesign name="edit" size={24} color={Colors.mainColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.rowInfo}>
          <View style={styles.icon}>
            <AntDesign name="mail" size={24} color={Colors.mainColor} />
          </View>
          <View style={styles.info}>
            <Text style={styles.details}>Email</Text>
            <Text numberOfLines={3} style={{ ...styles.title, fontSize: 20, maxWidth: 250 }}>{user.email}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalEmail(!modalEmail)} style={styles.editIcon}>
            <AntDesign name="edit" size={24} color={Colors.mainColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.rowInfo}>
          <View style={styles.icon}>
            <AntDesign name="enviromento" size={24} color={Colors.mainColor} />
          </View>
          <View style={styles.info}>
            <Text style={styles.details}>Address</Text>
            <Text numberOfLines={3} style={{ ...styles.title, fontSize: 20, maxWidth: 250 }}>{user.address}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalAddress(!modalAddress)} style={styles.editIcon}>
            <AntDesign name="edit" size={24} color={Colors.mainColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.rowInfo}>
          <View style={styles.icon}>
            <Feather name="dollar-sign" size={24} color={Colors.mainColor} />
          </View>
          <View style={styles.info}>
            <Text style={styles.details}>Balance</Text>
            <Text numberOfLines={3} style={{ ...styles.title, fontSize: 20, maxWidth: 250 }}>{user.balance}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalBalance(!modalBalance)} style={styles.editIcon}>
            <AntDesign name="edit" size={24} color={Colors.mainColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default UserAccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
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
  details: {
    fontSize: 16,
    color: Colors.textColor,
    fontFamily: 'nunito-regular',
  },
  infoSection: {
    flex: 1,
    padding: 40,
    paddingHorizontal: 30,
    gap: 30,
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    width: '100%',
  },
  icon: {
    padding: 12,
    backgroundColor: '#f7f8fb',
    borderRadius: 50,
  },
  info: {
    gap: 3,
  },
  editIcon: {
    position: 'absolute',
    right: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    marginTop: 10,
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#f7f8fb',
    width: width-100,
    fontFamily: 'nunito-regular',
    fontSize: 18,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    paddingHorizontal: 50
  },
  buttonSave: {
    backgroundColor: Colors.mainColor,
  },
  buttonClose: {
    backgroundColor: '#f7f8fb',
  },
})
