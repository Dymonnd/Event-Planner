import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar, Chip, IconButton } from 'react-native-paper';
import { useTheme } from '../ThemeContext';

const FILTERS = ['Today', 'Fitness', 'Social', 'Outdoors', 'Community', 'Music'];

function getTodayDisplay() {
  const now = new Date();
  const weekDay = now.toLocaleDateString('en-US', { weekday: 'long' });
  const day = now.getDate();
  const month = now.toLocaleDateString('en-US', { month: 'short' });
  return `${weekDay} – ${month} ${day}`;
}

export default function HomeScreen({ navigation }) {
  const { isDarkTheme } = useTheme();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(['Today']);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://tafeshaun.github.io/elevate-data/events.json')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map(ev => ({
          id: ev.id.toString(),
          title: ev.title,
          description: ev.description,
          date: ev.date,
          time: `${ev.startTime}–${ev.endTime}`,
          location: ev.location,
          spots: ev.spotsRemaining,
          tags: ['Today', ev.category],
        }));
        setEvents(mapped);
        setLoading(false);
      })
      .catch(err => {
        console.log('HOME FETCH ERROR', err);
        setLoading(false);
      });
  }, []);

  const sections = [
    {
      title: 'Today',
      data: events.filter(ev =>
        (selected.length === 0 || ev.tags.some(tag => selected.includes(tag))) &&
        (search.length === 0 ||
          ev.title.toLowerCase().includes(search.toLowerCase())),
      ),
    },
  ];

  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: isDarkTheme ? '#141c22' : '#eaf6ff',
    },
    headerBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: isDarkTheme ? '#336488' : '#eaf6ff',
      paddingHorizontal: 18,
      paddingTop: 14,
      paddingBottom: 7,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      marginBottom: 4,
      shadowColor: '#000',
      shadowOpacity: 0.07,
      shadowRadius: 5,
      elevation: 2,
    },
    headerTitle: {
      fontSize: 19,
      fontWeight: 'bold',
      color: isDarkTheme ? '#bfe9ff' : '#276baf',
      letterSpacing: 0.8,
    },
    welcomeCard: {
      backgroundColor: isDarkTheme ? '#22314a' : '#fff',
      borderRadius: 18,
      marginHorizontal: 16,
      marginBottom: 14,
      marginTop: 6,
      padding: 18,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 10,
      elevation: 2,
    },
    welcomeHeading: {
      fontSize: 22,
      fontWeight: 'bold',
      color: isDarkTheme ? '#aee7ff' : '#276baf',
      marginBottom: 4,
    },
    welcomeText: {
      fontSize: 14,
      color: isDarkTheme ? '#dbefff' : '#606060',
      marginBottom: 4,
    },
    welcomeDate: {
      fontSize: 13,
      color: isDarkTheme ? '#dbefff' : '#276baf',
      marginBottom: 7,
    },
    primaryButton: {
      marginTop: 4,
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#276baf',
      alignSelf: 'flex-start',
      backgroundColor: '#ffffff',
    },
    primaryButtonText: {
      color: '#276baf',
      fontWeight: '600',
      fontSize: 14,
    },
    filterBox: {
      backgroundColor: isDarkTheme ? '#1d2a36' : '#fff',
      marginHorizontal: 14,
      borderRadius: 26,
      elevation: 6,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginTop: 0,
      marginBottom: 4,
      shadowColor: isDarkTheme ? '#000' : '#161719',
      shadowOpacity: 0.09,
      shadowRadius: 14,
    },
    search: {
      borderRadius: 16,
      marginBottom: 6,
      backgroundColor: isDarkTheme ? '#223344' : '#f3f5f7',
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      marginBottom: 8,
    },
    chip: {
      marginRight: 10,
      marginBottom: 8,
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 9,
      borderWidth: 2,
      backgroundColor: isDarkTheme ? '#2a3641' : '#ffffff',
      borderColor: isDarkTheme ? '#389eff' : '#276baf',
    },
    chipSelected: {
      backgroundColor: isDarkTheme ? '#278be6' : '#276baf',
      borderColor: isDarkTheme ? '#56cafe' : '#276baf',
    },
    chipLabel: {
      fontSize: 13,
      fontWeight: '700',
      color: isDarkTheme ? '#c5e2ff' : '#276baf',
    },
    chipLabelSelected: {
      color: '#ffffff',
    },
    sectionHeader: {
      fontWeight: 'bold',
      fontSize: 15,
      color: isDarkTheme ? '#aee7ff' : '#22457f',
      marginLeft: 22,
      marginTop: 12,
      marginBottom: 4,
      letterSpacing: 0.45,
    },
    eventCard: {
      backgroundColor: isDarkTheme ? '#202d39' : '#fff',
      borderRadius: 17,
      marginVertical: 8,
      marginHorizontal: 14,
      padding: 16,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 7,
      elevation: 2,
    },
    cardTitle: {
      fontWeight: 'bold',
      fontSize: 17,
      marginBottom: 5,
      color: isDarkTheme ? '#eaf6ff' : '#18212c',
    },
    metaRow: {
      color: isDarkTheme ? '#a7caff' : '#276baf',
      fontSize: 13,
      marginBottom: 8,
    },
    tagBar: { flexDirection: 'row', marginBottom: 6 },
    tag: {
      backgroundColor: isDarkTheme ? '#163047' : '#ecf3ff',
      marginRight: 7,
      height: 28,
      paddingHorizontal: 15,
      borderRadius: 9,
      justifyContent: 'center',
    },
    tagLabel: {
      color: isDarkTheme ? '#b8e6fb' : '#276baf',
      fontSize: 13,
      fontWeight: '700',
    },
    spotText: { color: '#e45757', fontSize: 13, marginTop: 2, marginBottom: 4 },
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Elevate Horizon Connect</Text>
        <IconButton
          icon="cog-outline"
          size={24}
          onPress={() => navigation.navigate('Settings')}
          color={isDarkTheme ? '#bfe9ff' : '#276baf'}
        />
      </View>

      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeHeading}>Welcome</Text>
        <Text style={styles.welcomeText}>
          Find and register for community events.
        </Text>
        <Text style={styles.welcomeDate}>{getTodayDisplay()}</Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Events')}
        >
          <Text style={styles.primaryButtonText}>View Today’s Events</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterBox}>
        <Searchbar
          placeholder="Search Events..."
          value={search}
          onChangeText={setSearch}
          style={[styles.search, { height: 40 }]}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 4 }}
        >
          <View style={styles.chipRow}>
            {FILTERS.map(f => {
              const selectedChip = selected.includes(f);
              return (
                <Chip
                  key={f}
                  style={[styles.chip, selectedChip && styles.chipSelected]}
                  textStyle={[
                    styles.chipLabel,
                    selectedChip && styles.chipLabelSelected,
                  ]}
                  onPress={() =>
                    setSelected(old =>
                      old.includes(f)
                        ? old.filter(tag => tag !== f)
                        : [...old, f],
                    )
                  }
                  mode={selectedChip ? 'flat' : 'outlined'}
                >
                  {f}
                </Chip>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 30 }}>
          Loading events...
        </Text>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EventsTab', {
                  screen: 'Details',
                  params: { event: item },
                })
              }
            >
              <View style={styles.eventCard}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.metaRow}>
                  {item.time} · {item.location}
                </Text>
                <View style={styles.tagBar}>
                  {item.tags.map(tag => (
                    <View key={tag} style={styles.tag}>
                      <Text style={styles.tagLabel}>{tag}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.spotText}>
                  Spots remaining: {item.spots}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}
