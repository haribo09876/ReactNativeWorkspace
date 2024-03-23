import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

export default function App() {
  const [location, setLocation] = useState(true);
  const [infos, setInfos] = useState([]);
  const [city, setCity] = useState('Loading...');

  // 위치 정보
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  }, []);

  // 위도, 경도
  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        // currentLocation에 위도, 경도 저장
        setLocation({latitude, longitude});
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true, // 배터리를 더 소모하여 보다 정확한 위치 추적
        timeout: 20000,
        maximumAge: 0, // 한 번 찾은 위치 정보를 해당 초만큼 캐싱
        distanceFilter: 1,
      },
    );
    // 컴포넌트 언마운트 시 위치 업데이트 중지
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  // 날씨 정보
  useEffect(() => {
    const weatherApiKey = '174580b1f4ee4ec1e406e56c83717aed';
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${weatherApiKey}`;

    axios
      .get(url, {responseType: 'json'})
      .then(response => {
        const data = response.data;
        setInfos({
          time: data.dt_text,
          temp: Math.round((data.main.temp - 273) * 10) / 10,
          weather: data.weather[0].main,
        });
        setCity(data.city.name);
        // setInfos(jsonData.list[0]);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
        {infos.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{marginTop: 10}}
              size="large"
            />
          </View>
        ) : (
          infos.map((info, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.description}>시간 : {info.time}</Text>
              <Text style={styles.description}>온도 : {info.temp} &#8451;</Text>
              <Text style={styles.description}>날씨 : {info.weather}</Text>
            </View>
          ))
        )}
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
