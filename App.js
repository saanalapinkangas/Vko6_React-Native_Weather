import { useFonts } from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import Position from './components/Position';

export default function App() {
  const [loaded] = useFonts({
    PlayfairDisplayRegular: require('./assets/PlayfairDisplay.ttf'),
    PlayfairDisplayItalic: require('./assets/PlayfairDisplay-Italic.ttf'),
  })
  if (!loaded) {
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Current weather</Text>
      <Position />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A0BBA9',
    alignItems: 'center',
    paddingTop: 180,
  },
  headline: {
    fontFamily: 'PlayfairDisplayRegular',
    fontSize: 32,
    fontWeight: '800',
    color: '#403d39',
    marginBottom: 60,
  }
});
