import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View, Image } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../assets/theme";

export default function PaymentScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [momoQRCodeURL, setMomoQRCodeURL] = useState(
  );

  return (
    <View style={{ backgroundColor: Colors.backgroundColor, flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.BackButton}
        >
          <AntDesign name="arrowleft" size={24} color={Colors.mainColor} />
        </TouchableOpacity>
        <Text style={styles.TextHeader}>Payment</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 20, marginTop: 50 }}>
        <TouchableOpacity
          style={{
            borderRadius: 25,
            backgroundColor: Colors.mainColor,
            paddingVertical: 10,
            paddingHorizontal: 10,
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            gap: 15,
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="wallet" size={28} color="white" />
          <Text style={styles.text}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            borderRadius: 25,
            backgroundColor: Colors.mainColor,
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignContent: "center",
            justifyContent: "center",
            gap: 15,
            flexDirection: "row",
          }}
        >
          <AntDesign name="qrcode" size={28} color="white" />
          <Text style={styles.text}>MoMo</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <AntDesign name="close" size={28} color="white" />
          </TouchableOpacity>
          <Image source={ require('../../assets/qr.png')} style={styles.qrCodeImage} />
        </View>
      </Modal>
    </View>
  );
}

const styles = {
  BackButton: {
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
  },
  TextHeader: {
    color: Colors.textColor,
    fontSize: 25,
    marginTop: 30,
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: 115,
  },
  text: {
    color: Colors.textColor,
    fontFamily: "nunito-bold",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 15,
  },
  qrCodeImage: {
    width: 200,
    height: 200,
  },
};
