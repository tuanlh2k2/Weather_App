/**
 * dùng để lấy chi tiết dự báo thời tiết cho vị trí đã lưu.
 */

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GetCurrentLocation from './getLocationService';
import LocationData from '../model/LocationData';
import CurrentCondition from '../model/CurrentCondition';
import ForecastDay from '../model/ForecastDay';

function GetSavedLocationDetail(
  lat: number | undefined,
  lon: number | undefined,
) {
  // để lưu trữ chi tiết dự báo đã được lấy cho vị trí đã lưu.
  const [detail, setDetails] = useState<ForecastDay>();
  // lấy dữ liệu dự báo cho tọa độ vĩ độ và kinh độ được cung cấp bằng cách sử dụng API OpenWeatherMap.
  const fetchData = async (lat: number, lon: number) => {
    await axios
      .get('https://api.weatherapi.com/v1/forecast.json', {
        params: {
          key: 'a95ac2295269448094c170846231903',
          q: `${lat},${lon}`,
          lang: 'vi',
        },
      })
      .then(response => {
        setDetails({
          maxTemp_c: response.data.forecast.forecastday[0].day.maxtemp_c,
          minTemp_c: response.data.forecast.forecastday[0].day.mintemp_c,

          date: '',
          avgTemp_c: response.data.current.temp_c,

          condition_code: 0,
          name: response.data.location.name,
          region: response.data.location.country,
          condition_text: response.data.current.condition.text,
          icon_link: response.data.current.condition.icon,
        });
      })

      .catch(error => {
        console.error('Network error:', error);
      });
  };
  // Kích hoạt lấy dữ liệu dự báo khi thay đổi vị trí.
  useEffect(() => {
    lat != undefined && lon != undefined ? fetchData(lat, lon) : null;
  }, [lat, lon]);

  return detail;
}
export default GetSavedLocationDetail;
