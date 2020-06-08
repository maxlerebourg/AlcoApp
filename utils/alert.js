import React from 'react'
import {Alert} from 'react-native';


function goConnectAlert(text, navigation) {
  return Alert.alert('Error',
    text,
    [{
      text : 'Se connecter',
      onPress: () => navigation.navigate('Account'),
    }]
  );
}

export {goConnectAlert}
