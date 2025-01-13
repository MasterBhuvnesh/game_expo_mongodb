import React, { createContext, useContext, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

interface LoadingContextType {
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  setLoading: () => {},
});

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {children}
      <Modal transparent visible={loading}>
        <View style={styles.modalBackground}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </Modal>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

