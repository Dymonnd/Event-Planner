// Screens/EventNotFoundScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../ThemeContext';

export default function EventNotFoundScreen({ navigation }) {
  const { isDarkTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: isDarkTheme ? '#141c22' : '#2d75a8' }]}
                  edges={['top','left','right']}>
      <View style={styles.container}>
        <Text style={[styles.icon, { color: isDarkTheme ? '#899bb5' : '#3b4b63' }]}>🔍</Text>
        <Text style={[styles.message, { color: isDarkTheme ? '#cdd9ea' : '#eef5ff' }]}>
          No events match these filters
        </Text>

    <TouchableOpacity
         style={styles.button}
         onPress={() => navigation.goBack()}
>
        <Text style={styles.buttonText}>Clear filters</Text>
    </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 80, marginBottom: 18 },
  message: { fontSize: 16, marginBottom: 18 },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#4ba3e7',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
