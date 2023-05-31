import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const Map = ({ restoCord, restoAddress, restoName, restoImg, restoSite, cityCord, onMapMarkerPress }) => {
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
            onPress={() => onMapMarkerPress(restoCord[index])}
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
