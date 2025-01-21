// CashoutModal.tsx
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface CashoutModalProps {
  isVisible: boolean;
  cashoutAmount: number;
  onClose: () => void;
}

const CashoutModal: React.FC<CashoutModalProps> = ({
  isVisible,
  cashoutAmount,
  onClose,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <StatusBar style="auto" />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Cash Out Amount: {cashoutAmount.toFixed(2)}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#1a1a1a",
    borderWidth: 5,
    borderColor: "#7C3AED",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    color: "#7c3aed",
  },
  button: {
    backgroundColor: "#7C3AED",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins-Medium",
  },
});

export default CashoutModal;
