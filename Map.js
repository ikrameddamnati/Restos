import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Linking } from 'react-native';
const Map = ({ restoCord, restoAddress, restoName, restoImg, restoSite, cityCord, onMapMarkerPress }) => {
  const handleGetDirections = () => {
    const { latitude, longitude } = userCoords;
    const { lat, lng } = restoCord;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${lat},${lng}`;
    Linking.openURL(url);
  };
  
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: cityCord[0],
          longitude: cityCord[1],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {restoCord.map((coord, index) => (
          <Marker
            coordinate={{ latitude: coord.lat, longitude: coord.lng }}
            key={index}
            onPress={() => onMapMarkerPress(index)}
          >
            <Callout>
              <View>
                <Text>{restoName[index]}</Text>
                <Text>{restoAddress[index]}</Text>
                <Text>{restoSite[index]}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default Map;
