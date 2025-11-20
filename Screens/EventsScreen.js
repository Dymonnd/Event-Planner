import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar, Chip, Button, IconButton } from 'react-native-paper';
import { useTheme } from '../ThemeContext';

const FILTERS = [
  'Today', 'Fitness', 'Social', 'Outdoors', 'Family', 'Music'
];

export default function EventsScreen({ navigation }) {
  const { isDarkTheme } = useTheme();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(['Today']);
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true); setError('');
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        const withTags = data.slice(0, 10).map((item, idx) => ({
          id: item.id.toString(),
          title: item.title,
          time: idx % 2 === 0 ? "09:00–10:00" : "13:00–14:00",
          location: idx % 2 === 0 ? "Community Hall" : "Online",
          spots: Math.floor(Math.random() * 10) + 1,
          tags: idx % 2 === 0 ? ['Today', 'Fitness'] : ['Tomorrow', 'Social'],
        }));
        setSections([
          {
            title: 'Today – 20 Nov',
            data: withTags.filter(ev => ev.tags.includes('Today'))
          },
          {
            title: 'Tomorrow – 21 Nov',
            data: withTags.filter(ev => ev.tags.includes('Tomorrow'))
          }
        ]);
      } catch (err) {
        setError('Failed to fetch events.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filtering based on search text and active chips
  const filteredSections = sections.map(section => ({
    ...section,
    data: section.data.filter(ev =>
      (selected.length === 0 || ev.tags.some(tag => selected.includes(tag))) &&
      (search.length === 0 || ev.title.toLowerCase().includes(search.toLowerCase()))
    )
  })).filter(section => section.data.length > 0);

  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: isDarkTheme ? '#141c22' : '#e9f5ff',
    },
    headerBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: isDarkTheme ? '#1a2732' : '#b3ddf6',
      paddingHorizontal: 14,
      paddingTop: 15,
      paddingBottom: 7,
    },
    title: {
      fontSize: 22,
      fontWeight: '800',
      color: isDarkTheme ? '#cde6fa' : '#276baf',
    },
    filterBox: {
      backgroundColor: isDarkTheme ? '#1d2a36' : '#fff',
      marginHorizontal: 14,
      borderRadius: 18,
      elevation: 2,
      padding: 20,
      marginTop: 18,
      marginBottom: 7,
      shadowColor: isDarkTheme ? '#000' : "#000",
      shadowOpacity: 0.08,
      shadowRadius: 12,
    },
    search: {
      borderRadius: 14,
      marginBottom: 10,
      backgroundColor: isDarkTheme ? '#223344' : '#f7fbff'
    },
    chipRow: {
      flexDirection: 'row',
      marginBottom: 8
    },
    chip: {
      marginRight: 10,
      marginBottom: 8,
      paddingVertical: 8,
      paddingHorizontal: 18,
      minHeight: 39,
      borderRadius: 15,
      borderWidth: 2,
      backgroundColor: isDarkTheme ? '#2a3641' : '#fff',
      borderColor: isDarkTheme ? '#389eff' : '#276baf',
    },
    chipSelected: {
      backgroundColor: isDarkTheme ? '#278be6' : '#276baf',
      borderColor: isDarkTheme ? '#56cafe' : '#276baf'
    },
    chipLabel: {
      fontSize: 15,
      fontWeight: '600',
      color: isDarkTheme ? '#c5e2ff' : '#276baf'
    },
    chipLabelSelected: {
      color: '#fff'
    },
    sectionHeader: {
      fontWeight: 'bold',
      fontSize: 15,
      color: isDarkTheme ? '#99d0ff' : '#164178',
      backgroundColor: 'transparent',
      marginLeft: 16,
      marginTop: 20,
      marginBottom: 7,
      letterSpacing: 0.4
    },
    eventCard: {
      backgroundColor: isDarkTheme ? "#1c2837" : "#fff",
      borderRadius: 15,
      marginVertical: 5,
      marginHorizontal: 12,
      padding: 13,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 7,
      elevation: 1,
      flexDirection: "column"
    },
    cardTitle: {
      fontWeight: "bold",
      fontSize: 16,
      marginBottom: 4,
      color: isDarkTheme ? "#d7f4ff" : "#1c2126"
    },
    metaRow: {
      color: isDarkTheme ? "#6eb7d9" : "#276baf",
      fontSize: 13,
      marginBottom: 6
    },
    tagBar: { flexDirection: "row", marginBottom: 5 },
    spotText: {
      color: "#e45757",
      fontSize: 13,
      marginBottom: 3,
      marginTop: 2
    },
    registerBtn: {
      alignSelf: 'flex-end',
      marginTop: 3,
      borderRadius: 13,
      paddingHorizontal: 8,
      backgroundColor: isDarkTheme ? '#389eff' : '#276baf'
    }
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.headerBar}>
        <Text style={styles.title}>Events</Text>
        <IconButton
          icon="cog-outline"
          size={28}
          onPress={() => navigation.navigate('Settings')}
          color={isDarkTheme ? '#aee' : '#276baf'}
        />
      </View>
      <View style={styles.filterBox}>
        <Searchbar
          placeholder="Search events…"
          value={search}
          onChangeText={setSearch}
          style={styles.search}
          inputStyle={{
            fontSize: 16,
            color: isDarkTheme ? "#cfe8ff" : "#1c2126"
          }}
          iconColor={isDarkTheme ? "#65aaff" : "#276baf"}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipRow}
        >
          {FILTERS.map(f => {
            const selectedChip = selected.includes(f);
            return (
              <Chip
                key={f}
                style={[
                  styles.chip,
                  selectedChip && styles.chipSelected
                ]}
                textStyle={[
                  styles.chipLabel,
                  selectedChip && styles.chipLabelSelected
                ]}
                onPress={() => {
                  setSelected(old =>
                    old.includes(f)
                      ? old.filter(tag => tag !== f)
                      : [...old, f]
                  );
                }}
                mode={selectedChip ? "flat" : "outlined"}
              >
                {f}
              </Chip>
            );
          })}
        </ScrollView>
      </View>
      {isLoading ? (
        <Text style={{ textAlign: 'center', marginTop: 40, color: isDarkTheme ? '#fff' : '#222' }}>
          Loading events...
        </Text>
      ) : error ? (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>{error}</Text>
      ) : (
        <SectionList
          sections={filteredSections}
          keyExtractor={item => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.metaRow}>
                {item.time} · {item.location}
              </Text>
              <View style={styles.tagBar}>
                {item.tags.map(tag => (
                  <Chip
                    key={tag}
                    style={{
                      backgroundColor: isDarkTheme ? '#25364c' : '#ecf3ff',
                      marginRight: 7,
                      height: 28,
                      borderRadius: 9
                    }}
                    textStyle={{
                      color: isDarkTheme ? "#73c9fc" : "#276baf",
                      fontSize: 13,
                      fontWeight: "700",
                    }}
                    compact
                  >
                    {tag}
                  </Chip>
                ))}
              </View>
              <Text style={styles.spotText}>
                Spots remaining: {item.spots}
              </Text>
              <Button
                mode="contained"
                compact
                style={styles.registerBtn}
                labelStyle={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 15
                }}
                onPress={() => navigation.navigate('RegisterEvent', { event: item })}
              >
                Register
              </Button>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={
            <Text style={{
              color: isDarkTheme ? '#ccc' : '#444',
              textAlign: 'center',
              marginTop: 40
            }}>
              No events found.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
