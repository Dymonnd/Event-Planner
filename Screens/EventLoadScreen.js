import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function EventLoadScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('Events');
    }, 700); // adjust duration if you want longer/shorter

    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#276baf" />
      <Text style={styles.text}>Loading Events...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#276baf',
    fontWeight: 'bold',
  },
});
