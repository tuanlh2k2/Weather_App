import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {Moon} from '../img';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Temperature} from '../img/HomeIcon';

function Humidity() {
  return (
    <View style={styles.container}>
      <View></View>
      <Temperature height={30} width={30} />
      <Text>CẢM GIÁC NHƯ</Text>
    </View>
  );
}
export default Humidity;

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 120,
    borderRadius: 30,
    backgroundColor: 'rgba(167, 167, 232, 0.5)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'rgba(111, 88, 228, 0.7)',
    opacity: 1,
  },
  hours: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.white,
  },
  img: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    alignItems: 'center',
  },
});
