import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Setting from '../../model/Setting';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width} = Dimensions.get('window');
console.log(width);
function WeatherDetails(currentCondition: any) {
  const [setting, getSetting] = React.useState<Setting>();
  const getSettingData = async () => {
    try {
      const value = await AsyncStorage.getItem('setting');

      if (value !== null) {
        let val = JSON.parse(value);
        getSetting({fDegree: val.fDegree, notification: val.noti});
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  getSettingData();

  const aqi = currentCondition.currentCondition?.aqi;
  let aqiMessage;
  if (aqi !== null) {
    if (aqi >= 1 && aqi <= 3) {
      aqiMessage = 'Thấp';
    } else if (aqi >= 4 && aqi <= 6) {
      aqiMessage = 'Trung bình';
    } else if (aqi >= 7 && aqi <= 9) {
      aqiMessage = 'Cao';
    } else if (aqi > 9) {
      aqiMessage = 'Rất cao';
    }
  } else {
    aqiMessage = 'Không có thông tin về chỉ số chất lượng không khí.';
  }
  const uv_index = currentCondition.currentCondition?.uv_index ?? null;
  let uvIndexMessage, uvIndexMessage2;
  if (uv_index !== null) {
    if (uv_index >= 0 && uv_index <= 2) {
      uvIndexMessage = 'Thấp';
      uvIndexMessage2 = 'An toàn.';
    } else if (uv_index >= 3 && uv_index <= 5) {
      uvIndexMessage = 'Trung bình';
      uvIndexMessage2 = 'Che chắn cơ thể đầy đủ.';
    } else if (uv_index >= 6 && uv_index <= 7) {
      uvIndexMessage = 'Cao';
      uvIndexMessage2 = 'Hạn chế tiếp xúc với ánh nắng.';
    } else if (uv_index >= 8 && uv_index <= 10) {
      uvIndexMessage = 'Rất cao';
      uvIndexMessage2 = 'Tránh tiếp xúc với ánh nắng.';
    } else if (uv_index >= 11) {
      uvIndexMessage = 'Cực cao.';
      uvIndexMessage2 =
        'Nguy hiểm, tìm chỗ có bóng râm, không tiếp xúc với ánh nắng.';
    }
  } else {
    uvIndexMessage = 'Không có thông tin về chỉ số UV.';
  }

  const wind_kph = currentCondition.currentCondition?.wind_kph ?? null;
  const wind_degree = currentCondition.currentCondition?.wind_degree ?? null;
  let windMessage;
  const direction = [
    'Bắc',
    'Đông Bắc',
    'Đông',
    'Đông Nam',
    'Nam',
    'Tây Nam',
    'Tây',
    'Tây Bắc',
  ];
  const index = Math.round(wind_degree / 45) % 8;
  windMessage = direction[index];

  const rainfall = currentCondition.currentCondition?.rainfall;
  let rainfallMessage;
  if (rainfall !== undefined) {
    if (rainfall <= 2 && rainfall >= 1) {
      rainfallMessage = 'Có thể mưa nhỏ.';
    } else if (rainfall > 2 && rainfall <= 10) {
      rainfallMessage = 'Có mưa.';
    } else if (rainfall > 10) {
      rainfallMessage = 'Mưa lớn.';
    } else {
      rainfallMessage = 'Trời không mưa.';
    }
  } else {
    rainfallMessage = 'Không có thông tin về lượng mưa.';
  }

  const feelslike_c = currentCondition.currentCondition?.feelslike_c;
  let feelsLikeMessage;
  if (feelslike_c !== undefined) {
    if (feelslike_c < currentCondition?.temp_c) {
      feelsLikeMessage = 'Cảm giác lạnh hơn do bị ảnh hưởng bởi độ ẩm và gió.';
    } else if (feelslike_c > currentCondition?.temp_c) {
      feelsLikeMessage = 'Cảm giác nóng hơn do bị ảnh hưởng bởi độ ẩm và gió.';
    } else {
      feelsLikeMessage = 'Cảm giác đúng so với nhiệt độ thực tế.';
    }
  } else {
    feelsLikeMessage = 'Không có thông tin về cảm nhận.';
  }

  const humidity = currentCondition.currentCondition?.humidity;
  let humidityMessage;
  if (humidity !== undefined) {
    if (humidity <= 30) {
      humidityMessage = 'Độ ẩm thấp.';
    } else if (humidity > 30 && humidity <= 60) {
      humidityMessage = 'Độ ẩm trung bình.';
    } else if (humidity > 60 && humidity <= 80) {
      humidityMessage = 'Độ ẩm cao.';
    } else if (humidity > 80) {
      humidityMessage = 'Độ ẩm cực cao, có thể nồm ẩm.';
    }
  } else {
    humidityMessage = 'Không có thông tin về độ ẩm.';
  }

  const visibility = currentCondition.currentCondition?.visibility;
  let visibilityMessage;
  if (visibility !== undefined) {
    if (visibility >= 10) {
      visibilityMessage = 'Tầm nhìn xa tốt.';
    } else if (visibility > 5 && visibility < 10) {
      visibilityMessage = 'Tầm nhìn xa trung bình.';
    } else if (visibility <= 5) {
      visibilityMessage = 'Tầm nhìn kém.';
    }
  } else {
    visibilityMessage = 'Không có thông tin về tầm nhìn.';
  }
  return (
    <View>
      <View style={styles.largeBox}>
        <View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Image
              source={require('../img/HomeIcon/aqi_icon.png')}
              style={{height: 14, resizeMode: 'contain', marginVertical: 3}}
            />
            <Text style={styles.label}>Ô NHIỄM KHÔNG KHÍ</Text>
          </View>
          <Text style={styles.value}>
            {aqi} - {aqiMessage}
          </Text>
        </View>
        <View>
          <Text style={styles.detail}>
            Chỉ số không khí theo thang đo UK Defra.
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.box}>
          <View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Image
                source={require('../img/HomeIcon/uv_index_icon.png')}
                style={{height: 14, resizeMode: 'contain', marginVertical: 3}}
              />
              <Text style={styles.label}>CHỈ SỐ UV</Text>
            </View>
            <Text style={styles.value}>{uv_index}</Text>
            <Text style={styles.detail}>{uvIndexMessage}</Text>
          </View>
          <View>
            <Text style={styles.detail}>{uvIndexMessage2}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Image
                source={require('../img/HomeIcon/wind_icon.png')}
                style={{height: 14, resizeMode: 'contain', marginVertical: 3}}
              />
              <Text style={styles.label}>GIÓ</Text>
            </View>
            <Text style={styles.value}>{wind_kph}</Text>
            <Text style={styles.detail}>km/h</Text>
          </View>
          <View>
            <Text style={styles.detail}>Gió thổi hướng {windMessage}.</Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.box}>
          <View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Image
                source={require('../img/HomeIcon/rainfall_icon.png')}
                style={{height: 14, resizeMode: 'contain', marginVertical: 3}}
              />
              <Text style={styles.label}>LƯỢNG MƯA</Text>
            </View>
            <Text style={styles.value}>{rainfall} mm</Text>
          </View>
          <View>
            <Text style={styles.detail}>{rainfallMessage}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Image
                source={require('../img/HomeIcon/feelslike_icon.png')}
                style={{height: 14, resizeMode: 'contain', marginVertical: 3}}
              />
              <Text style={styles.label}>CẢM NHẬN</Text>
            </View>
            <Text style={styles.value}>
              {setting?.fDegree
                ? Math.round(feelslike_c * 1.8 + 32)
                : feelslike_c}
              °
            </Text>
          </View>
          <View>
            <Text style={styles.detail}>{feelsLikeMessage}</Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.box}>
          <View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Image
                source={require('../img/HomeIcon/humidity_icon.png')}
                style={{height: 14, resizeMode: 'contain', marginVertical: 3}}
              />
              <Text style={styles.label}>ĐỘ ẨM</Text>
            </View>
            <Text style={styles.value}>{humidity}%</Text>
          </View>
          <View>
            <Text style={styles.detail}>{humidityMessage}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Image
                source={require('../img/HomeIcon/visibility_icon.png')}
                style={{height: 14, resizeMode: 'contain', marginVertical: 3}}
              />
              <Text style={styles.label}>TẦM NHÌN</Text>
            </View>
            <Text style={styles.value}>{visibility} km</Text>
          </View>
          <View>
            <Text style={styles.detail}>{visibilityMessage}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
export default WeatherDetails;

const styles = StyleSheet.create({
  largeBox: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(34, 80, 150, 0.4)',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 5,
    width: width - 30,
    height: (width - 45) / 2 - 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 22,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(34, 80, 150, 0.4)',
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginLeft: 15,
    width: (width - 45) / 2,
    height: (width - 45) / 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 22,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    fontWeight: '400',
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  icon: {
    height: 16,
    width: 16,
  },
  value: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 30,
    fontWeight: '400',
  },
  detail: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 18,
    fontWeight: '400',
  },
});
