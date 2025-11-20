import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar, Chip, IconButton } from 'react-native-paper';
import { useTheme } from '../ThemeContext';

const FILTERS = ['Today', 'Fitness', 'Social', 'Outdoors', 'Family', 'Music'];

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
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => {
        const mapped = data.slice(0, 5).map((item, i) => ({
          id: item.id.toString(),
          title: item.title[0].toUpperCase() + item.title.slice(1),
          time: i % 3 === 0 ? '08:30–09:15' : '11:30–13:00',
          location: i % 2 === 0 ? 'Community Hall' : 'Online',
          spots: Math.floor(Math.random() * 10) + 1,
          tags: i % 2 === 0 ? ['Today', 'Fitness'] : ['Today', 'Social']
        }));
        setEvents(mapped);
        setLoading(false);
      });
  }, []);

  const sections = [
    {
      title: `Today — ${getTodayDisplay()}`,
      data: events.filter(ev =>
        (selected.length === 0 || ev.tags.some(tag => selected.includes(tag))) &&
        (search.length === 0 || ev.title.toLowerCase().includes(search.toLowerCase()))
      )
    }
  ];

  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: isDarkTheme ? '#141c22' : '#eaf6ff'
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
      color: isDarkTheme ? "#bfe9ff" : "#276baf",
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
      color: isDarkTheme ? "#aee7ff" : "#276baf",
      marginBottom: 4,
    },
    welcomeText: {
      fontSize: 14,
      color: isDarkTheme ? "#dbefff" : "#606060",
      marginBottom: 7,
    },
    filterBox: {
      backgroundColor: isDarkTheme ? '#1d2a36' : '#fff',
      marginHorizontal: 14,
      borderRadius: 26,
      elevation: 6,
      paddingVertical: 18,
      paddingHorizontal: 16,
      marginTop: 0,
      marginBottom: 8,
      shadowColor: isDarkTheme ? '#000' : "#161719",
      shadowOpacity: 0.09,
      shadowRadius: 14
    },
    search: {
      borderRadius: 16,
      marginBottom: 11,
      backgroundColor: isDarkTheme ? '#223344' : '#f3f5f7'
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 5,
    },
    chip: {
      marginRight: 10,
      marginBottom: 10,
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 17,
      borderWidth: 2,
      borderColor: isDarkTheme ? '#2ca5f7' : "#276baf",
      backgroundColor: isDarkTheme ? '#223344' : "#fff"
    },
    chipSelected: {
      backgroundColor: isDarkTheme ? '#278be6' : "#276baf",
      borderColor: isDarkTheme ? '#2ca5f7' : "#276baf"
    },
    chipLabel: {
      fontSize: 16,
      fontWeight: "700",
      color: isDarkTheme ? '#93cdf0' : "#276baf"
    },
    chipLabelSelected: {
      color: '#fff'
    },
    sectionHeader: {
      fontWeight: 'bold',
      fontSize: 15,
      color: isDarkTheme ? '#aee7ff' : '#22457f',
      marginLeft: 22,
      marginTop: 18,
      marginBottom: 7,
      letterSpacing: 0.45
    },
    eventCard: {
      backgroundColor: isDarkTheme ? '#202d39' : "#fff",
      borderRadius: 17,
      marginVertical: 8,
      marginHorizontal: 14,
      padding: 16,
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowRadius: 7,
      elevation: 2,
      position: 'relative'
    },
    cardTitle: { fontWeight: "bold", fontSize: 17, marginBottom: 5, color: isDarkTheme ? "#eaf6ff" : "#18212c" },
    metaRow: { color: isDarkTheme ? "#a7caff" : "#276baf", fontSize: 13, marginBottom: 8 },
    tagBar: { flexDirection: "row", marginBottom: 6 },
    tag: {
      backgroundColor: isDarkTheme ? '#163047' : '#ecf3ff',
      marginRight: 7,
      height: 28,
      paddingHorizontal: 15,
      borderRadius: 9,
      justifyContent: 'center'
    },
    tagLabel: {
      color: isDarkTheme ? "#b8e6fb" : "#276baf",
      fontSize: 13,
      fontWeight: "700"
    },
    spotText: { color: "#e45757", fontSize: 13, marginTop: 2, marginBottom: 4 },
    shareIcon: {
      position: 'absolute',
      top: 13,
      right: 13,
      color: isDarkTheme ? "#b8e6fb" : "#276baf"
    }
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {/* App header bar */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Elevate Horizon Connect</Text>
        <IconButton
          icon="cog-outline"
          size={26}
          onPress={() => navigation.navigate('Settings')}
          color={isDarkTheme ? '#aee' : '#276baf'}
        />
      </View>

      {/* Welcome Card */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeHeading}>Welcome</Text>
        <Text style={styles.welcomeText}>
          Find and register for Community Events
        </Text>
      </View>

      {/* Filter/Search Card */}
      <View style={styles.filterBox}>
        <Searchbar
          placeholder="Search Events"
          value={search}
          onChangeText={setSearch}
          style={styles.search}
          inputStyle={{ fontSize: 16, color: isDarkTheme ? "#eaf6ff" : "#222" }}
          iconColor={isDarkTheme ? "#82c3ff" : "#5577cc"}
          placeholderTextColor={isDarkTheme ? "#8aacc8" : "#aaa"}
        />
        <View style={styles.chipRow}>
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
        </View>
      </View>

      {/* Events List */}
      {loading ? (
        <Text style={{
          textAlign: 'center',
          marginTop: 40,
          color: isDarkTheme ? '#c8e8ff' : '#276baf'
        }}>
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
            <TouchableOpacity onPress={() => navigation.navigate('Details', { event: item })}>
              <View style={styles.eventCard}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.metaRow}>
                  {item.time} · {item.location}
                </Text>
                <View style={styles.tagBar}>
                  {item.tags.map(tag => (
                    <View style={styles.tag} key={tag}>
                      <Text style={styles.tagLabel}>{tag}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.spotText}>
                  Spots remaining: {item.spots}
                </Text>
                <IconButton icon="share-variant" size={22} style={styles.shareIcon} color={isDarkTheme ? "#b8e6fb" : "#276baf"} />
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={
            <Text style={{
              color: isDarkTheme ? "#88bfff" : "#888",
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
