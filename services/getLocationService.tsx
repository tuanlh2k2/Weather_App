import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import LocationData from '../model/LocationData';

function GetCurrentLocation() {
  // khởi tạo biến trạng thái vị trí.
  const [location, setLocation] = React.useState<LocationData>();
  // lấy vị trí hiện tại.
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  return location;
}
export default GetCurrentLocation;
