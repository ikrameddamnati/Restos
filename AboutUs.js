import React from 'react';
import { View, Text,Dimensions, ImageBackground, Image, StyleSheet } from 'react-native';

const AboutUs = () => (
  <ImageBackground source={require('./assets/bg.png')} style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={require('./assets/findus.png')} style={styles.image} />
    </View>
    <View style={styles.contentContainer}>
      <Image source={require('./assets/spoon.svg')} style={styles.spoonImg} />

      <Text style={styles.heading}>A propos de nous</Text>
      <Text style={styles.paragraph}>
        Notre application a été créée dans le but de simplifier la recherche de restaurants et de faciliter la prise de
        décision pour les utilisateurs. Notre objectif est de fournir une solution pratique et efficace pour aider les
        gens à trouver des restaurants qui répondent à leurs préférences et à leurs besoins. Notre équipe est composée de
        professionnels passionnés par la technologie et la gastronomie. Nous sommes engagés à fournir une application
        conviviale et intuitive qui offre une expérience utilisateur exceptionnelle. Nous sommes fiers de notre
        application et nous sommes impatients de travailler avec vous pour atteindre nos objectifs. Contactez-nous
        pour en savoir plus sur notre application et comment nous pouvons vous aider à trouver les meilleurs
        restaurants dans votre région.
      </Text>
    </View>
  </ImageBackground>
);

export default AboutUs;
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
   alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    width: width,
  },
  imageContainer: {
    marginBottom: 16,
  },
  image: {
    width: 200, 
    height: 200, 
    resizeMode: 'contain', 
  },
  contentContainer: {
    alignItems: 'center',
    
  },
  heading: {
    fontFamily: 'cormorant', 
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
     textAlign: 'center',
    color:'white',
  },
  paragraph: {
   
    fontSize: 16,
    textAlign: 'center',
    color:'white'
  },
  spoonImg: {
    width: 45,
    
  },
});