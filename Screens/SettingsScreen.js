import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Switch, Button } from 'react-native-paper';
import { useTheme } from '../ThemeContext';
import Slider from '@react-native-community/slider';

export default function SettingsScreen() {
  const { isDarkTheme, setIsDarkTheme } = useTheme();
  const styles = StyleSheet.create({

  safeContainer: {
    flex: 1,
    backgroundColor: isDarkTheme ? '#121212' : 'white',
  },
  container: {
    flex: 1, 
    padding: 16, 
    backgroundColor: isDarkTheme ? '#121212' : 'white',
  },
  
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  text: {
    color: isDarkTheme ? '#f3f3f3' : '#222',
  },
});

  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [textSize, setTextSize] = React.useState(16);

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.settingRow}>
          <Text style={styles.text}>Dark Theme</Text>
          <Switch value={isDarkTheme} onValueChange={() => setIsDarkTheme(!isDarkTheme)} />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.text}> Sound</Text>
          <Switch value={soundEnabled} onValueChange={() => setSoundEnabled(!soundEnabled)} />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.text}>Text Size</Text>
          <Slider
            style={{ flex: 1 }}
            minimumValue={12}
            maximumValue={24}
            step={1}
            value={textSize}
            onValueChange={setTextSize}
          />
          <Text style={styles.text}>{textSize}</Text>
        </View>

        <Button mode="contained" onPress={() => alert('Settings saved!')}>
          Save Settings
        </Button>
      </View>
    </SafeAreaView>
  );
}

