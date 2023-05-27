import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Card from './Card';
import Map from './Map';
import { Picker } from '@react-native-picker/picker';

const Header = () => {
  const [zones, setZones] = useState([]);
  const [cities, setCities] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [cityId, setCityId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [specialityId, setSpecialityId] = useState('');
  const [restoCord, setRestoCord] = useState([]);
  const [restoName, setRestoName] = useState([]);
  const [restoAddress, setRestoAddress] = useState([]);
  const [restoImg, setImg] = useState([]);
  const [restoSite, setSite] = useState([]);
  const [cityCord, setCords] = useState([]);

  const fetchZonesByCity = async (cityId) => {
    try {
      const response = await axios.get(`https://near-9hdh.vercel.app/api/zones?cityId=${cityId}`);
      setZones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSpecialities = async () => {
    try {
      const response = await axios.get('https://near-9hdh.vercel.app/api/specialities');
      setSpecialities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get('https://near-9hdh.vercel.app/api/cities');
      setCities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCountry = (value) => {
    setCityId(value);
    const selectedCity = cities.find((city) => city._id === value);
    const coordinates = selectedCity ? selectedCity.cords : [33.74059917546109, -7.238578523576559];
    setCords(coordinates);
    setRestoCord([]);
    fetchZonesByCity(value);
  };

  useEffect(() => {
    fetchCities();
    fetchSpecialities();
  }, []);

  const handleZoneChange = (value) => {
    setZoneId(value);
  };

  const handleSpecialityChange = (value) => {
    setSpecialityId(value);
  };

  const fetchRestaurantsByZoneAndSpeciality = async () => {
    try {
      const response = await axios.get(
        `https://near-9hdh.vercel.app/api/restos?zoneId=${zoneId}&specialityId=${specialityId}&cityId=${cityId}`
      );
      const coordinates = response.data.map((restaurant) => ({
        lat: restaurant.cords[0],
        lng: restaurant.cords[1],
      }));
      const names = response.data.map((restaurant) => restaurant.name);
      const addresses = response.data.map((restaurant) => restaurant.adresse);
      const img = response.data.map((restaurant) => restaurant.image);
      const site = response.data.map((restaurant) => restaurant.site);
      setRestoCord(coordinates);
      setImg(img);
      setRestoName(names);
      setRestoAddress(addresses);
      setSite(site);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (zoneId && specialityId && cityId) {
      fetchRestaurantsByZoneAndSpeciality();
    }
  }, [zoneId, specialityId, cityId]);

  const handleGoSomewhere = (index) => {
    // Handle the action when "Go somewhere" is clicked
    // You can implement the logic to display the location in the map here
    const selectedCoord = restoCord[index];
    console.log('Go somewhere', selectedCoord);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.wrapperInfo}>
          <View style={styles.row}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Country</Text>
              <Picker
                selectedValue={cityId}
                onValueChange={(value) => handleCountry(value)}
              >
                <Picker.Item label="-- Select city --" value="" />
                {cities.map((city) => (
                  <Picker.Item key={city._id} label={city.name} value={city._id} />
                ))}
              </Picker>
            </View>
            {cityId && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Zone</Text>
                <Picker
                  selectedValue={zoneId}
                  onValueChange={(value) => handleZoneChange(value)}
                >
                  <Picker.Item label="-- Select zone --" value="" />
                  {zones.map((zone) => (
                    <Picker.Item key={zone._id} label={zone.name} value={zone._id} />
                  ))}
                </Picker>
              </View>
            )}
            {cityId && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Speciality</Text>
                <Picker
                  selectedValue={specialityId}
                  onValueChange={(value) => handleSpecialityChange(value)}
                >
                  <Picker.Item label="-- Select speciality --" value="" />
                  {specialities.map((speciality) => (
                    <Picker.Item key={speciality._id} label={speciality.name} value={speciality._id} />
                  ))}
                </Picker>
              </View>
            )}
          </View>
        </View>
        {zoneId && specialityId && restoCord.length > 0 && (
          <View style={styles.cardsContainer}>
            <ScrollView horizontal>
              {restoCord.map((coord, index) => (
                <Card
                  key={index}
                  image={restoImg[index]}
                  name={restoName[index]}
                  adresse={restoAddress[index]}
                  description=""
                  site={restoSite[index]}
                  onGoSomewhere={() => handleGoSomewhere(index)}
                />
              ))}
            </ScrollView>
          </View>
        )}
        {restoCord && restoName && restoAddress && restoImg && restoSite && cityCord && (
          <View style={styles.mapContainer}>
            <Map
              restoCord={restoCord}
              restoName={restoName}
              restoAddress={restoAddress}
              restoImg={restoImg}
              restoSite={restoSite}
              cityCord={cityCord}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  wrapperInfo: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  formGroup: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    marginBottom: 4,
  },
  mapContainer: {
    flex: 1,
  },
  cardsContainer: {
    marginBottom: 16,
  },
});

export default Header;
