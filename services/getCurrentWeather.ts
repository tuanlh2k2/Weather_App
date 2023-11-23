/**
 * để lấy và hiển thị dữ liệu thời tiết hiện tại cho một vị trí được chỉ định.
 */

import React, {useEffect} from 'react';
import axios from 'axios';
import GetCurrentLocation from './getLocationService';
import LocationData from '../model/LocationData';
import CurrentCondition from '../model/CurrentCondition';

// nhận hai tham số tùy chọn: lat (vĩ độ) và lon (kinh độ).
function GetCurrentWeather(lat: number | undefined, lon: number | undefined) {
  // lấy dữ liệu của thời tiết hiện tại.
  const [currentCondition, setCurrentCondition] =
    React.useState<CurrentCondition>();
  // cập nhật những thay đổi khi có thay đổi vể mặt vị trí.
  useEffect(() => {
    lat != undefined && lon != undefined ? fetchData(lat, lon) : null;
  }, [lat, lon]);
  // lấy dữ liệu thời tiết từ API OpenWeatherMap bằng cách dùng tọa độ vĩ độ và kinh độ được cung cấp.
  const fetchData = async (lat: number, lon: number) => {
    await axios
      .get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: 'a95ac2295269448094c170846231903',
          q: `${lat},${lon}`,
          lang: 'vi',
          aqi: 'yes',
        },
      })
      .then(response => {
        setCurrentCondition({
          condition_text: response.data.current.condition.text,
          temp_c: Math.round(parseInt(response.data.current.temp_c)),
          name: response.data.location.name,
          time: response.data.location.localtime,
          condition_code: response.data.current.condition.code,
          is_day: response.data.current.is_day,
          aqi: response.data.current.is_day, //.gb_defra_index,
          uv_index: response.data.current.uv,
          wind_kph: response.data.current.wind_kph,
          wind_degree: response.data.current.wind_degree,
          rainfall: response.data.current.precip_mm,
          feelslike_c: response.data.current.feelslike_c,
          humidity: response.data.current.humidity,
          visibility: response.data.current.vis_km,
          condition_icon: response.data.current.condition.icon,
        });
      })
      .catch(error => {
        console.error('Network error:', error);
      });
  };
  // Dữ liệu đã lấy được lưu trữ trong biến trạng thái currentCondition và được trả về bởi thành phần.
  return currentCondition;
}
export default GetCurrentWeather;
