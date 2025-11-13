import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, List } from 'react-native-paper';
import { useTheme } from '../ThemeContext';

const mockEvents = [
  { id: '1', title: 'Family Fun Day', date: '2025-11-12', location: 'Main Park' },
  { id: '2', title: 'Community Clean Up', date: '2025-11-15', location: 'West Field' }
];

export default function HomeScreen({ navigation }) {
  const { isDarkTheme } = useTheme();
  const styles = StyleSheet.create({
    safeContainer: { flex: 1, backgroundColor: isDarkTheme ? '#121212' : 'white' },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
      backgroundColor: isDarkTheme ? '#1e1e1e' : '#b3ddf6',
      borderRadius: 6,
      marginBottom: 16
    },
    logoText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkTheme ? '#eee' : '#276baf'
    },
    title: { fontSize: 24, fontWeight: '600', marginBottom: 12, marginTop: 16, color: isDarkTheme ? '#eee' : '#222' }
  });

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
      {/* Header top bar */}
      <View style={styles.topBar}>
        <Text style={styles.logoText}>Elevate Horizon Connect</Text>
        <IconButton
          icon="cog-outline"
          size={28}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>

      {/* Welcome Title */}
      <Text style={styles.title}>Welcome to the Home Screen</Text>

      {/* Event List */}
        <FlatList
          data={mockEvents}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <List.Item
              title={() => (
                <Text style={{ color: isDarkTheme ? '#fff' : '#222', fontWeight: 'bold', fontSize: 16 }}>
                  {item.title}
                </Text>
              )}
              description={() => (
                <Text style={{ color: isDarkTheme ? '#eee' : '#444' }}>
                  {item.date} @ {item.location}
                </Text>
              )}
              onPress={() => navigation.navigate('Details', { event: item })}
              left={props => <List.Icon {...props} icon="calendar" />}
            />
          )}
        />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: 'white' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: '#b3ddf6',
    borderRadius: 6,
    marginBottom: 16
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#276baf'
  },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 12, marginTop: 16 }
});
