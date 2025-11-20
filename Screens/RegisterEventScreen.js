import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../ThemeContext'; // Update the path if needed

export default function RegisterEventScreen({ route, navigation }) {
  const event = route?.params?.event;
  const { isDarkTheme } = useTheme();

  const styles = StyleSheet.create({
    safeContainer: { flex: 1, backgroundColor: isDarkTheme ? '#121212' : 'white' },
    container: { flex: 1, padding: 16 },
    heading: {
      fontSize: 16,
      marginBottom: 8,
      color: isDarkTheme ? '#eee' : '#222',
    },
    eventTitle: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 16,
      color: isDarkTheme ? '#90caf9' : '#276baf',
    },
    input: {
      borderWidth: 1,
      borderColor: isDarkTheme ? '#444' : '#ccc',
      marginBottom: 12,
      padding: 8,
      borderRadius: 6,
      color: isDarkTheme ? '#fff' : '#222',
      backgroundColor: isDarkTheme ? '#232323' : '#fff',
    },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = () => {
    if (!name || !email) {
      Alert.alert('Please fill in your name and email.');
      return;
    }

    // Submit registration logic would go here

    Alert.alert(
      'Registration successful',
      `You are registered for ${event?.title || 'the event'}`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  if (!event) {
    return (
      <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
        <View style={styles.center}>
          <Text>No event data available.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <Text style={styles.heading}>Register for</Text>
        <Text style={styles.eventTitle}>{event.title}</Text>

        <TextInput
          placeholder="Full Name"
          placeholderTextColor={isDarkTheme ? '#bbb' : '#888'}
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor={isDarkTheme ? '#bbb' : '#888'}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Phone (optional)"
          placeholderTextColor={isDarkTheme ? '#bbb' : '#888'}
          style={styles.input}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Button
          title="Submit Registration"
          color={isDarkTheme ? '#60a5fa' : '#276baf'}
          onPress={handleRegister}
        />
      </View>
    </SafeAreaView>
  );
}
