import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';
import CurrentCondition from '../../model/CurrentCondition';
function SettingsScreen() {
  const [fDegree, setFDegree] = React.useState<boolean>();
  const [noti, setNoti] = React.useState<number>();
  const [currentCondition, setCurrentCondition] =
    React.useState<CurrentCondition>();
  const storeData = async (fDegree: boolean, noti: boolean) => {
    try {
      await AsyncStorage.setItem(
        'setting',
        JSON.stringify({fDegree: fDegree, noti: noti}),
      );
    } catch (error) {
      // Error saving data
    }
  };
  const setting = async () => {
    try {
      const value = await AsyncStorage.getItem('setting');

      if (value !== null) {
        let val = JSON.parse(value);
        setFDegree(val.fDegree);
        setNoti(val.noti);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const getCurrentCondition = async () => {
    try {
      const value = await AsyncStorage.getItem('currentCondition');

      if (value !== null) {
        let arr = JSON.parse(value);
        setCurrentCondition(arr);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: `Thời tiết tại ${currentCondition?.name}`,
      body: `Nhiệt độ:   ${
        fDegree
          ? Math.round(currentCondition?.temp_c * 1.8 + 32)
          : currentCondition?.temp_c
      }°,  ${currentCondition?.condition_text} `,

      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        largeIcon: 'https://cdn.weatherapi.com/weather/64x64/day/122.png',
        color: '#4caf50',
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        attachments: [
          {
            url: `https:${currentCondition?.condition_icon}`,
          },
        ],
      },
    });
  }
  async function cancelDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)

    // Display a notification
    await notifee.cancelAllNotifications();
  }
  getCurrentCondition();
  useEffect(() => {
    setting();
  }, []);

  return (
    /*<ImageBackground
      source={require('../img/Background/home_background.png')}
      style={styles.container}>
      <Text style={styles.locationText}>Cochabamba</Text>
      <Text style={styles.temperatureText}>19°</Text>
      <Text style={styles.skyText}>Mostly Clear</Text>
      <Text style={styles.lowHighTemp}>L:19° H:29°</Text>
      /*{ <HourlyWeatherButton /> }*/
    //</ImageBackground>

    <SafeAreaView
      style={{
        padding: 30,
        backgroundColor: '#3C3C3C',
        height: '100%',
        width: '100%',
      }}>
      <Text
        style={
          Platform.OS == 'ios'
            ? {
                color: 'white',
                fontSize: 36,
                paddingBottom: 50,
                marginLeft: 20,
                marginRight: 20,
              }
            : {
                color: 'white',
                fontSize: 36,
                paddingBottom: 50,
              }
        }>
        Cài đặt
      </Text>
      <View
        style={
          Platform.OS == 'ios'
            ? {
                borderColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                padding: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 20,
                marginRight: 20,
              }
            : {
                borderColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                padding: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }
        }>
        <View style={{flexDirection: 'row'}}>
          
          <Text style={{color: 'white', fontSize: 20}}>Thông báo</Text>
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={noti ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={value => {
            storeData(fDegree!, value);
            setNoti(value!);
            value ? onDisplayNotification() : cancelDisplayNotification();
          }}
          value={noti}
        />
      </View>
      <View
        style={
          Platform.OS == 'ios'
            ? {
                borderColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                padding: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 20,
                marginRight: 20,
                marginTop: 26,
              }
            : {
                borderColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                padding: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 26,
              }
        }>
        <View style={{flexDirection: 'row'}}>
         
          <Text style={{color: 'white', fontSize: 20}}>Độ F</Text>
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={fDegree ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={value => {
            storeData(value, noti!);
            setFDegree(value!);
            value
              ? Alert.alert('Nhiệt độ đã chuyển sang thang độ F')
              : Alert.alert('Nhiệt độ đã chuyển sang thang độ C');
          }}
          value={fDegree}
        />
      </View>
    </SafeAreaView>
  );
}
export default SettingsScreen;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  locationText: {
    color: '#FFFF',
    fontWeight: '400',
    fontSize: 24,
  },
  temperatureText: {
    color: '#FFFF',
    fontWeight: '300',
    fontSize: 60,
  },
  skyText: {
    marginBottom: 10,
    fontWeight: '500',
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  lowHighTemp: {
    color: '#FFFF',
    fontWeight: '400',
    fontSize: 15,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
});
