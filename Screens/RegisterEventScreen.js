import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, IconButton } from 'react-native-paper';
import { useTheme } from '../ThemeContext';

export default function RegisterEventScreen({ route, navigation }) {
  const event = route?.params?.event;
  const { isDarkTheme } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const styles = StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: '#2d75a8',
    },
    headerBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 22,
      paddingTop: 18,
      paddingBottom: 10,
    },
    headerTitlePill: {
      paddingHorizontal: 26,
      paddingVertical: 6,
      borderRadius: 6,
      backgroundColor: '#52a9e8',
    },
    headerTitleText: {
      fontSize: 20,
      color: '#ffffff',
      letterSpacing: 1,
      fontWeight: '700',
    },
    content: {
      flex: 1,
      paddingHorizontal: 22,
      paddingTop: 10,
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: 18,
      padding: 16,
      marginBottom: 18,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    selectLabel: {
      fontSize: 14,
      color: '#444',
      marginBottom: 8,
    },
    eventBox: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#c8d3e5',
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    eventTitle: {
      fontWeight: '700',
      fontSize: 16,
      color: '#276baf',
      marginBottom: 2,
    },
    eventSub: {
      fontSize: 12,
      color: '#666',
    },
    fieldLabel: {
      fontSize: 13,
      color: '#555',
      marginTop: 10,
      marginBottom: 4,
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#d4d8e0',
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 8,
      fontSize: 14,
      color: '#222',
      backgroundColor: '#f9fafc',
    },
    hint: {
      fontSize: 11,
      color: '#999',
      marginTop: 2,
    },
    submitWrapper: {
      alignItems: 'flex-end',
      marginTop: 18,
    },
    submitButton: {
      borderRadius: 22,
      paddingHorizontal: 20,
      justifyContent: 'center',
    },
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      Alert.alert('Name required', 'Please enter your full name.');
      return;
    }

    if (!trimmedEmail) {
      Alert.alert('Email required', 'Please enter your email address.');
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert('Invalid email', 'Please enter a valid email (e.g. name@example.com).');
      return;
    }

    if (trimmedPhone && trimmedPhone.length < 8) {
      Alert.alert('Invalid phone', 'Please enter a longer phone number or leave it blank.');
      return;
    }

    Alert.alert(
      'Registration successful',
      `You are registered for ${event?.title || 'the event'}`,
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  };

  if (!event) {
    return (
      <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff' }}>No event data available.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
        <View style={styles.headerBar}>
          <View style={styles.headerTitlePill}>
            <Text style={styles.headerTitleText}>Register</Text>
          </View>
          <IconButton
            icon="cog-outline"
            size={24}
            onPress={() => navigation.navigate('Settings')}
            color="#ffffff"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.selectLabel}>Select an event</Text>
            <TouchableOpacity
              style={styles.eventBox}
              onPress={() => navigation.navigate('Events')}
            >
              <View>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventSub}>Change Event</Text>
              </View>
              <Text style={{ fontSize: 18, color: '#555' }}>▾</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.fieldLabel}>Full name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Bob Jobs"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.hint}>Name is required</Text>

            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="bobs@jobsmail.com"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.hint}>Enter a valid email</Text>

            <Text style={styles.fieldLabel}>Phone</Text>
            <TextInput
              style={styles.textInput}
              placeholder="0412345678"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <Text style={styles.hint}>(optional)</Text>

            <View style={styles.submitWrapper}>
              <Button
                mode="contained"
                icon="send"
                contentStyle={{ height: 44 }}
                style={styles.submitButton}
                onPress={handleRegister}
                labelStyle={{ fontSize: 14 }}
                buttonColor="#3CA6E5"
              >
                Submit Registration
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
