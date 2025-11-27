import * as React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../ThemeContext';
import { Button as PaperButton, IconButton } from 'react-native-paper';
import { Share } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  const event = route?.params?.event;
  const { isDarkTheme } = useTheme();

  const handleShare = async () => {
    if (!event) return;
    try {
      await Share.share({
        message: `${event.title} – ${event.time || ''} @ ${event.location}`,
      });
    } catch (e) {
      // optional: handle error
    }
  };

  if (!event) {
    return (
      <SafeAreaView
        style={[styles.center, { backgroundColor: isDarkTheme ? '#121c23' : '#eaf6fa' }]}
      >
        <Text style={{ color: isDarkTheme ? '#deeafe' : '#222' }}>
          No event data found.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDarkTheme ? '#121c23' : '#eaf6fa' }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text
          style={[
            styles.backText,
            {
              color: isDarkTheme ? '#8ec6ff' : '#276baf',
              marginBottom: 8,
            },
          ]}
          onPress={() => navigation.goBack()}
        >
          &lt; Back
        </Text>

        <View
          style={[
            styles.card,
            { backgroundColor: isDarkTheme ? '#192637' : 'white' },
          ]}
        >
          <Text
            style={[
              styles.title,
              { color: isDarkTheme ? '#aee7ff' : '#276baf' },
            ]}
          >
            {event.title}
          </Text>
          <Text
            style={[
              styles.description,
              { color: isDarkTheme ? '#aac8ef' : '#555' },
            ]}
          >
            {event.description || 'Description will appear here.'}
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <Text
            style={[
              styles.detailsText,
              { color: isDarkTheme ? '#cbeaff' : '#222' },
            ]}
          >
            {event.date || ''}
          </Text>
          <Text
            style={[
              styles.detailsText,
              { color: isDarkTheme ? '#cbeaff' : '#222' },
            ]}
          >
            @ {event.location}
          </Text>
        </View>

        <View style={styles.tagsRow}>
          {(event.tags || ['Fitness']).map(tag => (
            <Text
              key={tag}
              style={[
                styles.tag,
                {
                  backgroundColor: isDarkTheme ? '#214269' : '#bde0fe',
                  color: isDarkTheme ? '#78cafe' : '#276baf',
                },
              ]}
            >
              {tag}
            </Text>
          ))}
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: isDarkTheme ? '#192637' : 'white' },
          ]}
        >
          <Text
            style={[
              styles.subheading,
              { color: isDarkTheme ? '#66a6ed' : '#276baf' },
            ]}
          >
            Share This Event
          </Text>

          <View style={styles.shareRow}>
            <IconButton icon="share-variant" size={24} onPress={handleShare} />
            <IconButton icon="email-outline" size={24} onPress={handleShare} />
            <IconButton icon="twitter" size={24} onPress={handleShare} />
            <IconButton icon="cellphone" size={24} onPress={handleShare} />
          </View>

          <PaperButton
            mode="contained"
            icon="clipboard-check-outline"
            onPress={() => navigation.navigate('RegisterEvent', { event })}
            buttonColor={isDarkTheme ? '#2aabf7' : '#276baf'}
            contentStyle={{ height: 44 }}
            style={{ borderRadius: 22, alignSelf: 'flex-end', marginTop: 4 }}
            labelStyle={{ fontSize: 14 }}
          >
            Register
          </PaperButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16 },
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
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailsText: { fontSize: 15 },
  tagsRow: { flexDirection: 'row', marginBottom: 16 },
  tag: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginRight: 8,
    borderRadius: 12,
    fontSize: 13,
  },
  subheading: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  shareRow: { flexDirection: 'row', marginBottom: 12 },
  backText: { fontWeight: 'bold', fontSize: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
