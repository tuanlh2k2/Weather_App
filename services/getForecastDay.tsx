import React, {useEffect} from 'react';
import axios from 'axios';

import ForecastDay from '../model/ForecastDay';
import HourlyWeather from '../model/HourlyWeather';

function GetForecastDay(lat: number | undefined, lon: number | undefined) {
  const forecastDayArr: ForecastDay[] = [];
  const [forecastDay, setForecastDay] = React.useState<ForecastDay[]>();
  const hourlyForecastArr: HourlyWeather[] = [];
  const [hourlyForecast, setHourlyForecast] = React.useState<HourlyWeather[]>();
  // lấy dữ liệu dự báo khi thay đổi vị trí.
  useEffect(() => {
    lat != undefined && lon != undefined ? fetchData(lat, lon) : null;
  }, [lat, lon]);
  // ấy dữ liệu dự báo thời tiết từ API OpenWeatherMap bằng cách sử dụng tọa độ vĩ độ và kinh độ được cung cấp.
  const fetchData = async (
    lat: number | undefined,
    lon: number | undefined,
  ) => {
    await axios
      .get('https://api.weatherapi.com/v1/forecast.json', {
        params: {
          key: 'a95ac2295269448094c170846231903',
          q: `${lat},${lon}`,
          lang: 'vi',
          days: '7',
        },
      })
      .then(response => {
        response.data.forecast.forecastday.map(a => {
          forecastDayArr.push({
            icon_link: a.day.condition.icon,
            condition_text: '',
            name: '',
            region: '',
            condition_code: a.day.condition.code,
            maxTemp_c: a.day.maxtemp_c,
            minTemp_c: a.day.mintemp_c,
            date: a.date,
            avgTemp_c: a.day.avgtemp_c,
          });
        });
        setForecastDay(forecastDayArr);

        response.data.forecast.forecastday[0].hour.map(a => {
          hourlyForecastArr.push({
            icon_link: a.condition.icon,
            time: a.time,
            temp_c: a.temp_c,
            condition_code: a.condition.code,
            is_day: a.is_day,
          });
        });
        setHourlyForecast(hourlyForecastArr);
      })
      .catch(error => {
        console.error('Network error:', error);
      });
  };

  return [forecastDay, hourlyForecast];
}
export default GetForecastDay;
