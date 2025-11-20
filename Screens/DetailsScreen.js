import * as React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../ThemeContext';

export default function DetailsScreen({ route, navigation }) {
  const event = route?.params?.event;
  const { isDarkTheme } = useTheme();

  if (!event) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: isDarkTheme ? '#121c23' : '#eaf6fa' }]}>
        <Text style={{ color: isDarkTheme ? '#deeafe' : '#222' }}>No event data found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkTheme ? '#121c23' : '#eaf6fa' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={[styles.backText, { color: isDarkTheme ? '#8ec6ff' : '#276baf' }]}>&lt; Back</Text>
        </TouchableOpacity>

        <View style={[
          styles.card,
          { backgroundColor: isDarkTheme ? '#192637' : 'white' }
        ]}>
          <Text style={[
            styles.title,
            { color: isDarkTheme ? '#aee7ff' : '#276baf' }
          ]}>{event.title}</Text>
          <Text style={[
            styles.description,
            { color: isDarkTheme ? '#aac8ef' : '#555' }
          ]}>
            {event.description || 'Description will appear here.'}
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <Text style={[styles.detailsText, { color: isDarkTheme ? '#cbeaff' : '#222' }]}>
            {event.date || ''}
          </Text>
          <Text style={[styles.detailsText, { color: isDarkTheme ? '#cbeaff' : '#222' }]}>
            @ {event.location}
          </Text>
        </View>

        <View style={styles.tagsRow}>
          {(event.tags || ['Fitness']).map((tag) => (
            <Text
              key={tag}
              style={[
                styles.tag,
                {
                  backgroundColor: isDarkTheme ? '#214269' : '#bde0fe',
                  color: isDarkTheme ? '#78cafe' : '#276baf'
                }
              ]}
            >
              {tag}
            </Text>
          ))}
        </View>

        <View style={[
          styles.card,
          { backgroundColor: isDarkTheme ? '#192637' : 'white' }
        ]}>
          <Text style={[
            styles.subheading,
            { color: isDarkTheme ? '#66a6ed' : '#276baf' }
          ]}>Share This Event</Text>
          <View style={styles.shareRow}>
            <Text style={styles.socialIcon}>🔗</Text>
            <Text style={styles.socialIcon}>📧</Text>
            <Text style={styles.socialIcon}>🐦</Text>
            <Text style={styles.socialIcon}>📱</Text>
          </View>
          <Button
            title="Register"
            color={isDarkTheme ? "#2aabf7" : "#276baf"}
            onPress={() => navigation.navigate('RegisterEvent', { event })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16 },
  backButton: { marginBottom: 8, alignSelf: 'flex-start' },
  backText: { fontWeight: 'bold', fontSize: 16 },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: { fontWeight: 'bold', fontSize: 20, marginBottom: 8 },
  description: { marginBottom: 8 },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  detailsText: { fontSize: 15 },
  tagsRow: { flexDirection: 'row', marginBottom: 16 },
  tag: {
    backgroundColor: '#bde0fe',
    color: '#276baf',
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginRight: 8,
    borderRadius: 12,
    fontSize: 13,
  },
  subheading: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  shareRow: { flexDirection: 'row', marginBottom: 12 },
  socialIcon: { fontSize: 22, marginRight: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
