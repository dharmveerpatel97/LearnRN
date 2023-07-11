import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const MapGoogle = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        setSelectedLocation({latitude, longitude});
        handleMapPress(latitude, longitude)
      },
      error => console.log('Error', error.message),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handleMapPress1 = event => {
    if (currentLocation) {
      const {latitude, longitude} = event.nativeEvent.coordinate;
      console.log(
        ' event.nativeEvent.coordinate',
        event.nativeEvent.coordinate,
      );
      setSelectedLocation({
        latitude,
        longitude,
        address: 'Location Address',
      });
    }
  };

  const handleMapPress = (latitude, longitude) => {
    if (currentLocation) {
      console.log('click lat long', latitude, longitude);
      setSelectedLocation({
        latitude,
        longitude,
        address: 'Location Address',
      });
      let apiKey = 'AIzaSyBotPpDZ2bY5k05gul0jSmY5MLgRbyeQI8';
      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then(response => response.json())
        .then(resp => {
          console.log('click lat', latitude);
          console.log('click long', longitude);
          console.log('resp', resp);
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {currentLocation && (
          <>
            <Text style={styles.text}>
              Latitude: {currentLocation.latitude}
            </Text>
            <Text style={styles.text}>
              Longitude: {currentLocation.longitude}
            </Text>
          </>
        )}

        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={selectedLocation ? selectedLocation.address : ''}
            editable={false}
          />
          <TouchableOpacity
            style={styles.openMapButton}
            onPress={handleMapPress}
            disabled={!currentLocation}>
            <Text style={styles.openMapButtonText}>Map</Text>
          </TouchableOpacity>
        </View>

        {currentLocation && (
          <MapView
            style={styles.mapStyle}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={(e)=>handleMapPress(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude)}>
            {selectedLocation && (
              <Marker
                coordinate={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                }}
                title={'Selected Location'}
                description={selectedLocation.address}
              />
            )}
          </MapView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MapGoogle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapStyle: {
    flex: 1,
    width: '100%',
    height: '80%',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  openMapButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    opacity: 0.8,
  },
  openMapButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
