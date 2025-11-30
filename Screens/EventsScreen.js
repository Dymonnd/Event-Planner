import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar, Chip, Button, IconButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../ThemeContext';

const FILTERS = ['Today', 'Fitness', 'Social', 'Outdoors', 'Community', 'Music'];

function formatDateLabel(date) {
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day}/${('0' + (date.getMonth() + 1)).slice(-2)}/${year}`;
}

function getTodayDisplay() {
  const now = new Date();
  const weekDay = now.toLocaleDateString('en-US', { weekday: 'long' });
  const day = now.getDate();
  const month = now.toLocaleDateString('en-US', { month: 'short' });
  return `${weekDay} – ${month} ${day}`;
}

export default function EventsScreen({ navigation }) {
  const { isDarkTheme } = useTheme();
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(['Today']);
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError('');
      try {
        const res = await fetch('https://tafeshaun.github.io/elevate-data/events.json');
        const data = await res.json();

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

        setSections([
          {
            title: '',
            data: mapped,
          },
        ]);
      } catch (err) {
        console.log('EVENTS FETCH ERROR', err);
        setError('Failed to fetch events.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredSections = sections
    .map(section => ({
      ...section,
      data: section.data.filter(ev =>
        (selected.length === 0 || ev.tags.some(tag => selected.includes(tag))) &&
        (query.length === 0 || ev.title.toLowerCase().includes(query.toLowerCase()))
      ),
    }))
    .filter(section => section.data.length > 0);

  const hasResults = filteredSections.some(section => section.data.length > 0);

  useEffect(() => {
    if (!isLoading && !error && query.length > 0 && !hasResults) {
      navigation.navigate('EventNotFound');
    }
  }, [isLoading, error, query, hasResults, navigation]);

  useFocusEffect(
    useCallback(() => {
      setSelected(['Today']);
      setSearch('');
      setQuery('');
      setSelectedDate(new Date());
    }, []),
  );

  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: '#2d75a8',
    },
    headerBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 18,
      paddingTop: 18,
      paddingBottom: 10,
    },
    titleWrapper: {
      flex: 1,
      alignItems: 'center',
    },
    titlePill: {
      paddingHorizontal: 24,
      paddingVertical: 6,
      borderRadius: 6,
      backgroundColor: '#52a9e8',
    },
    titleText: {
      fontSize: 20,
      letterSpacing: 1,
      color: '#ffffff',
      fontWeight: '700',
    },
    headerDate: {
      marginTop: 4,
      fontSize: 13,
      color: '#e0f3ff',
    },
    filterBox: {
      backgroundColor: isDarkTheme ? '#1d2a36' : '#ffffff',
      marginHorizontal: 14,
      borderRadius: 18,
      elevation: 2,
      padding: 20,
      marginTop: 10,
      marginBottom: 7,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 12,
    },
    search: {
      borderRadius: 14,
      marginBottom: 10,
      backgroundColor: isDarkTheme ? '#223344' : '#f7fbff',
    },
    chipRow: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    chip: {
      marginRight: 10,
      marginBottom: 8,
      paddingVertical: 8,
      paddingHorizontal: 18,
      minHeight: 39,
      borderRadius: 15,
      borderWidth: 2,
      backgroundColor: isDarkTheme ? '#2a3641' : '#ffffff',
      borderColor: isDarkTheme ? '#389eff' : '#276baf',
    },
    chipSelected: {
      backgroundColor: isDarkTheme ? '#278be6' : '#276baf',
      borderColor: isDarkTheme ? '#56cafe' : '#276baf',
    },
    chipLabel: {
      fontSize: 15,
      fontWeight: '600',
      color: isDarkTheme ? '#c5e2ff' : '#276baf',
    },
    chipLabelSelected: {
      color: '#ffffff',
    },
    dateRow: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dateButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: isDarkTheme ? '#65aaff' : '#276baf',
      backgroundColor: isDarkTheme ? '#223344' : '#f3f7ff',
    },
    dateButtonText: {
      fontSize: 13,
      color: isDarkTheme ? '#cfe8ff' : '#276baf',
      fontWeight: '600',
    },
    sectionHeader: {
      fontWeight: 'bold',
      fontSize: 15,
      color: isDarkTheme ? '#99d0ff' : '#ffffff',
      backgroundColor: 'transparent',
      marginLeft: 16,
      marginTop: 12,
      marginBottom: 4,
      letterSpacing: 0.4,
    },
    eventCard: {
      backgroundColor: isDarkTheme ? '#1c2837' : '#ffffff',
      borderRadius: 15,
      marginVertical: 5,
      marginHorizontal: 12,
      padding: 13,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 7,
      elevation: 1,
      flexDirection: 'column',
    },
    cardTitle: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 4,
      color: isDarkTheme ? '#d7f4ff' : '#1c2126',
    },
    metaRow: {
      color: isDarkTheme ? '#6eb7d9' : '#276baf',
      fontSize: 13,
      marginBottom: 6,
    },
    tagBar: { flexDirection: 'row', marginBottom: 5 },
    spotText: {
      color: '#e45757',
      fontSize: 13,
      marginBottom: 3,
      marginTop: 2,
    },
    registerBtn: {
      alignSelf: 'flex-end',
      marginTop: 3,
      borderRadius: 13,
      paddingHorizontal: 8,
      backgroundColor: isDarkTheme ? '#389eff' : '#276baf',
    },
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.headerBar}>
        <View style={{ width: 32 }} />
        <View style={styles.titleWrapper}>
          <View style={styles.titlePill}>
            <Text style={styles.titleText}>Events</Text>
          </View>
          <Text style={styles.headerDate}>{getTodayDisplay()}</Text>
        </View>
        <IconButton
          icon="cog-outline"
          size={26}
          onPress={() => navigation.navigate('Settings')}
          color="#ffffff"
        />
      </View>

      <View style={styles.filterBox}>
        <Searchbar
          placeholder="Search events…"
          value={search}
          onChangeText={setSearch}
          onIconPress={() => setQuery(search)}
          onSubmitEditing={() => setQuery(search)}
          style={styles.search}
          inputStyle={{
            fontSize: 16,
            color: isDarkTheme ? '#cfe8ff' : '#1c2126',
          }}
          iconColor={isDarkTheme ? '#65aaff' : '#276baf'}
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
                  selectedChip && styles.chipSelected,
                ]}
                textStyle={[
                  styles.chipLabel,
                  selectedChip && styles.chipLabelSelected,
                ]}
                onPress={() => {
                  setSelected(old =>
                    old.includes(f)
                      ? old.filter(tag => tag !== f)
                      : [...old, f],
                  );
                }}
                mode={selectedChip ? 'flat' : 'outlined'}
              >
                {f}
              </Chip>
            );
          })}
        </ScrollView>

        <View style={styles.dateRow}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              Pick date  {formatDateLabel(selectedDate)}
            </Text>
          </TouchableOpacity>

          <Button
            mode="outlined"
            compact
            onPress={() => {
              setSelected(['Today']);
              setSearch('');
              setQuery('');
              setSelectedDate(new Date());
            }}
          >
            Clear filters
          </Button>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) {
                setSelectedDate(date);
              }
            }}
          />
        )}
      </View>

      {isLoading ? (
        <Text style={{ textAlign: 'center', marginTop: 40, color: '#ffffff' }}>
          Loading events...
        </Text>
      ) : error ? (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>
          {error}
        </Text>
      ) : (
        <SectionList
          sections={filteredSections}
          keyExtractor={item => item.id}
          renderSectionHeader={({ section: { title } }) =>
            title ? <Text style={styles.sectionHeader}>{title}</Text> : null
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', { event: item })}
            >
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
                        borderRadius: 9,
                      }}
                      textStyle={{
                        color: isDarkTheme ? '#73c9fc' : '#276baf',
                        fontSize: 13,
                        fontWeight: '700',
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
                    fontSize: 15,
                  }}
                  onPress={() =>
                    navigation.navigate('RegisterEvent', { event: item })
                  }
                >
                  Register
                </Button>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={
            <Text
              style={{
                color: '#ffffff',
                textAlign: 'center',
                marginTop: 40,
              }}
            >
              No events found.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
