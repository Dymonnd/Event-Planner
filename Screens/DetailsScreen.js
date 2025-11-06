import * as React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Card, Chip } from 'react-native-paper';

export default function DetailsScreen({ route }) {
  const { event } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={event.title} />
        <Card.Content>
          <Text style={styles.label}>Date:</Text>
          <Text>{event.date}</Text>

          <Text style={styles.label}>Location:</Text>
          <Text>{event.location}</Text>

          <Text style={styles.label}>Description:</Text>
          <Text>{event.description || 'No description provided.'}</Text>

          <Text style={styles.label}>Tags:</Text>
          <View style={styles.chipContainer}>
            {(event.tags || ['Community']).map((tag) => (
              <Chip key={tag} style={styles.chip}>
                {tag}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'white' },
  card: { marginBottom: 16 },
  label: { fontWeight: 'bold', marginTop: 12 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  chip: { marginRight: 8, marginBottom: 8 },
});
