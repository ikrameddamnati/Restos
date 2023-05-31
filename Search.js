import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import Card from './Card';
import Map from './Map';

const Header = () => {
  const [zones, setZones] = useState([]);
  const [cities, setCities] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [cityId, setCityId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [specialityId, setSpecialityId] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Nouvel état pour stocker les informations du restaurant sélectionné

  const getZonesByCity = async (cityId) => {
    try {
      const response = await axios.get('https://near-9hdh.vercel.app/api/zones');
      const zones = response.data.filter((zone) => zone.city === cityId);
      setZones(zones);
      setZoneId('');
    } catch (error) {
      console.error(error);
    }
  };

  const getSpecialities = async () => {
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
    setZoneId('');
    setRestaurants([]);
    getZonesByCity(value);
  };

  useEffect(() => {
    fetchCities();
    getSpecialities();
  }, []);

  const handleZoneChange = (value) => {
    setZoneId(value);
  };

  const handleSpecialityChange = (value) => {
    setSpecialityId(value);
  };

  const fetchRestaurantsByZoneAndSpeciality = async () => {
    try {
      const response = await axios.get('https://near-9hdh.vercel.app/api/restos');
      const filteredRestaurants = response.data.filter((restaurant) => {
        return (
          restaurant.zone === zoneId &&
          restaurant.speciality === specialityId
        );
      });
      setRestaurants(filteredRestaurants);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (zoneId && specialityId) {
      fetchRestaurantsByZoneAndSpeciality();
    }
  }, [zoneId, specialityId]);

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>City:</Text>
        <Picker
          selectedValue={cityId}
          onValueChange={handleCountry}
          style={styles.picker}
        >
          <Picker.Item label="Select a city" value="" />
          {cities.map((city) => (
            <Picker.Item key={city._id} label={city.name} value={city._id} />
          ))}
        </Picker>
        <Text style={styles.headerText}>Zone:</Text>
        <Picker
          selectedValue={zoneId}
          onValueChange={handleZoneChange}
          style={styles.picker}
        >
          <Picker.Item label="Select a zone" value="" />
          {zones.map((zone) => (
            <Picker.Item key={zone._id} label={zone.name} value={zone._id} />
          ))}
        </Picker>
        <Text style={styles.headerText}>Speciality:</Text>
        <Picker
          selectedValue={specialityId}
          onValueChange={handleSpecialityChange}
          style={styles.picker}
        >
          <Picker.Item label="Select a speciality" value="" />
          {specialities.map((speciality) => (
            <Picker.Item key={speciality._id} label={speciality.name} value={speciality._id} />
          ))}
        </Picker>
      </View>
      {zoneId && specialityId && restaurants.length > 0 ? (
        <ScrollView>
          <View>
            {restaurants.map((restaurant) => (
              <Card
                key={restaurant._id}
                name={restaurant.name}
                adresse={restaurant.adresse}
                image={restaurant.image} // Assurez-vous que les données de l'API contiennent bien la propriété "image"
                site={restaurant.site}
                onSelect={() => handleRestaurantSelect(restaurant)} // Ajouter la gestion de la sélection du restaurant
              />
            ))}
          </View>
        </ScrollView>
      ) : null}

      {selectedRestaurant ? (
        <Map
          restoCord={selectedRestaurant.cord}
          restoAddress={selectedRestaurant.adresse}
          restoName={selectedRestaurant.name}
          restoImg={selectedRestaurant.image}
          restoSite={selectedRestaurant.site}
          cityCord={cityCord} // Assurez-vous de fournir les coordonnées de la ville à partir de votre logique
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  headerContainer: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    marginBottom: 16,
  },
});

export default Header;
