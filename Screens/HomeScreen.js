import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// Mainbody component for HomeScreen
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>  
      <Text style={styles.title}>Welcome to the Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { user: 'Guest' })}
      />
    </View>
  );
}

// Main Styles ref
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
});
