import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Location,
} from 'react-native';

export default function App() {
  const [location, setLocation] = useState(true);
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const await Location.requestPermissionsAsync();
  };
  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const {width: screenWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'brown',
  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 68,
    fontWeight: '500',
  },
  weather: {},
  day: {
    width: screenWidth,
    alignItems: 'center',
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    margin: 30,
    fontSize: 60,
  },
});
